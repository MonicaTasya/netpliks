import { cn } from "../../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-3xl hover:cursor-pointer hover:scale-105 transition-transform duration-300 ",
    {
        variants: {
            variant: {
                glass: "text-white font-bold has-[>svg]:gap-2 shadow-xl backdrop-blur-md bg-black/30 border border-gray-600 hover:bg-black/50 active:bg-black/30 active:shadow-none",
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
}

function Button({ className, variant, size, children, ...props }: ButtonProps) {
    return (
        <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
            {children}
        </button>
    );
}

export { Button, buttonVariants };
