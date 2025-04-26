import React from 'react';

/**
 * Alert component for displaying various message types
 * @param {string} type - Type of alert (info, error, success, warning)
 * @param {string} title - Alert title
 * @param {string|Array|React.ReactNode} children - Alert content
 * @returns {JSX.Element} Rendered alert
 */
const Alert = ({ type = 'info', title, children }) => {
  // Define color schemes based on type
  const colorSchemes = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-700',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-700',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-700',
    },
  };

  const colors = colorSchemes[type] || colorSchemes.info;

  return (
    <div
      className={`${colors.bg} border-l-4 ${colors.border} ${colors.text} p-4 rounded-lg`}
      role="alert"
    >
      {title && <p className="font-medium">{title}</p>}
      {Array.isArray(children) ? (
        <ul className="list-disc list-inside mt-1 text-sm">
          {children.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : typeof children === 'string' ? (
        <p className="text-sm">{children}</p>
      ) : (
        children
      )}
    </div>
  );
};

export default Alert;
