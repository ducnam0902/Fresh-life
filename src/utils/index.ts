import theme from "./theme";

export const getPriorityColor = (priorityLevel: string) => {
  switch (priorityLevel) {
    case "high":
      return theme.palette.error.main;
    case "medium":
      return theme.palette.warning.main;
    case "low":
      return theme.palette.info.main;
    default:
      return theme.palette.primary.main;
  }
};

export const availableTags = [
  "Work",
  "Personal",
  "Shopping",
  "Health",
  "Study",
  "Project",
  "Other",
] as const;

export const availablePrioritys = ["low", "medium", "high"] as const;

const tagColors: Record<
  (typeof availableTags)[number],
  { bg: string; color: string }
> = {
  Work: { bg: "#dbeafe", color: "#1e40af" },
  Personal: { bg: "#fce7f3", color: "#be185d" },
  Shopping: { bg: "#fef3c7", color: "#b45309" },
  Health: { bg: "#dcfce7", color: "#15803d" },
  Study: { bg: "#e0e7ff", color: "#4338ca" },
  Project: { bg: "#ede9fe", color: "#6b21a8" },
  Other: { bg: "#f3f4f6", color: "#374151" },
};

export const getTagColor = (tag: (typeof availableTags)[number]) => {
  return tagColors[tag];
};
