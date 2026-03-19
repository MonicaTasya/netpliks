import { cn } from "../../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-3xl hover:cursor-pointer hover:scale-105 transition-transform duration-300 ",
    {
        variants: {
            variant: {
                glass: "text-white font-bold has-[>svg]:gap-2 shadow-xl backdrop-blur-md bg-white/10 dark:bg-black/30 border border-gray-400 dark:border-gray-600 hover:bg-black/50 dark:hover:bg-white/50 active:bg-black/30 active:shadow-none",
                gray: "bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-700 active:shadow-none",
            },
            size: {
                sm: "px-[14px] text-[14px] py-2",
                md: "px-4 py-[10px] text-[14px]",
                lg: "px-[18px] py-[10px] text-[16px]",
                smIcon: "p-2",
                mdIcon: "p-[10px]",
                lgIcon: "p-3",
            },
        },
        defaultVariants: {
            variant: "glass",
            size: "sm",
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    children: ReactNode;
    isActive?: boolean;
}

function Button({ className, variant, size, children, isActive = false, ...props }: ButtonProps) {
    const activeVariantClass =
        variant === "gray"
            ? "bg-gray-800 text-white ring-1 ring-gray-500"
            : "bg-black/70 dark:bg-white/50 border-gray-500 text-white ring-1 ring-gray-500";

    return (
        <button
            className={cn(
                buttonVariants({ variant, size }),
                isActive && activeVariantClass,
                className
            )}
            {...props}>
            {children}
        </button>
    );
}

export { Button, buttonVariants };
