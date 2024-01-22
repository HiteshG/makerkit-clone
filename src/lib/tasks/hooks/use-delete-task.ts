import useSWRMutation from "swr/mutation";

import useSupabase from "~/core/hooks/use-supabase";
import { deleteTask } from "../database/mutations";

function useDeleteTaskMutation() {
  const client = useSupabase();
  const taskId = ['tasks'];

  return useSWRMutation(
    taskId,
    async (_, { arg: taskId }: { arg: number }) => {
      return deleteTask(client, taskId);
    }
  )
}

export default useDeleteTaskMutation;