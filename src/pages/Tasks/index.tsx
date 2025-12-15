import {
  Alert,
  Button,
  Snackbar,
  Typography,
  type SnackbarCloseReason,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CreateTaskModal from "../../components/CreateTaskModal";
import Title from "../../components/Title";
import { useAuth } from "../../hooks/useAuth";
import taskServices from "../../services/taskServices";
import useLoading from "../../store/useLoading";
import type { ITask, IToast } from "../../types/task.types";
import theme from "../../utils/theme";

import TaskItem from "../../components/TaskItem";

const Tasks: React.FC = () => {
  const user = useAuth();
  const { setLoading } = useLoading();

  const [taskTodoList, setTaskTodoList] = useState<ITask[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [toastStatus, setToastStatus] = useState<IToast>({
    open: false,
    message: "",
  });

  const fetchTaskList = async (userId: string) => {
    try {
      setLoading(true);
      const taskData = await taskServices.getTodayTasks(userId);
      setTaskTodoList(taskData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskList(user?.uid as string);
  }, [user]);

  const handleSave = async (task: Omit<ITask, "isCompleted">) => {
    try {
      setLoading(true);
      const res = await taskServices.addTask({
        ...task,
        isCompleted: false,
        description: task.description || "",
      });
      if (res != "") {
        setToastStatus({
          open: true,
          message: "Task added successfully!",
        });
        fetchTaskList(user?.uid as string);
      }
    } catch (error) {
      console.error("Error adding task: ", error);
    } finally {
      setLoading(false);
    }
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
      <Title
        title="Task Management"
        subTitle="Manage your daily tasks and track progress"
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<LuPlus />}
          onClick={() => setOpenModal(true)}
          sx={{ textTransform: "none", fontSize: {md: "1rem", xs: "0.7rem"} }}
        >
          Add New Task
        </Button>
      </Title>
      <Typography
        variant="h6"
        color={theme.palette.primary.main}
        fontSize={"1.4rem"}
        mb={2}
      >
        Today's Tasks
      </Typography>
      {taskTodoList.map((task) => (
        <TaskItem
          key={task.id}
          {...task}
          setToastStatus={setToastStatus}
          fetchTaskList={fetchTaskList}
        />
      ))}
      <CreateTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
      />
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

export default Tasks;
