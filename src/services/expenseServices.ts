import moment from "moment";
import { db } from "./firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import type { IBudget, IBudgetPeriod, IExpenseToday } from "../types/expense.types";

const expenseServices = {
  checkTodayBudgets: async (): Promise<IBudget> => {
    const today = moment().startOf("day").format("DD-MM-YYYY");
    const budgetsPeriodRef = collection(db, "budgetsPeriod");
    const q = query(
      budgetsPeriodRef,
      where("dateFrom", "<=", today),
      where("dateTo", ">=", today)
    );

    const data = await getDocs(q);
    if (data.docs.length === 0) {
      return {
        id: "",
        isMatchPeriod: false,
        budgets: 0,
      };
    }

    const doc = data.docs[0];
    return {
      id: doc.id,
      isMatchPeriod: true,
      budgets: (doc.data() as Omit<IBudget, "id">).budgets,
    };
  },
  createBudgetPeriod: async (payload: IBudgetPeriod): Promise<IBudget> => {
    const budgetsPeriodRef = collection(db, "budgetsPeriod");
    try {
      const docRef = await addDoc(budgetsPeriodRef, payload);
      if (docRef.id !== "") {
        return {
          id: docRef.id,
          isMatchPeriod: true,
          budgets: payload.budgets,
        };
      } else throw new Error("Failed to create budget period.");
    } catch (error) {
      console.error("Error adding document: ", error);
      return {
        id: "",
        isMatchPeriod: false,
        budgets: 0,
      };
    }
  },
  addExpense: async (payload: IExpenseToday) => {
    const expensesRef = collection(db, "expenses");
    const docRef = await addDoc(expensesRef, payload);
    return docRef.id;
  },
  getTodayExpenses: async (userId: string): Promise<IExpenseToday[]> => {
    const today = moment().startOf("day").format("DD-MM-YYYY");
    const expensesRef = collection(db, "expenses");
    const q = query(
      expensesRef,
      where("date", "==", today),
      where("userId", "==", userId)
    );
    const data = await getDocs(q);
    const filterData = data.docs.map((doc) => ({
      ...(doc.data() as Omit<IExpenseToday, "id">),
      id: doc.id,
    }));
    return filterData;
  },
};

export default expenseServices;
