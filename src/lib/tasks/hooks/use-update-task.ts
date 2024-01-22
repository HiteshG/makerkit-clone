import useSWRMutation from "swr/mutation";
import useSupabase from "~/core/hooks/use-supabase";
import type Task from "../types/task";
import { updateTask } from "../database/mutations";

type TaskPayload = Partial<Task> & { id: number };

function useUpdateTaskMutation() {
    const client = useSupabase();
    const key = ['tasks'];

    return useSWRMutation(key, async (_, { arg: task }: { arg: TaskPayload }) => {
        return updateTask(client, task);
    })
}

export default useUpdateTaskMutation;