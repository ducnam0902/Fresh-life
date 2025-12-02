export interface OverviewCountTask {
  pending: number;
  total: number;
  completed: number;
}

export interface ITask {
  id?: string;
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  priority?: "low" | "medium" | "high";
  tags?:
    | "Work"
    | "Personal"
    | "Shopping"
    | "Health"
    | "Study"
    | "Project"
    | "Other";
  userId?: string;
}

export interface IToast {
  open: boolean;
  message: string;
}