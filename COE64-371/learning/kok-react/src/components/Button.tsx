
import React from 'react';

function Button({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> & {
    asChild?: boolean;
}) {
    const Comp = asChild ? React.Fragment : 'button';

    return (
        <Comp
            data-slot="button"
            className={`${className} inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50`}
            {...props}
        />
    );
}

export { Button };