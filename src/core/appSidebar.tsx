import React from 'react';
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from "@/core/ui/dropdown-menu";
import { Check, PlusCircle, MoreVertical, LayoutGrid, Layers3, User2, Users2, Wallet, ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import { Button } from "@/core/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarItem } from '@/core/ui/sidebar';
import { NavbarDropdown } from './navbar';

const AppSidebar = () => {
  return (
    <Sidebar collapsed>
      <div className="flex w-full flex-col space-y-1 px-container mt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-10 w-full space-x-2 items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 lg:text-base group hover:bg-gray-50 cursor-pointer border-transparent dark:hover:bg-dark-900/50 dark:hover:text-white max-h-12">
              <div className="flex max-w-[12rem] items-center space-x-2.5">
                <span className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-primary font-semibold uppercase text-primary-foreground">
                    F
                  </span>
                </span>
                <span className="w-auto truncate text-sm">
                  First
                </span>
              </div>
              <MoreVertical className="h-5 hidden group-hover:block text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="z-50 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:shadow-primary/40 dark:shadow-2xl !min-w-[15rem]">
            <DropdownMenuGroup className="p-2">Your Organizations</DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="h-4 w-4 me-2">
                {<Check className="h-4 w-4" />}
              </div>
              <span className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full text-base">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-primary font-semibold uppercase text-primary-foreground">
                  F
                </span>
              </span>
              <span className="ms-2">First</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Button type="button" variant="ghost" size="sm" className="w-full">
                <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                  <span className="flex w-full flex-1 items-center">
                    <span className="flex items-center space-x-2">
                      <PlusCircle className="h-[1.2rem] w-[1.2rem]" />
                      <span className="text-sm">New Organization</span>
                    </span>
                  </span>
                </span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <SidebarContent>
        <SidebarItem path={"/dashboard"} icon={<LayoutGrid className="w-5" />}>Dashboard</SidebarItem>
        <SidebarItem path={"/tasks"} icon={<Layers3 className="w-5" />}>Tasks</SidebarItem>
        <SidebarGroup label='Settings' collapsible={false} collapsed={false}>
          <SidebarItem path={"/settings/profile"} icon={<User2 className="w-5" />}>Profile</SidebarItem>
          <SidebarItem path={"/settings/organization"} icon={<Users2 className="w-5" />}>Organization</SidebarItem>
          <SidebarItem path={"/settings/subscription"} icon={<Wallet className="w-5" />}>Subscription</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <div className="absolute bottom-0 w-full bg-background">
        <div className="flex w-full flex-col space-y-1 px-container">
          <div className="flex flex-col space-y-4 py-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex cursor-pointer focus:outline-none group w-full items-center space-x-2.5 rounded-lg border border-gray-100 dark:border-dark-900 p-2 transition-colors hover:bg-gray-50 dark:hover:bg-dark-800/40">
                  <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full mx-auto">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-primary font-semibold uppercase text-primary-foreground">
                      A
                    </span>
                    {/* <Image className="aspect-square h-full w-full" alt='profileImage' src={""} /> */}
                  </span>
                  <div className="flex flex-col text-left w-full truncate">
                    <span className="text-sm truncate">
                      Legend900619
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      legend900619@gmail.com
                    </span>
                  </div>
                  <MoreVertical className="h-8 hidden text-gray-500 group-hover:flex" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-50 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:shadow-primary/40 dark:shadow-2xl !min-w-[15rem] mb-4">
                <NavbarDropdown />
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="bg-background absolute -right-[10px] bottom-[30px] cursor-pointer block">
              <ArrowRightCircle className="bg-background text-gray-300 dark:text-gray-600 h-5 w-5 hidden" />
              <ArrowLeftCircle className="bg-background text-gray-300 dark:text-gray-600 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default AppSidebar;
