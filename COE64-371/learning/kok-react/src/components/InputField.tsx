import * as React from 'react';

function InputField({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={className}
            {...props}
        />
    )
}

export { InputField };