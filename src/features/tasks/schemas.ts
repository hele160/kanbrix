import { z } from "zod";

import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  status: z.nativeEnum(TaskStatus),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});

// 表单验证用 schema（workspaceId 从 hook 获取，dueDate 来自 DatePicker 组件已经是 Date）
export const createTaskFormSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  status: z.nativeEnum(TaskStatus),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});
