import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Button } from '@/core/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/ui/dropdown-menu";

const MobileMenu = () => {
  const router = useRouter();
  const pathName = router.pathname;

  let title = "";
  if (pathName === "/settings/profile") title = "My Details";
  if (pathName === "/settings/profile/authentication") title = "Authentication";
  if (pathName === "/settings/profile/email") title = "Email";
  if (pathName === "/settings/profile/password") title = "Password";

  return (
    <div className="block w-full lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"} className="w-full">
            <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
              <span className="flex w-full flex-1 items-center justify-center">
                <span className="flex w-full items-center justify-between space-x-2">
                  <span>{title}</span>
                  <ChevronDown className="h-5" />
                </span>
              </span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent style={{width: "100vw"}}>
          <DropdownMenuItem className="h-12">
            <Link href={"/settings/profile"} className="flex items-center space-x-4 h-full w-full text-sm font-semibold">
              <span>My Details</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-12">
            <Link href={"/settings/profile/authentication"} className="flex items-center space-x-4 h-full w-full text-sm font-semibold">
              <span>Authentication</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-12">
            <Link href={"/settings/profile/email"} className="flex items-center space-x-4 h-full w-full text-sm font-semibold">
              <span>Email</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-12">
            <Link href={"/settings/profile/password"} className="flex items-center space-x-4 h-full w-full text-sm font-semibold">
              <span>Password</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MobileMenu;
