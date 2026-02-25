import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export const Navbar = ({ currentPage, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', value: 'home' },
    { label: 'Dashboard', path: '/dashboard', value: 'dashboard' },
    { label: 'Features', path: '/features', value: 'features' },
    { label: 'Gallery', path: '/gallery', value: 'gallery' },
    { label: 'Manual', path: '/user-manual', value: 'manual' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-2 sm:top-4 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="mx-auto w-full max-w-4xl px-3 sm:px-4">
        <div className="pointer-events-auto glass border border-[rgba(var(--border-color),0.2)] rounded-full shadow-lg w-fit mx-auto">
          <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 whitespace-nowrap">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              as={Link}
              to="/"
            >

              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                MarkIn
              </span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </motion.div>

            <div className="hidden md:flex items-center gap-8 ml-4">
              {navItems.map((item) => (
                <Link
                  key={item.value}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors focus-glow rounded-lg ${location.pathname === item.path
                    ? 'text-[rgb(var(--accent-color))]'
                    : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
                    }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-[rgba(var(--accent-color),0.1)] rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-xl glass hover:bg-[rgba(var(--bg-tertiary),0.5)] transition-colors focus-glow"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl glass hover:bg-[rgba(var(--bg-tertiary),0.5)] transition-colors focus-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden fixed top-14 left-0 right-0 z-40 bg-[rgba(var(--glass-bg),0.95)] backdrop-blur-sm border-t border-[rgba(var(--border-color),0.3)] shadow-lg pointer-events-auto"
        >
          <div className="px-4 py-4 space-y-2 max-h-[60vh] overflow-auto">
            {navItems.map((item) => (
              <Link
                key={item.value}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path
                  ? 'bg-[rgba(var(--accent-color),0.1)] text-[rgb(var(--accent-color))]'
                  : 'text-[rgb(var(--text-secondary))] hover:bg-[rgba(var(--bg-tertiary),0.5)]'
                  }`}
              >
                <motion.div whileTap={{ scale: 0.98 }}>
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
