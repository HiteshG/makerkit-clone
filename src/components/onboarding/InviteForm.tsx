import React, { FormEvent } from 'react';
import { Button } from '@/core/ui/button';
import { Input } from '@/core/ui/input';
import { PlusCircle, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/ui/select";

const InviteForm = (
  props: React.PropsWithChildren<{
    children?: React.ReactNode,
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  }>
) => {
  return (
    <form className="flex flex-col space-y-8" onSubmit={props.onSubmit}>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-0.5 md:space-x-2">
          <div className="w-7/12">
            <Input
              placeholder="member@email.com"
            />
          </div>
          <div className="w-4/12">
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Admin</SelectItem>
                <SelectItem value="dark">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[60px] flex justify-end">
            <button type="button" className="rounded-full bg-transparent h-8 w-8 flex items-center justify-center dark:focus:ring-primary/70 ring-primary/70 transition-all outline-none focus:ring-2 hover:border dark:border-dark-700 border-gray-100 disabled:cursor-not-allowed disabled:opacity-50 *:active:bg-gray-100 dark:active:bg-dark-600">
              <X className="h-5" />
            </button>
          </div>
        </div>
        <div>
          <Button type="button" variant="ghost" size="sm">
            <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
              <span className="flex w-full flex-1 items-center justify-center">
                <span className="flex items-center space-x-2">
                  <PlusCircle className="h-5" />
                  <span>Add another one</span>
                </span>
              </span>
            </span>
          </Button>
        </div>
      </div>
      {props.children}
    </form>
  );
}

export default InviteForm;
