import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}

// Performance optimized animation variants
const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)"
  }
};

const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateX: -15
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0
  }
};

const slideInVariants = {
  hidden: {
    opacity: 0,
    x: -60,
    skewX: 5
  },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0
  }
};

// Enhanced Fade in from bottom animation with blur effect
export const FadeInUp = ({ children, delay = 0, className = "", duration = 0.6 }: MotionWrapperProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeInUpVariants}
    transition={{
      delay,
      duration,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Enhanced slide in from left with skew effect
export const FadeInLeft = ({ children, delay = 0, className = "", duration = 0.6 }: MotionWrapperProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={slideInVariants}
    transition={{
      delay,
      duration,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Enhanced scale animation with 3D effect
export const ScaleIn = ({ children, delay = 0, className = "" }: MotionWrapperProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={scaleInVariants}
    transition={{
      delay,
      duration: 0.5,
      ease: "easeOut"
    }}
    whileHover={{
      scale: 1.02,
      y: -2,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }}
    whileTap={{ scale: 0.98 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Modern stagger container with optimized performance
export const StaggerContainer = ({ children, className = "" }: MotionWrapperProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger item for use with StaggerContainer
export const StaggerItem = ({ children, className = "" }: Omit<MotionWrapperProps, 'delay'>) => (
  <motion.div
    variants={{
      hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
        filter: "blur(4px)"
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Tech-style loading spinner
export const TechSpinner = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`inline-block w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full ${className}`}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

// Glitch effect animation for modern tech feel
export const GlitchText = ({ children, className = "" }: MotionWrapperProps) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{
      textShadow: [
        "0 0 0 transparent",
        "2px 0 0 #ff0000, -2px 0 0 #00ff00",
        "0 0 0 transparent"
      ],
      transition: { duration: 0.2 }
    }}
  >
    {children}
  </motion.div>
);

// Floating animation for background elements
export const FloatingElement = ({ children, className = "", amplitude = 10, duration = 3 }: MotionWrapperProps & { amplitude?: number }) => (
  <motion.div
    className={className}
    animate={{
      y: [-amplitude, amplitude, -amplitude],
      rotate: [-2, 2, -2]
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

// Page transition wrapper
export const PageTransition = ({ children, className = "" }: MotionWrapperProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Modern button hover effect
export const TechButton = ({ children, className = "", onClick, disabled = false }:
  MotionWrapperProps & { onClick?: () => void; disabled?: boolean }) => (
  <motion.button
    className={`relative overflow-hidden ${className}`}
    onClick={onClick}
    disabled={disabled}
    whileHover={{
      scale: 1.02,
      boxShadow: "0 0 20px rgba(var(--primary), 0.3)"
    }}
    whileTap={{ scale: 0.98 }}
    initial={false}
    animate={disabled ? { opacity: 0.5 } : { opacity: 1 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.6 }}
    />
    {children}
  </motion.button>
);

// Card with advanced hover effects
export const TechCard = ({ children, className = "" }: MotionWrapperProps) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{
      y: -5,
      rotateX: 5,
      rotateY: 5,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
    }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 rounded-lg"
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
    {children}
  </motion.div>
);
