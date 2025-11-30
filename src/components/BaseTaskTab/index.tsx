import CustomTabPanel from "../CustomTabPanel";
import {
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
import { availableTags, getPriorityColor, getTagColor } from "../../utils";
import { FcApproval } from "react-icons/fc";
import theme from "../../utils/theme";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FcOk } from "react-icons/fc";
import { LuCircleCheckBig } from "react-icons/lu";
import type { ITask } from "../../types/task.types";
interface IBaseTaskTab {
  tasks: ITask[];
  handleComplete?: (taskId: string) => void;
  activeTab: number;
  indexTab: number;
}

const BaseTaskTab = ({
  tasks,
  activeTab,
  indexTab,
  handleComplete,
}: IBaseTaskTab) => {
  const [openModal, setOpenModal] = useState(false);
  const [completeTask, setCompleteTask] = useState<ITask | null>(null);

  const handleShowModal = (task: ITask) => {
    setOpenModal(true);
    setCompleteTask(task);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCompleteTask(null);
  };

  const handleCompleteTask = () => {
    handleCloseModal();
    if (handleComplete && completeTask?.id) {
      handleComplete(completeTask.id);
    }
  };

  return (
    <CustomTabPanel value={activeTab} index={indexTab}>
      {tasks.map((task) => (
        <Card
          key={task.title}
          variant="outlined"
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
            {handleComplete && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleShowModal(task)}
              >
                Complete
              </Button>
            )}

            {!handleComplete && <FcApproval size={40} />}
          </CardActions>
        </Card>
      ))}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
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
            onClick={handleCloseModal}
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
            variant="outlined"
            sx={{
              padding: 4,
              backgroundColor: "#fafafa",
              borderRadius: 1,
              border: "1px solid #eee",
            }}
          >
            <Stack direction={"row"} spacing={1} alignItems="center" mb={1}>
              <Chip
                label={capitalize(completeTask?.priority ?? '' as string)}
                size="small"
                sx={{
                  backgroundColor: getPriorityColor(completeTask?.priority as string),
                  color: "#fff",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  lineHeight: "1.6",
                  marginBottom: 1,
                }}
              >
                {completeTask?.title}
              </Typography>
            </Stack>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "400",
                fontSize: "1.25rem",
                lineHeight: "1.43",
                color: "#0009",
                marginBottom: 1,
              }}
            >
              {completeTask?.description}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              marginTop={2}
            >
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 1.5 }}
              >
                Tag:
              </Typography>
              <Chip
                label={completeTask?.tags ?? ""}
                size="small"
                sx={{
                  backgroundColor: getTagColor(
                    completeTask?.tags ?? ("" as (typeof availableTags)[number])
                  )?.color,
                  color: "#fff",
                }}
              />
            </Stack>
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
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<LuCircleCheckBig size={20} color="#fff" />}
            onClick={handleCompleteTask}
          >
            Complete Task
          </Button>
        </DialogActions>
      </Dialog>
    </CustomTabPanel>
  );
};

export default BaseTaskTab;
