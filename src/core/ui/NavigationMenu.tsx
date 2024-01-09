import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"

export const NavigationMenu = ({
  className,
  children,
} : {
  className?: string,
  children: React.ReactNode,
}) => {
  return (
    <ul className={cn("w-full dark:text-gray-300 items-center flex-wrap flex", className)}>
      {children}
    </ul>
  );
}

export const NavigationMenuItem = ({
  className,
  link,
} : {
  className?: string,
  link: {
    path: string,
    label: string,
  },
}) => {
  return (
    <li
      className={cn(
        "flex items-center justify-center font-medium lg:justify-start rounded-md text-sm transition colors transform active:*:translate-y-[2px] *:p-1 *:lg:px-2.5 *:w-full *:h-full *:flex *:items-center active:text-current text-gray-600 dark:text-gray-300 hover:text-current dark:hover:text-white",
        className
      )}>
      <Link href={link.path} className="transition-transform duration-500">
        {link.label}
      </Link>
    </li>
  );
}