"use client";

import { motion } from "framer-motion";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="container mx-auto px-4 max-w-5xl"
    >
      {children}
    </motion.div>
  );
}
