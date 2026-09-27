import { motion } from 'framer-motion';

/**
 * Reusable Button Component for futuristic AI theme.
 * Uses Framer Motion for premium hover/tap interactions.
 */
const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost'
  size = 'md',        // 'sm', 'md', 'lg'
  className = '',
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  type = 'button'
}) => {
  // Styles based on variants
  const baseStyle = "relative flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  };

  const variantStyles = {
    // Primary: Violet glowing solid/gradient style
    primary: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] border border-violet-400/30",
    
    // Secondary: Neon Purple glowing solid/gradient style
    secondary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] border border-purple-400/30",
    
    // Outline: works in both light and dark
    outline: "bg-gray-100 dark:bg-[#141A29]/40 backdrop-blur-md text-violet-600 dark:text-violet-300 border border-violet-500/30 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-[#141A29]/75",
    
    // Ghost: Clean transparent
    ghost: "bg-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {/* Background glow animation (for primary and secondary) */}
      {(variant === 'primary' || variant === 'secondary') && (
        <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {Icon && iconPosition === 'left' && (
        <Icon className={`w-[1.2em] h-[1.2em] ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />
      )}
      
      <span className="relative z-10">{children}</span>
      
      {Icon && iconPosition === 'right' && (
        <Icon className={`w-[1.2em] h-[1.2em] ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />
      )}
    </motion.button>
  );
};

export default Button;
