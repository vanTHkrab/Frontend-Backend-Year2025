import * as React from 'react'
import {cn} from '../lib/utils'

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const Button = React.memo(( { children, className, onClick, type = 'button' }: Props) => {
    return (
        <button
            type={type}
            className={cn(
                'inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
});

export { Button }