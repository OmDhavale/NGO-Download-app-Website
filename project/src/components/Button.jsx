import { motion } from 'framer-motion';

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-2xl transition-all focus-glow relative overflow-hidden';

  const variants = {
    primary: 'bg-gradient-to-r from-amber-400 via-orange-300 to-rose-300 text-white hover:from-amber-500 hover:via-orange-400 hover:to-rose-400 shadow-lg hover:shadow-2xl',
    secondary: 'glass text-[rgb(var(--text-primary))] hover:bg-[rgba(var(--glass-bg),0.9)] border-[rgba(var(--border-color),0.3)]',
    destructive: 'bg-gradient-to-r from-rose-400 to-pink-400 text-white hover:from-rose-500 hover:to-pink-500 shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      disabled={disabled}
      {...props}
    >
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
      >
        {icon && <span>{icon}</span>}
        {children}
      </motion.span>
      {!disabled && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent opacity-0 rounded-2xl"
            initial={false}
            whileHover={{ opacity: 0.3, x: ['0%', '100%'] }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0"
            initial={false}
            whileHover={{
              boxShadow: '0 0 30px rgba(251, 146, 60, 0.6), 0 0 60px rgba(244, 114, 182, 0.3)'
            }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </motion.button>
  );
};
