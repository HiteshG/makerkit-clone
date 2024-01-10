import { Pencil } from 'lucide-react';
import React from 'react';
import { Textarea } from '@/core/ui/textarea';

const TaskDetail = () => {
  return (
    <>
      <div className="flex items-center space-x-3 rounded-lg p-4">
        <Pencil className="w-6 h-6" />
        <div className="flex flex-1">
          <h3 className="font-heading scroll-m-20 text-2xl font-semibold tracking-tight">
            <p
              className="p-2 ring ring-transparent transition-colors hover:ring-gray-200 dark:hover:ring-black-300 focus:ring-primary-500 dark:focus:ring-primary-500 outline-none"
              contentEditable
            >
              123
            </p>
          </h3>
        </div>
        <div className="justify-end text-sm dark:text-gray-400">
          This task is due by Thu Jan 11 2024
        </div>
      </div>
      <div className="TextFieldInputContainer h-36 p-2 dark:bg-black-500 dark:border-black-500">
        <Textarea placeholder="Update the description... it will auto save when you leave this field"></Textarea>
      </div>
    </>
  );
}

export default TaskDetail;
