// src/components/Alert.js
import { memo } from 'react';

interface Props {
    message?: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    onClose?: () => void;
}

const Alert = ({ message, type = 'info', onClose }: Props) => {
  const alertStyles = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  if (!message) {
    return null;
  }

  return (
    <div
      className={`p-4 rounded-md fixed top-5 right-5 z-50 flex items-center justify-between shadow-lg animate-fade-in-down ${alertStyles[type]}`}
      role="alert"
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold text-xl hover:text-gray-700 transition-colors">&times;</button>
    </div>
  );
};

export default memo(Alert);