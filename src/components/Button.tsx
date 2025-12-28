import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-full text-lg shadow-lg shadow-blue-500/20 transition-colors ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
