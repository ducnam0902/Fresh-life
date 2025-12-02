export const getPriorityColor = (priorityLevel: string) => {
  switch (priorityLevel) {
    case "high":
      return {
        backgroundColor: "#ffe2e2",
        color: "#c10007",
      };
    case "medium":
      return {
        backgroundColor: "#fef9c2",
        color: "#a65f00",
      };
    case "low":
      return {
        backgroundColor: "#dbeafe",
        color: "#1447e6",
      };
    default:
      return {
        backgroundColor: "#dbeafe",
        color: "#1447e6",
      };
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
