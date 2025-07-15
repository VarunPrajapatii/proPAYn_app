interface PaymentButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<PaymentButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
const baseStyles = "relative overflow-hidden font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer";
    
const responsiveSize = "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base lg:px-8 lg:py-4 lg:text-lg";


  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${responsiveSize} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;