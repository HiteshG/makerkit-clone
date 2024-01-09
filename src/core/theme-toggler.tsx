"use client"

import * as React from "react"
import { Moon, Sun, Check, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/core/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/ui/dropdown-menu";

export function ModeToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup className="p-2">Theme</DropdownMenuGroup>
        <ModeDropdown />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ModeDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <div className="h-4 w-4 me-2">
          {theme === "light" && <Check className="h-4 w-4" />}
        </div>
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all me-2" />
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <div className="h-4 w-4 me-2">
          {theme === "dark" && <Check className="h-4 w-4" />}
        </div>
        <Moon className="h-4 w-4 rotate-0 scale-100 transition-all me-2" />
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        <div className="h-4 w-4 me-2">
          {theme === "system" && <Check className="h-4 w-4" />}
        </div>
        <Monitor className="h-4 w-4 rotate-0 scale-100 transition-all me-2" />
        System
      </DropdownMenuItem>
    </>
  )
}