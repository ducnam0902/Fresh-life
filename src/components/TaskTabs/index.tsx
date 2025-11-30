import {
  Box,
  Tab,
  Tabs
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import taskServices from "../../services/taskServices";
import BaseTaskTab from "../BaseTaskTab";
import type { ITask } from "../../types/task.types";
interface ITaskTab {
  taskTodo: ITask[];
  taskCompleted: ITask[];
  onCompletedTask: () => void;
}

const TaskTabs = ({ taskTodo, taskCompleted, onCompletedTask }: ITaskTab) => {
  const [activeTab, setActiveTab] = useState(0);
  const user = useAuth();
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleComplete = async (taskId: string) => {
    try {
      const response = await taskServices.completeTask(taskId, user?.uid ?? "");
      if(response.success) {
        onCompletedTask();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="primary tabs example"
      >
        <Tab value={0} label="To do" />
        <Tab value={1} label="Completed" />
      </Tabs>
      <BaseTaskTab tasks={taskTodo} activeTab={activeTab} indexTab={0} handleComplete={handleComplete} />
      <BaseTaskTab tasks={taskCompleted} activeTab={activeTab} indexTab={1}  />
    </Box>
  );
};

export default TaskTabs;
