'use server';

import { revalidatePath } from "next/cache";

import { createTask, updateTask, deleteTask } from "./database/mutations";
import type Task from "./types/task";
import { withSession } from "~/core/generic/actions-utils";
import getSupabaseServerActionClient from "~/core/supabase/action-client";

type CreateTaskParams = {
  task: Omit<Task, 'id'>;
  csrfToken: string;
}

export const createTaskAction = withSession(
  async (params: CreateTaskParams) => {
    const client = getSupabaseServerActionClient();

    await createTask(client, params.task);

    revalidatePath('/dashboard/[organization]/tasks', 'page');
  }
);

type UpdateTaskParams = {
  task: Partial<Task> & Pick<Task, 'id'>;
}

export const updateTaskAction = withSession(
  async (params: UpdateTaskParams) => {
    const client = getSupabaseServerActionClient();

    await updateTask(client, params.task);

    const path = `/dashboard/[organization]/tasks`;

    revalidatePath(path, 'page');
    revalidatePath(`${path}/[task]`, 'page');
  }
);

type DeleteTaskParams = {
  taskId: number;
}

export const deleteTaskAction = withSession(
  async (params: DeleteTaskParams) => {
    const client = getSupabaseServerActionClient();

    await deleteTask(client, params.taskId);

    revalidatePath('/dashboard/[organization]/tasks', 'page');
  }
);