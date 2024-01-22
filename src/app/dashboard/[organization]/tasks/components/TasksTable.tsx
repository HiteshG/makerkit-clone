'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useTransition } from "react";
import { formatDistance } from "date-fns";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import type Task from "~/lib/tasks/types/task";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent
} from "~/core/ui/Dropdown";

import DataTable from "~/core/ui/DataTable";
import IconButton from "~/core/ui/IconButton";
import Badge from "~/core/ui/Badge";
import If from "~/core/ui/If";

import { deleteTaskAction, updateTaskAction } from "~/lib/tasks/actions";
import useCsrfToken from "~/core/hooks/use-csrf-token";
import Modal from "~/core/ui/Modal";
import Button from "~/core/ui/Button";


const TABLE_COLUMNS: ColumnDef<Task>[] = [
  {
    header: 'Name',
    cell: ({ row }) => {
      const task = row.original;

      return (
        <Link className={'hover:underline'} href={'tasks/' + task.id}>
          {task.name}
        </Link>
      )
    }
  },
  {
    header: 'Description',
    id: 'description',
    cell: ({ row }) => {
      const task = row.original;
      const length = task.description?.length ?? 0;

      return (
        <span className={'truncate max-w-[50px]'}>
          {length > 0 ? task.description : '_'}
        </span>
      )
    }
  },
  {
    header: 'Due Date',
    id:'dueDate',
    cell: ({ row }) => {
      const task = row.original;

      const dueDate = formatDistance(new Date(task.dueDate), new Date(), {
        addSuffix: true,
      });

      return (
        <If
          condition={task.done}
          fallback={<span className={'capitalize'}>{dueDate}</span>}
        >
          <div className={'inline-flex'}>
            <Badge size={'small'} color={'success'}>
              Done
            </Badge>
          </div>
        </If>
      )
    }
  },
  {
    header: '',
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original;

      return (
        <div className={'flex justify-end'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton>
                <EllipsisVerticalIcon className="w-5" />
              </IconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              collisionPadding={{
                right: 20,
              }}
            >
              <DropdownMenuItem>
                <Link href={'tasks/' + row.original.id}>View Task</Link>
              </DropdownMenuItem>

              <UpdateStatusMenuItem task={task} />
              <DeleteTaskMenuItem task={task} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];

function TasksTable(
  props: React.PropsWithChildren<{
    pageIndex: number;
    pageCount: number;
    tasks: Task[];
  }>,
) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DataTable
      onPaginationChange={({ pageIndex }) => {
        router.push(`${pathname}?page=${pageIndex + 1}`);
      }}
      pageIndex={props.pageIndex}
      pageCount={props.pageCount}
      data={props.tasks}
      columns={TABLE_COLUMNS}
    />
  )
}

function DeleteTaskMenuItem({ task }: { task: Task }) {
  const [, startTransition] = useTransition();
  const csrfToken = useCsrfToken();

  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <ConfirmDeleteTaskModal
        task={task.name}
        onConfirm={() => {
          startTransition(async () => {
            await deleteTaskAction({ taskId: task.id});
          });
        }}
      >
        <span className={'text-red-500'}>Delete Task</span>
      </ConfirmDeleteTaskModal>
    </DropdownMenuItem>
  )
}

function UpdateStatusMenuItem({
  task,
}: React.PropsWithChildren<{
  task: Task,
}>) {
  const [isPending, startTransition] = useTransition();
  const action = task.done ? 'Mask as Todo' : 'Mark as Done';

  return (
    <DropdownMenuItem
      disabled={isPending}
      onSelect={(e) => e.preventDefault()}
      onClick={() => {
        startTransition(async () => {
          await updateTaskAction({
            task: {
              id: task.id,
              done: !task.done,
            }
          })
        })
      }}
    >
      {action}
    </DropdownMenuItem>
  );
}

function ConfirmDeleteTaskModal({
  children,
  onConfirm,
  task,
}: React.PropsWithChildren<{
  task: string,
  onConfirm: () => void,
}>) {
  return (
    <Modal heading={'Deleting Task'} Trigger={children}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'text-sm flex flex-col space-y-2'}>
          <p>You are about to delete the task <b>{task}</b></p>
          <p>Do you want to continue?</p>
        </div>

        <div className={'flex justify-end space-x-2'}>
          <Button variant={'flat'} color={'danger'} onClick={onConfirm}>
            Yep, delete task
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default TasksTable;