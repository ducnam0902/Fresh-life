import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import {
  Alert,
  Box,
  Button,
  Slider,
  Snackbar,
  Stack,
  Typography,
  type SnackbarCloseReason,
} from "@mui/material";
import CreateExpenseModal from "../../components/CreateExpenseModal";
import expenseServices from "../../services/expenseServices";
import useLoading from "../../store/useLoading";
import type {
  IBudget,
  IExpenseSummary,
  IExpenseToday,
} from "../../types/expense.types";
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
  const [summaryBudgets, setSummaryBudgets] = useState<IExpenseSummary>({
    totalExpenses: 0,
    remainExpense: 0,
    usedPercentage: 0,
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
        fetchSumaryBudget(user?.uid as string);
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
    fetchSumaryBudget(user?.uid as string);
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

  const fetchSumaryBudget = async (userId: string) => {
    try {
      setLoading(true);
      const data = await expenseServices.getRemainBudgetToday(userId);
      setSummaryBudgets(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {budgetsToday.isMatchPeriod !== null && !budgetsToday.isMatchPeriod && (
        <BudgetPeriodModal onCreatedBudgets={handleCreatedBudgetsToday} />
      )}
      {budgetsToday.isMatchPeriod && (
        <>
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
              marginBottom: 4,
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignContent={"center"}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  p: 3,
                  pb: 1,
                  letterSpacing: "0.5px",
                  color: theme.palette.primary.russianGreen,
                }}
              >
                Remaining Budget
              </Typography>
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
                {summaryBudgets.remainExpense?.toLocaleString("vi-VN")} VND
              </Typography>
            </Stack>
            <Box sx={{ px: 3 }}>
              <Slider
                value={summaryBudgets.usedPercentage}
                aria-label="Budgets"
                valueLabelDisplay="auto"
                disabled
                sx={{
                  "&.Mui-disabled": {
                    color: theme.palette.primary.celadonGreen,
                  },
                  ".MuiSlider-thumb": { display: "none" },
                  "&.MuiSlider-root": { height: "8px" },
                }}
                size="medium"
              />
            </Box>

            <Stack
              direction={{
                xs: "column",
                lg: "row",
              }}
              justifyContent={"space-between"}
              alignContent={"center"}
              sx={{ pb: 3 }}
            >
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                pl={3}
                spacing={1}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.2rem",
                    color: theme.palette.primary.textMutedLight,
                  }}
                >
                  Actual Expense:{" "}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.2rem",
                  }}
                >
                  {summaryBudgets.totalExpenses?.toLocaleString("vi-VN")} VND
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                pr={3}
                pl={{
                  xs: 3,
                  lg: 0,
                }}
                spacing={1}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.2rem",
                    color: theme.palette.primary.textMutedLight,
                  }}
                >
                  Total Budget:
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.2rem",
                  }}
                >
                  {budgetsToday.budgets?.toLocaleString("vi-VN")} VND
                </Typography>
              </Stack>
            </Stack>
          </Box>

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
                letterSpacing: "0.5px",
              }}
            >
              Today's Expenses
            </Typography>

            {expensesToday?.map((expense) => (
              <ExpenseList key={expense.id} expense={expense} />
            ))}
          </Box>
        </>
      )}

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
