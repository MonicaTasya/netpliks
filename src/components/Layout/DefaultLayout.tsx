import { cn } from "../../utils/cn";
import { ReactNode } from "react";

interface DefaultLayoutProps {
    className?: string;
    children: ReactNode;
}

const DefaultLayout = ({ className, children, ...props }: DefaultLayoutProps) => {
    return (
        <section
            className={cn(
                `relative mx-auto flex w-full flex-col items-center gap-4 px-4 py-10 sm:px-8 xl:px-20`,
                className
            )}
            {...props}>
            <div className="relative w-full max-w-360 bg-transparent">{children}</div>
        </section>
    );
};

export default DefaultLayout;
