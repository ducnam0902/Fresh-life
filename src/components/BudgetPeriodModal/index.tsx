import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import theme from "../../utils/theme";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import type { IBudget } from "../../types/expense.types";
import expenseServices from "../../services/expenseServices";
import useLoading from "../../store/useLoading";

const budgetPeriodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dateFrom: z.string().min(1, "Start date is required"),
  dateTo: z.string().min(1, "End date is required"),
  budgets: z.string().min(0, "Budget must be at least 0"),
});

type BudgetPeriodFormData = z.infer<typeof budgetPeriodSchema>;

const today = moment().startOf("day").format("DD-MM-YYYY");

interface IBudgetPeriodModal {
  onCreatedBudgets: (expectedBudget: IBudget) => void;
}

const BudgetPeriodModal = ({ onCreatedBudgets }: IBudgetPeriodModal) => {
  const user = useAuth();
  const { setLoading } = useLoading();
  const [openModal, setOpenModal] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetPeriodFormData>({
    resolver: zodResolver(budgetPeriodSchema),
    defaultValues: {
      title: "",
      dateFrom: today,
      dateTo: "",
      budgets: "500",
    },
  });

  const onSubmit = async (formValue: BudgetPeriodFormData) => {
    const payload = {
      ...formValue,
      userId: user?.uid ?? "",
      budgets: Number(formValue.budgets?.replace(/\./g, "")),
    };
    try {
      setLoading(true);
      const expenseResponse = await expenseServices.createBudgetPeriod(payload);
      if (expenseResponse.isMatchPeriod) {
        onCreatedBudgets(expenseResponse);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
    }

    reset();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChangeAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (v: string) => void
  ) => {
    const cleanedValue = e.target.value.replace(/\./g, "");
    if (!isNaN(Number(cleanedValue))) {
      const value = Number(cleanedValue).toLocaleString("vi-VN");
      onChange(value);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Dialog
        open={openModal}
        // onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          borderRadius: 3,
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        }}
      >
        <DialogTitle
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            pb: 0
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              Add Budget Period
            </Typography>
            <Typography
              variant="h5"
              textAlign={"left"}
              mt={1}
              color={theme.palette.primary.textLight}
              sx={{
                fontSize: '1rem'
              }}
            >
              You need to define budget period before taking another action.
            </Typography>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Budget Period Title"
                      fullWidth
                      error={!!errors.title}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  )}
                />
                <Typography
                  sx={{
                    color: "#ef4444",
                    fontSize: "0.75rem",
                    mt: 0.5,
                    ml: 1.75,
                    height: "16px",
                  }}
                >
                  {errors?.title ? errors.title.message : " "}
                </Typography>
              </Box>
              <Stack direction="row" justifyContent={"space-between"} gap={1}>
                <Box sx={{ width: "50%" }}>
                  <Controller
                    name="dateFrom"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        format="DD-MM-YYYY"
                        label="Start Date"
                        disablePast
                        value={
                          field.value ? moment(field.value, "DD-MM-YYYY") : null
                        }
                        onChange={(date) =>
                          field.onChange(date ? date.format("DD-MM-YYYY") : "")
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.dateFrom,
                            variant: "outlined",
                          },
                        }}
                      />
                    )}
                  />
                  <Typography
                    sx={{
                      color: "#ef4444",
                      fontSize: "0.75rem",
                      mt: 0.5,
                      ml: 1.75,
                      height: "16px",
                    }}
                  >
                    {errors?.dateFrom ? errors.dateFrom.message : " "}
                  </Typography>
                </Box>
                <Box sx={{ width: "50%" }}>
                  <Controller
                    name="dateTo"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="End Date"
                        disablePast
                        format="DD-MM-YYYY"
                        value={
                          field.value ? moment(field.value, "DD-MM-YYYY") : null
                        }
                        onChange={(date) =>
                          field.onChange(date ? date.format("DD-MM-YYYY") : "")
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.dateFrom,
                            variant: "outlined",
                          },
                        }}
                      />
                    )}
                  />
                  <Typography
                    sx={{
                      color: "#ef4444",
                      fontSize: "0.75rem",
                      mt: 0.5,
                      ml: 1.75,
                      height: "16px",
                    }}
                  >
                    {errors?.dateTo ? errors.dateTo.message : " "}
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Controller
                  name="budgets"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Expected Budget Amount"
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              VND
                            </InputAdornment>
                          ),
                        },
                      }}
                      error={!!errors.budgets}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: theme.palette.primary.main,
                        },
                      }}
                      onChange={(e) =>
                        handleChangeAmount(
                          e as React.ChangeEvent<HTMLInputElement>,
                          field.onChange
                        )
                      }
                    />
                  )}
                />
                <Typography
                  sx={{
                    color: "#ef4444",
                    fontSize: "0.75rem",
                    mt: 0.5,
                    ml: 1.75,
                    height: "16px",
                  }}
                >
                  {errors?.budgets ? errors.budgets.message : " "}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              p: 2,
              gap: 1.5,
            }}
          >
            <Button type="submit" variant="contained">
              Add New Expense
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
};

export default BudgetPeriodModal;
