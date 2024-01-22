'use client';
 
import { FormEventHandler, useCallback, useTransition } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
 
import Textarea from '~/core/ui/Textarea';
import Label from '~/core/ui/Label';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
 
import type Task from '~/lib/tasks/types/task';
import { updateTaskAction } from '~/lib/tasks/actions';
import useCsrfToken from "~/core/hooks/use-csrf-token";
 
const TaskItemContainer: React.FC<{
  task: Task;
}> = ({ task }) => {
  const [isMutating, startTransition] = useTransition();
  const csrfToken = useCsrfToken();
 
  const onUpdate: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
 
      const data = new FormData(e.currentTarget);
      const name = data.get('name') as string;
      const description = data.get('description') as string;
 
      startTransition(async () => {
        await updateTaskAction({
          task: {
            name,
            description,
            id: task.id,
          },
        });
      });
    },
    [task.id],
  );
 
  return (
    <form onSubmit={onUpdate}>
      <div className={'flex flex-col space-y-4 max-w-xl'}>
        <Heading type={2}>{task.name}</Heading>
 
        <TextFieldLabel>
          Name
          <TextFieldInput required defaultValue={task.name} name={'name'} />
        </TextFieldLabel>
 
        <Label>
          Description
          <Textarea
            className={'h-32'}
            name={'description'}
            defaultValue={task.description || ''}
          />
        </Label>
 
        <div className={'flex space-x-2 justify-between'}>
          <Button href={'../tasks'} variant={'ghost'}>
            <span className={'flex space-x-2 items-center'}>
              <ChevronLeftIcon className={'w-4'} />
              <span>Back to Tasks</span>
            </span>
          </Button>
 
          <Button loading={isMutating}>Update Task</Button>
        </div>
      </div>
    </form>
  );
};
 
export default TaskItemContainer;