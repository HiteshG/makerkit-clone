import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/ui/dialog";
import { Button } from '@/core/ui/button';
import { PlusCircle } from "lucide-react";
import { Input } from '@/core/ui/input';

const NewTask = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
            <span className="flex w-full flex-1 items-center">
              <span className="flex items-center space-x-2">
                <PlusCircle className="h-[1.2rem] w-[1.2rem]" />
                <span className="text-sm">New Task</span>
              </span>
            </span>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background dark:shadow-primary/30 dark:shadow-2xl">
        <DialogHeader>
          <DialogTitle>
            Create Task
          </DialogTitle>
        </DialogHeader>
        <form>
          <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
            Name
            <Input
              placeholder="ex. Launch on IndieHackers"
            />
            <span className="block pl-1 text-xs font-normal leading-tight text-gray-500 dark:text-gray-400">
              Hint: whatever you do, ship!
            </span>
          </label>
          <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
            Due date (optional)
            <Input
              type="date"
            />
            <span className="block pl-1 text-xs font-normal leading-tight text-gray-500 dark:text-gray-400">
              Leave blank to set the due date to tomorrow.
            </span>
          </label>
          <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row mt-4">
            <Button>
              <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                <span className="flex w-full flex-1 items-center justify-center">
                  Create Task
                </span>
              </span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewTask;
