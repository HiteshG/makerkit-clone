import { useState } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/core/ui/dialog';
import { Button } from '@/core/ui/button';

const PendingInvites = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full max-w-4xl">
      <div className="rounded-md dark:border-dark-800 w-full border border-gray-100">
        <div className="flex flex-col space-y-0.5 px-container pt-container">
          <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
            Pending Invites
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Manage invites not yet accepted
          </p>
        </div>
        <div className="flex flex-col p-container">
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-dark-900">
            <div className="flex py-2 flex-row items-center space-x-2 justify-between">
              <div className="flex items-center space-x-4">
                <span className="relative flex shrink-0 overflow-hidden rounded-full mx-auto w-9 h-9">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-primary font-semibold uppercase text-primary-foreground">l</span>
                </span>
                <div className="block truncate text-sm">
                  legend900619@gmail.com
                </div>
              </div>
              <div className="flex items-center justify-end space-x-8">
                <div className="flex space-x-2 items-center font-medium rounded px-2 py-1 text-xs bg-sky-50 dark:bg-sky-500/10 text-sky-500">
                  <span className="font-semibold">Member</span>
                </div>
                <button
                  className="rounded-full bg-transparent h-8 w-8 flex items-center justify-center dark:focus:ring-primary/70 ring-primary/70 transition-all outline-none focus:ring-2 hover:border dark:border-dark-700 border-gray-100 disabled:cursor-not-allowed disabled:opacity-50 *:active:bg-gray-100 dark:active:bg-dark-600"
                  type="button"
                  onClick={() => setOpen(true)}
                >
                  <X className="h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        <DialogContent className="dark:shadow-primary/30 dark:shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Deleting Invite</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-sm">
              <p>You are deleting the invite to <b>legend900619@gmail.com</b>.</p>
              <p>Are you sure you want to continue?</p>
            </div>
            <DialogFooter>
              <Button variant={"ghost"} onClick={() => setOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant={"destructive"}>
                <span>Delete Invites</span>
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PendingInvites;
