import React, { useState } from 'react';
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/ui/table";
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/core/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/core/ui/dialog';
import { Button } from '@/core/ui/button';

const TaskTable = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="border border-gray-50 dark:border-dark-800 rounded-md p-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Task1</TableCell>
            <TableCell>-</TableCell>
            <TableCell>In About 8 Hours</TableCell>
            <TableCell>
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full bg-transparent h-8 w-8 flex items-center justify-center dark:focus:ring-primary/70 ring-primary/70 transition-all outline-none focus:ring-2 hover:border dark:border-dark-700 border-gray-100 disabled:cursor-not-allowed disabled:opacity-50 active:bg-gray-100 dark:active:bg-dark-600">
                      <MoreVertical className="w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={"/tasks/123"}>
                        View Task
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Mask as Done
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button className="text-red-500" onClick={() => setOpen(true)}>
                        Delete Task
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        <DialogContent className="dark:shadow-primary/30 dark:shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Deleting Task</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col space-y-4 mt-2">
                <div className="text-sm flex flex-col space-y-2">
                  <p>You are about to delete the task <b>Task</b></p>
                  <p>Do you want to continue?</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={"destructive"}>
              <span>Yep, delete task</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TaskTable;
