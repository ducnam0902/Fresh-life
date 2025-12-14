import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { Button } from "@mui/material";
import CreateExpenseModal, {
  type ExpenseFormData,
} from "../../components/CreateExpenseModal";
import expenseServices from "../../services/expenseServices";
import useLoading from "../../store/useLoading";
import type { IBudget } from "../../types/expense.types";
import BudgetPeriodModal from "../../components/BudgetPeriodModal";

const Expenses: React.FC = () => {
  const { setLoading } = useLoading();
  const [openModal, setOpenModal] = useState(false);
  const [budgetsToday, setBudgetsToday] = useState<IBudget>({
    id: "",
    isMatchPeriod: null,
    budgets: 0,
  });
  const handleAddExpense = async (data: ExpenseFormData) => {
    console.log("New Expense Data:", data);
  };

  useEffect(() => {
    // Fetch expenses data here if needed
    const checkTodayBudget = async () => {
      try {
        setLoading(true);
        const data = await expenseServices.checkTodayBudgets();
        setBudgetsToday(data);
        console.log("Today's Budget Data:", data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkTodayBudget();
  }, []);

  const handleCreatedBudgetsToday = (payload: IBudget) => {
    setBudgetsToday({
      id: "",
      isMatchPeriod: true,
      budgets: payload.budgets,
    });
  }

  return (
    <div>
      { budgetsToday.isMatchPeriod !== null && !budgetsToday.isMatchPeriod && <BudgetPeriodModal onCreatedBudgets={handleCreatedBudgetsToday} />}
      <Title
        title="Expense Management"
        subTitle="Track your daily expenses and manage your budget"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add Expense
        </Button>
      </Title>
      <CreateExpenseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddExpense}
      />
    </div>
  );
};

export default Expenses;
