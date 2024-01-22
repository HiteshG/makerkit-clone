import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

import useSupabase from "~/core/hooks/use-supabase";
import { createTask } from "../database/mutations";
import type Task from "../types/task";

function useCreateTaskMutation() {
  const client = useSupabase();
  const router = useRouter();
  const key = 'tasks';

  return useSWRMutation(key, async (_, { arg: task }: {arg: Omit<Task, 'id'>}) => {
    return createTask(client, task);
  }, {
    onSuccess: () => router.refresh(),
  })
}

export default useCreateTaskMutation;