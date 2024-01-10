import React, { useState } from 'react';
import Link from "next/link";
import { Menu, LayoutGrid, LogOut, Landmark, Layers3, User2, Users2, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/core/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import { CurrentDropdown } from './appSidebar';
import { useSignOut } from '@/lib/auth/hooks/useSignOut';

const MobileNavbar = () => {
  const [signOutReq] = useSignOut();
  const [open, setOpen] = useState<boolean>(false);

  const onSignOut = () => {
    signOutReq();
  }

  return (
    <div className="flex items-center lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu className="w-9 h-9" />
        </DropdownMenuTrigger>
        <DropdownMenuContent style={{width: "100vw"}}>
          <DropdownMenuItem className="h-12">
            <button className="flex items-center space-x-4 h-full w-full" onClick={() => setOpen(true)}>
              <Landmark className="w-6 h-6" />
              <span>Your Organizations</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-12">
            <Link href={"/dashboard"} className="flex items-center space-x-4 h-full w-full">
              <LayoutGrid className="w-6 h-6" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-12">
            <Link href={"/tasks"} className="flex items-center space-x-4 h-full w-full">
              <Layers3 className="w-6 h-6" />
              <span>Tasks</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-12">
            <Link href={"/settings/profile"} className="flex items-center space-x-4 h-full w-full">
              <User2 className="w-6 h-6" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-12">
            <Link href={"/settings/organization"} className="flex items-center space-x-4 h-full w-full">
              <Users2 className="w-6 h-6" />
              <span>Organization</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-12">
            <Link href={"/settings/subscription"} className="flex items-center space-x-4 h-full w-full">
              <Wallet className="w-6 h-6" />
              <span>Subscription</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="h-12">
            <button className="flex items-center space-x-4 h-full w-full" onClick={onSignOut}>
              <LogOut className="w-6 h-6" />
              <span>Sign out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        <DialogContent className="dark:shadow-primary/30 dark:shadow-2xl">
          <DialogHeader>
            <DialogTitle>Your Organizations</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Select an organization below to switch to it
          </DialogDescription>
          <CurrentDropdown collapsed={false} className="!min-w-[29rem]" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MobileNavbar;
