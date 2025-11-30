import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  OutlinedInput,
  IconButton,
  Typography,
  capitalize,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { MdCalendarToday, MdFlag, MdLabel } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import moment from "moment";
import { availablePrioritys, availableTags, getPriorityColor, getTagColor } from "../../utils";
import theme from "../../utils/theme";
import type { ITask } from "../../types/task.types";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Omit<ITask, "isCompleted">) => void;
}

const taskSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["low", "medium", "high"]),
  tags: z.enum(
    ["Work", "Personal", "Shopping", "Health", "Study", "Project", "Other"],
    { error: "Invalid tag selected" }
  ),
  userId: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function CreateTaskModal({
  open,
  onClose,
  onSave,
}: CreateTaskModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: moment().format('YYYY-MM-DD'),
      priority: "medium",
      tags: "Personal",
    },
  });

  const user = useAuth();

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: TaskFormData) => {
    const task = {
      title: data.title.trim(),
      description: data.description?.trim() || undefined,
      dueDate: moment(data.dueDate).format('DD-MM-YYYY'),
      priority: data.priority,
      tags: data.tags,
      userId: user?.uid ?? '',
    };

    onSave(task);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
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
          Create New Task
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
        <DialogContent sx={{ px: 3, pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Task Title"
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

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Add more details about your task..."
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
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Due Date"
                    type="date"
                    fullWidth
                    error={!!errors.dueDate}
                    slotProps={{
                      input: {
                        startAdornment: (<MdCalendarToday
                          size={20}
                          style={{ marginRight: 8, color: "#6b7280" }}
                        />)
                      }
                    }}
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
                {errors.dueDate ? errors.dueDate.message : " "}
              </Typography>
            </Box>

            <Box>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.priority}>
                    <InputLabel
                      sx={{
                        "&.Mui-focused": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      Priority
                    </InputLabel>
                    <Select
                      {...field}
                      input={<OutlinedInput label="Priority" />}
                      startAdornment={
                        <MdFlag
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
                      {availablePrioritys.map((item) => (
                      <MenuItem value={item}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              backgroundColor: getPriorityColor(item),
                            }}
                          />
                           {capitalize(item)}
                        </Box>
                      </MenuItem>
                      ))}
                      
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
                  height: "16px",
                }}
              >
                {errors.priority ? errors.priority.message : " "}
              </Typography>
            </Box>

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
                      {availableTags.map((tag) => {
                        const colors = getTagColor(tag);
                        return (
                          <MenuItem
                            key={tag}
                            value={tag}
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: colors.bg + "40",
                                "&:hover": {
                                  backgroundColor: colors.bg + "60",
                                },
                              },
                            }}
                          >
                            <Chip
                              label={tag}
                              size="small"
                              sx={{
                                backgroundColor: colors.bg,
                                color: colors.color,
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
            Create Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
