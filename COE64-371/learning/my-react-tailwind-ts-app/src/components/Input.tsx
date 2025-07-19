import * as React from "react";
import {cn} from "../lib/utils.ts";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    label?: string;
    name: string;
}

const InputField = React.memo(({ className, label ,name, type = "text", ...props }: Props) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label || name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <input
                className={cn(
                    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                    className
                )}
                id={name}
                name={name}
                type={type}
                {...props}
            />
        </div>
    );
});

export { InputField };