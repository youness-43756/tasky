import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "hover:bg-slate-100 text-lime-700",
        superGhost: "bg-slate-100 hover:bg-slate-200 text-lime-700",
        gray: "bg-gray-600 text-slate-100 hover:bg-gray-700",
        lime: "bg-lime-600  border-t-4 active:border-0 border-lime-700 text-slate-100 hover:bg-lime-600/90",
        danger:
          "bg-red-500 text-destructive-foreground border-t-4 border-red-600 hover:bg-red-600/90 active:border-0",
        outline: "border-t-4 border-slate-200 hover:text-accent-foreground hover:bg-slate-100 active:border-0",
        link: "text-sm font-medium text-slate-500 underline-offset-2 hover:underline hover:text-accent-foreground transition-none tracking-normal",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 md:w-auto",
        full: "w-full h-11"
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
