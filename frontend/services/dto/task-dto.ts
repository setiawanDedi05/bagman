import { User } from "./user";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    label: string;
    createdAt: string;
    updatedAt: string;
    createdBy: User
}

export enum StatusTaskEnum {
    BACKLOG = "backlog",
    ONPROGRESS = "onprogress",
    DONE="done"
}

export enum PriorityTaskEnum {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}

export enum LabelTaskEnum {
    BUG = "bug",
    FEATURE = "feature",
    DOCUMENTATION = "documentation"
}

export interface CreateTaskRequest {
    title: string;
    description: string;
    status: StatusTaskEnum;
    label: LabelTaskEnum;
    priority: PriorityTaskEnum
    projectId: string;
    createdBy: string;
}
export interface UpdateTaskRequest {
    title: string;
    description: string;
    status: StatusTaskEnum;
    label: LabelTaskEnum;
    priority: PriorityTaskEnum
    projectId: string;
    createdBy: string;
}