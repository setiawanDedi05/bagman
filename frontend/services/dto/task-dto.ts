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