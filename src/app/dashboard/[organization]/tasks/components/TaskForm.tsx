'use client'

import type { FormEventHandler } from "react";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";

import TextField from "~/core/ui/TextField";
import Button from "~/core/ui/Button";
import If from "~/core/ui/If";
import Label from "~/core/ui/Label";
import Textarea from "~/core/ui/Textarea";

import useCurrentOrganization from "~/lib/organizations/hooks/use-current-organization";
import { createTaskAction } from "~/lib/tasks/actions";
import useCsrfToken from "~/core/hooks/use-csrf-token";

const TaskForm: React.FC = () => {
  const [isMutating, startTransition] = useTransition();
  const organization = useCurrentOrganization();
  const organizationId = organization?.id as number;
  const csrfToken = useCsrfToken();

  const onCreateTask: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const target = event.currentTarget;
      const data = new FormData(target);
      const name = data.get('name') as string;
      const description = data.get('description') as string;
      const dueDate = (data.get('dueDate') as string) || getDefaultDueDate();

      if (name.trim().length < 3) {
        toast.error('Task name must be at least 3 characters long');
        return;
      }

      const task = {
        organizationId,
        name,
        dueDate,
        description,
        done: false,
      };

      startTransition(async () => {
        await createTaskAction({ task, csrfToken });
      });
    },
    [csrfToken, organizationId],
  );

  return (
    <form className={'flex flex-col'} onSubmit={onCreateTask}>
      <div className={'flex flex-col space-y-4 w-full'}>
        <TextField.Label>
          Name
          <TextField.Input
            required
            name={'name'}
            placeholder={'Task name...'}
          />
        </TextField.Label>

        <Label>
          Description
          <Textarea
            name={'description'}
            className={'h-32'}
            placeholder={'Describe the task...'}
          />
        </Label>

        <TextField.Label>
          Due date
          <TextField.Input name={'dueDate'} type={'date'} />
          <TextField.Hint>
            Leave empty to set the due date to tomorrow
          </TextField.Hint>
        </TextField.Label>

        <div className={'flex justify-end'}>
          <Button variant={'flat'} loading={isMutating}>
            <If condition={isMutating} fallback={<>Create Task</>}>
              Creating Task...
            </If>
          </Button>
        </div>
      </div>
    </form>
  );
}

function getDefaultDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(23, 59, 59);
  return date.toDateString();
}

export default TaskForm;