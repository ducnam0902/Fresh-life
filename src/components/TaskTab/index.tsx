import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import type { Task } from "../../pages/Tasks";
import { availableTags, getPriorityColor, getTagColor } from "../../utils";
import taskServices from "../../services/taskServices";
import { useAuth } from "../../hooks/useAuth";
import { FcApproval } from "react-icons/fc";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface ITaskTab {
  taskTodo: Task[];
  taskCompleted: Task[];
  onCompletedTask: () => void;
}

const TaskTab = ({ taskTodo, taskCompleted, onCompletedTask }: ITaskTab) => {
  const [activeTab, setActiveTab] = useState(0);
  const user = useAuth();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleComoplete = async (taskId: string) => {
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
      <CustomTabPanel value={activeTab} index={0}>
        {taskTodo.map((task) => (
          <Card
            key={task.title}
            sx={{
              minWidth: 275,
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              p: 1,
            }}
          >
            <CardContent>
              <Stack direction={"row"} spacing={1} alignItems="center" mb={1}>
                <Chip
                  label={capitalize(task.priority as string)}
                  size="small"
                  sx={{
                    backgroundColor: getPriorityColor(task.priority as string),
                    color: "#fff",
                  }}
                />
                <Typography variant="h5" component="div">
                  {task.title}
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 1.5 }}
              >
                {task.description}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 1.5 }}
                >
                  Tag:
                </Typography>
                <Chip
                  label={task.tags}
                  size="small"
                  sx={{
                    backgroundColor: getTagColor(
                      task.tags as (typeof availableTags)[number]
                    ).color,
                    color: "#fff",
                  }}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleComoplete(task.id!)}
              >
                Complete
              </Button>
            </CardActions>
          </Card>
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        {taskCompleted.map((task) => (
          <Card
            key={task.title}
            sx={{
              minWidth: 275,
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              p: 1,
            }}
          >
            <CardContent>
              <Stack direction={"row"} spacing={1} alignItems="center" mb={1}>
                <Chip
                  label={capitalize(task.priority as string)}
                  size="small"
                  sx={{
                    backgroundColor: getPriorityColor(task.priority as string),
                    color: "#fff",
                  }}
                />
                <Typography variant="h5" component="div">
                  {task.title}
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 1.5 }}
              >
                {task.description}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 1.5 }}
                >
                  Tag:
                </Typography>
                <Chip
                  label={task.tags}
                  size="small"
                  sx={{
                    backgroundColor: getTagColor(
                      task.tags as (typeof availableTags)[number]
                    ).color,
                    color: "#fff",
                  }}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <FcApproval size={40} />
            </CardActions>
          </Card>
        ))}
      </CustomTabPanel>
    </Box>
  );
};

export default TaskTab;
