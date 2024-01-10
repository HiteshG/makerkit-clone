import { useState } from 'react';
import Link from "next/link";
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';
import { UserPlus2, MoreVertical, Settings2, UserCircle2, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/core/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/core/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/ui/select";

const Members = () => {
  const [roleOpen, setRoleOpen] = useState<boolean>(false);
  const [transferOpen, setTransferOpen] = useState<boolean>(false);
  const [removeOpen, setRemoveOpen] = useState<boolean>(false);

  return (
    <div className="w-full lg:max-w-4xl">
      <div className="flex flex-col space-y-8">
        <div className="rounded-md dark:border-dark-800 w-full border border-gray-100">
          <div className="flex flex-col space-y-0.5 px-container pt-container">
            <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
              Members
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              Manage and Invite members
            </p>
          </div>
          <div className="flex flex-col p-container">
            <div className="w-full space-y-10">
              <div className="flex flex-col lg:flex-row justify-between lg:space-x-4 space-y-4 lg:space-y-0">
                <Input className="w-full lg:w-9/12" placeholder="Search member..." />
                <div className="w-full flex justify-end lg:w-auto lg:min-w-[200px]">
                  <Button variant={"outline"} className="w-full">
                    <Link href={"/settings/organization/members/invite"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                      <span className="flex w-full flex-1 items-center justify-center">
                        <span className="flex items-center space-x-2">
                          <UserPlus2 className="h-5" />
                          <span>Invite Memebers</span>
                        </span>
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col py-2 lg:flex-row lg:items-center lg:space-x-2 justify-between space-y-2 lg:space-y-0">
                <div className="flex flex-auto items-center space-x-4">
                  <div className="flex space-x-4 items-center">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full mx-auto w-9 h-9">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-primary font-semibold uppercase text-primary-foreground">
                        l
                      </span>
                    </span>
                    <div className="block truncate text-sm">
                      legend0619@gmail.com
                    </div>
                    <div className="flex space-x-2 items-center font-medium bg-sky-50 dark:bg-sky-500/10 text-sky-800 dark:text-sky-600 rounded px-2 py-1 text-xs">You</div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4">
                  <div>
                    <div className="flex space-x-2 items-center font-medium rounded px-2 py-1 text-xs bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-500">
                      <span className="font-semibold">Owner</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-full bg-transparent h-8 w-8 flex items-center justify-center dark:focus:ring-primary/70 ring-primary/70 transition-all outline-none focus:ring-2 hover:border dark:border-dark-700 border-gray-100 disabled:cursor-not-allowed disabled:opacity-50 active:bg-gray-100 dark:active:bg-dark-600">
                        <MoreVertical className="w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setRoleOpen(true)}>
                        <span className="flex items-center space-x-2">
                          <Settings2 className="h-5" />
                          <span>Change Role</span>
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTransferOpen(true)}>
                        <span className="flex items-center space-x-2">
                          <UserCircle2 className="h-5" />
                          <span>Transfer Ownership</span>
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setRemoveOpen(true)}>
                        <span className="flex items-center space-x-2 text-red-500">
                          <X className="h-5" />
                          <span>Remove</span>
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={roleOpen} onOpenChange={val => setRoleOpen(val)}>
        <DialogContent className="dark:shadow-primary/30 dark:shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{"Update Member's Role"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-6">
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Admin</SelectItem>
                <SelectItem value="dark">Member</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button variant={"ghost"}>
                <span>Cancel</span>
              </Button>
              <Button variant={"primary"}>
                <span>Update Role</span>
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={transferOpen} onOpenChange={val => setTransferOpen(val)}>
        <DialogContent className="dark:shadow-primary/30 dark:shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Transfer Ownership</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-sm">
              <p>You are transferring ownership of the selected organization to <b>DragonKnight</b>. Your new role will be <b>Admin</b></p>
              <p>Are you sure you want to continue?</p>
            </div>
            <DialogFooter>
              <Button variant={"ghost"}>
                <span>Cancel</span>
              </Button>
              <Button variant={"destructive"}>
                <span>Transfer Ownership</span>
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={removeOpen} onOpenChange={val => setRemoveOpen(val)}>
        <DialogContent className="dark:shadow-primary/30 dark:shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">You are removing this user</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-6">
            <div>
              <p>Are you sure you want to continue?</p>
            </div>
            <DialogFooter>
              <Button variant={"ghost"}>
                <span>Cancel</span>
              </Button>
              <Button variant={"ghost"}>
                <span>Remove User from Organization</span>
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Members;
