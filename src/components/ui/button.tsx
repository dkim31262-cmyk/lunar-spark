import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-full text-[0.62rem] font-bold tracking-[0.08em] uppercase transition-[transform,border-color,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--color-gold-2) disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-gold-2 text-primary-foreground border border-gold-2",
        outline:
          "bg-transparent text-gold-2 border border-line hover:border-gold-2/70",
        spark:
          "bg-transparent text-spark border border-spark/35 hover:border-spark/70",
        ghost: "bg-transparent text-muted border border-transparent hover:border-soft",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}
