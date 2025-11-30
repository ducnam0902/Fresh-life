import {
  Alert,
  Button,
  Snackbar,
  type SnackbarCloseReason,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import TaskTabs from "../../components/TaskTabs";
import Title from "../../components/Title";
import CreateTaskModal from "../../components/CreateTaskModal";
import taskServices from "../../services/taskServices";
import { useAuth } from "../../hooks/useAuth";
import useLoading from "../../store/useLoading";
import type { ITask } from "../../types/task.types";



interface IToast {
  open: boolean;
  message: string;
}

const Tasks: React.FC = () => {
  const user = useAuth();
  const { setLoading } = useLoading();

  const [openModal, setOpenModal] = useState(false);
  const [toastStatus, setToastStatus] = useState<IToast>({
    open: false,
    message: "",
  });
  const [taskTodoList, setTaskTodoList] = useState<ITask[]>([]);
  const [taskCompletedList, setTaskCompletedList] = useState<ITask[]>([]);

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

  const fetchTaskList = async (userId: string) => {
    try {
      const taskData = await taskServices.getTodayTasks(userId);
      setTaskTodoList(taskData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompletedTask = async (userId: string) => {
    try {
      const taskData = await taskServices.getTodayCompletedTasks(userId);
      setTaskCompletedList(taskData);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    fetchTaskList(user?.uid as string);
    fetchCompletedTask(user?.uid as string);
  }, [user]);

  const handleAfterCompletedTask = async () => {
    setToastStatus({
      open: true,
      message: "Task completed successfully!",
    });
    await fetchTaskList(user?.uid as string);
    await fetchCompletedTask(user?.uid as string);
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
        >
          Add New Task
        </Button>
      </Title>
      <TaskTabs
        taskTodo={taskTodoList}
        taskCompleted={taskCompletedList}
        onCompletedTask={handleAfterCompletedTask}
      />
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
