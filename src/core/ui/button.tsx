import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:[&>*]:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        custom:
          "border border-gray-200 text-gray-600 ring-primary/70 ring-offset-1 transition-all hover:border-gray-300 hover:bg-gray-50 focus:ring-2 active:bg-gray-100 dark:border-dark-700 dark:bg-background/90 dark:text-gray-200 dark:ring-primary/70 dark:hover:border-dark-600 dark:hover:bg-background/50 dark:focus:ring-offset-dark-800 dark:active:bg-background/80",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
        primary: "bg-primary/5 text-primary hover:bg-primary/10",
      },
      size: {
        default: "text-sm h-10 [&>*]:py-2 [&>*]:px-4",
        sm: "[&>*]:py-2 [&>*]:px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
