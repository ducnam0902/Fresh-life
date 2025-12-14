import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../../utils/theme";
import { IoClose } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { MdLabel } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";

interface ICreateExpenseModal {
  open: boolean;
  onClose: () => void;
  onSave: (formValue: ExpenseFormData) => void;
}

const expenseSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  amount: z
    .number({
      error: "Amount is required and must be number",
    })
    .min(500, "Amount must be greater than 0"),
  reason: z.string().optional(),
  tags: z.enum(["Eating", "Drinking", "Transport", "Shopping"], {
    error: "Invalid tag selected",
  }),
  userId: z.string().optional(),
});

const availableExpenseTags = ["Eating", "Drinking", "Transport", "Shopping"];

const tagColors: Record<(typeof availableExpenseTags)[number], string> = {
  Eating: "#be185d",
  Drinking: "#b45309",
  Transport: "#1e40af",
  Shopping: "#15803d",
};

const getTagColor = (tag: (typeof availableExpenseTags)[number]) => {
  return tagColors[tag];
};

export type ExpenseFormData = z.infer<typeof expenseSchema>;

const CreateExpenseModal = ({ open, onClose, onSave }: ICreateExpenseModal) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      tags: "Eating",
      amount: 500,
      reason: "",
    },
  });
  const user = useAuth();
  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (formValue: ExpenseFormData) => {
    const payload = {
      ...formValue,
      userId: user?.uid ?? "",
    };
    onSave(payload);
    reset();
  };

  const handleChangeAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (v: number) => void
  ) => {
    const rawValue = e.target.value;
    if (!isNaN(Number(rawValue))) {
      const value = Number(rawValue);
      onChange(value);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          pb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
          }}
        >
          Add New Expense
        </Typography>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "#6b7280",
            "&:hover": {
              backgroundColor: "#f3f4f6",
            },
          }}
        >
          <IoClose size={24} />
        </IconButton>
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
                    label="Expense"
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

            <Box>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount"
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
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="start">VND</InputAdornment>
                        ),
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
                {errors?.amount ? errors.amount.message : " "}
              </Typography>
            </Box>

            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Reason"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Add more details about your expense..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                    paddingBottom: "18px",
                  }}
                />
              )}
            />

            <Box>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.tags}>
                    <InputLabel
                      sx={{
                        "&.Mui-focused": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      Tag
                    </InputLabel>
                    <Select
                      {...field}
                      input={<OutlinedInput label="Tag" />}
                      startAdornment={
                        <MdLabel
                          size={20}
                          style={{
                            marginRight: 8,
                            marginLeft: 8,
                            color: "#6b7280",
                          }}
                        />
                      }
                      sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      {availableExpenseTags.map((tag) => {
                        const colors = getTagColor(tag);
                        return (
                          <MenuItem
                            key={tag}
                            value={tag}
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: colors + "40",
                                "&:hover": {
                                  backgroundColor: colors + "60",
                                },
                              },
                            }}
                          >
                            <Chip
                              label={tag}
                              size="small"
                              sx={{
                                backgroundColor: colors,
                                color: "#fff",
                                fontWeight: 500,
                              }}
                            />
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              />
              <Typography
                sx={{
                  color: "#ef4444",
                  fontSize: "0.75rem",
                  mt: 0.5,
                  ml: 1.75,
                }}
              >
                {errors.tags ? errors.tags.message : " "}
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
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: "0.9375rem",
              fontWeight: 500,
              px: 3,
              py: 1,
              borderColor: "#d1d5db",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add New Expense
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateExpenseModal;
