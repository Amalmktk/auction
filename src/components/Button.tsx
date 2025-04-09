import React, { FC } from 'react';

interface ButtonProps {
  label?: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
  disabled?: boolean;
  iconName?: string;
}
const Button: FC<ButtonProps> = ({
  label,
  onClick,
  isActive = true,
  className,
  disabled = false,
  iconName,
}) => {
  return (
    <button
      className={`${isActive ? 'bg-green-300' : 'bg-white'} ${
        disabled && 'opacity-50'
      } border border-green-900 m-2 p-2 items-center flex justify-center shadow-md ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label && label.toUpperCase()}
      {iconName && (
        <img src={iconName} alt="" className={`${label && 'ml-2'}`} />
      )}
    </button>
  );
};

export default Button;
