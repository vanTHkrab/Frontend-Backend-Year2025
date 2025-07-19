import * as React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    label: string
    type?: 'submit' | 'button' | 'reset'
}

const ButtonSubmit = React.memo(({ className, label, type = 'submit', ...props }: Props) => {
    return (
        <input
            type="submit"
            value={label}
            className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    )
});

export { ButtonSubmit }