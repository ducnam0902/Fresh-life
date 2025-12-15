import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
  type SnackbarCloseReason,
} from "@mui/material";
import CreateExpenseModal from "../../components/CreateExpenseModal";
import expenseServices from "../../services/expenseServices";
import useLoading from "../../store/useLoading";
import type { IBudget, IExpenseToday } from "../../types/expense.types";
import BudgetPeriodModal from "../../components/BudgetPeriodModal";
import type { IToast } from "../../types/task.types";
import { useAuth } from "../../hooks/useAuth";
import ExpenseList from "../../components/ExpenseList";
import theme from "../../utils/theme";

const Expenses: React.FC = () => {
  const { setLoading } = useLoading();
  const user = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [budgetsToday, setBudgetsToday] = useState<IBudget>({
    id: "",
    isMatchPeriod: null,
    budgets: 0,
  });

  const [toastStatus, setToastStatus] = useState<IToast>({
    open: false,
    message: "",
  });

  const [expensesToday, setExpensesToday] = useState<IExpenseToday[]>([]);
  const handleAddExpense = async (payload: IExpenseToday) => {
    try {
      setLoading(true);
      const data = await expenseServices.addExpense(payload);
      if (data != "") {
        setToastStatus({
          open: true,
          message: "Expense added successfully!",
        });
        fetchExpenseLists(user?.uid as string);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseLists = async (userId: string) => {
    try {
      setLoading(true);
      const taskData = await expenseServices.getTodayExpenses(userId);
      setExpensesToday(taskData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkTodayBudget = async () => {
      try {
        setLoading(true);
        const data = await expenseServices.checkTodayBudgets();
        setBudgetsToday(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkTodayBudget();
    fetchExpenseLists(user?.uid as string);
  }, [user]);

  const handleCreatedBudgetsToday = (payload: IBudget) => {
    setBudgetsToday({
      id: "",
      isMatchPeriod: true,
      budgets: payload.budgets,
    });
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToastStatus({
      open: false,
      message: "",
    });
  };

  return (
    <div>
      {budgetsToday.isMatchPeriod !== null && !budgetsToday.isMatchPeriod && (
        <BudgetPeriodModal onCreatedBudgets={handleCreatedBudgetsToday} />
      )}
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
      <Box
        sx={{
          backgroundColor: theme.palette.primary.cardLight,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            fontSize: "2rem",
            p: 3,
            pb: 1,
            letterSpacing: "0.5px",
          }}
        >
          Today's Expenses
        </Typography>

        {expensesToday?.map((expense) => (
          <ExpenseList key={expense.id} expense={expense} />
        ))}
      </Box>

      <Snackbar
        open={toastStatus.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Expenses;
