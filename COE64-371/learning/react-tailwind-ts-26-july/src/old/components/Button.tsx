// src/components/Button.js
import { memo } from 'react';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button = ({ children, onClick, className = '' }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default memo(Button);