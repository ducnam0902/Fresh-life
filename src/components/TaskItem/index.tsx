import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FcOk } from "react-icons/fc";
import { FaCircleCheck, FaRegCircle } from "react-icons/fa6";
import type { ITask, IToast } from "../../types/task.types";
import { availableTags, getPriorityColor, getTagColor } from "../../utils";
import { useState } from "react";
import theme from "../../utils/theme";
import { IoClose } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";
import taskServices from "../../services/taskServices";
import { useAuth } from "../../hooks/useAuth";
import useLoading from "../../store/useLoading";

interface ITaskItem extends ITask {
  setToastStatus: (data: IToast) => void;
  fetchTaskList: (userId: string) => void;
}

const TaskItem = ({ setToastStatus, fetchTaskList, ...props }: ITaskItem) => {
  const user = useAuth();
  const { setLoading } = useLoading();
  const { title, priority, description, tags, isCompleted } = props;
  const [openModalCompleted, setOpenModalCompleted] = useState(false);


  const handleCloseModalCompleted = () => {
    setOpenModalCompleted(false);
  };

  const handleComplete = async () => {
    if (props?.id !== undefined) {
      try {
        setLoading(true);
        const response = await taskServices.completeTask(
          props?.id,
          user?.uid ?? ""
        );
        if (response.success) {
          setToastStatus({
            open: true,
            message: "Task completed successfully!",
          });
          await fetchTaskList(user?.uid as string);
        }
      } catch (error) {
        console.log(error);
      } finally {
        handleCloseModalCompleted();
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Card
        key={title}
        variant="outlined"
        sx={{
          minWidth: 275,
          display: "flex",
          mb: 2,
          p: 1,
          borderRadius: 4,
          opacity: isCompleted ? 0.6 : 1,
        }}
      >
        <CardActions>
          {!isCompleted && (
            <IconButton onClick={() =>  setOpenModalCompleted(true)}>
              <FaRegCircle
                size={30}
                color={theme.palette.primary.textMutedLight}
                opacity={"0.2"}
              />
            </IconButton>
          )}

          {isCompleted && (
            <IconButton disableFocusRipple disableRipple disabled>
              <FaCircleCheck
                size={30}
                color={theme.palette.primary.russianGreen}
              />
            </IconButton>
          )}
        </CardActions>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontSize: "1.2rem",
              fontWeight: 600,
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {capitalize(title)}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.primary.textMutedLight,
              mb: 1,
              fontSize: "1rem",
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {description ? capitalize(description) : ""}
          </Typography>
          <Stack direction={"row"} spacing={1} alignItems="center">
            <Chip
              label={
                <Stack direction={"row"} spacing={1} alignItems="center">
                  <Box
                    sx={{
                      borderRadius: "50%",
                      border: `3px solid ${
                        getPriorityColor(priority as string).color
                      }`,
                    }}
                  />
                  <Typography variant="body2">
                    {capitalize(priority as string)} Priority
                  </Typography>
                </Stack>
              }
              size="small"
              sx={{
                backgroundColor: getPriorityColor(priority as string)
                  .backgroundColor,
                color: getPriorityColor(priority as string).color,
              }}
            />
            <Chip
              label={`#${tags}`}
              size="small"
              sx={{
                backgroundColor: getTagColor(
                  tags as (typeof availableTags)[number]
                ).bg,
                color: getTagColor(tags as (typeof availableTags)[number])
                  .color,
              }}
            />
          </Stack>
        </CardContent>
      </Card>
      <Dialog
        open={openModalCompleted}
        onClose={handleCloseModalCompleted}
        maxWidth="sm"
        fullWidth
        sx={{
          borderRadius: 3,
          zIndex: 100,
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
          <Stack alignItems={"center"} flexDirection={"row"}>
            <IconButton>
              <FcOk size={24} />
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              Complete Task
            </Typography>
          </Stack>

          <IconButton
            onClick={handleCloseModalCompleted}
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

        <DialogContent>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.35rem",
              fontWeight: 400,
              lineHeight: "1.5",
              color: "#000000de",
              marginBottom: 3,
            }}
          >
            Are you sure you want to mark this task as completed?
          </Typography>

          <Card
            key={title}
            variant="outlined"
            sx={{
              minWidth: 275,
              display: "flex",
              mb: 2,
              p: 1,
              borderRadius: 4,
              opacity: isCompleted ? 0.6 : 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  textDecoration: isCompleted ? "line-through" : "none",
                }}
              >
                {capitalize(title)}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.primary.textMutedLight,
                  mb: 1,
                  fontSize: "1rem",
                  textDecoration: isCompleted ? "line-through" : "none",
                }}
              >
                {description ? capitalize(description) : ""}
              </Typography>
              <Stack direction={"row"} spacing={1} alignItems="center">
                <Chip
                  label={
                    <Stack direction={"row"} spacing={1} alignItems="center">
                      <Box
                        sx={{
                          borderRadius: "50%",
                          border: `3px solid ${
                            getPriorityColor(priority as string).color
                          }`,
                        }}
                      />
                      <Typography variant="body2">
                        {capitalize(priority as string)} Priority
                      </Typography>
                    </Stack>
                  }
                  size="small"
                  sx={{
                    backgroundColor: getPriorityColor(priority as string)
                      .backgroundColor,
                    color: getPriorityColor(priority as string).color,
                  }}
                />
                <Chip
                  label={`#${tags}`}
                  size="small"
                  sx={{
                    backgroundColor: getTagColor(
                      tags as (typeof availableTags)[number]
                    ).bg,
                    color: getTagColor(tags as (typeof availableTags)[number])
                      .color,
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: "1.43",
              color: "#0009",
              mt: 4,
            }}
          >
            This action cannot be undone. The task will be moved to the
            completed section.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ margin: 2 }}>
          <Button variant="outlined" onClick={handleCloseModalCompleted}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<LuCircleCheckBig size={20} color="#fff" />}
            onClick={() => handleComplete()}
          >
            Complete Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
