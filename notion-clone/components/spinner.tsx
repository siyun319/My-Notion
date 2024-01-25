// icon toolkit
import { Loader } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * you're defining the expected structure of props
 * for a component called Spinner.
 * https://www.w3schools.com/typescript/typescript_aliases_and_interfaces.php
 * 
 */
interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

// the type of the props to the component must be SpinnerProps
export const Spinner = ({ size }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size }))} />;
};
