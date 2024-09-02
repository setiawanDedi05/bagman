import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircleIcon, FileQuestionIcon, WatchIcon } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: FileQuestionIcon,
  },
  {
    value: "onprogress",
    label: "In Progress",
    icon: WatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircleIcon,
  }
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
