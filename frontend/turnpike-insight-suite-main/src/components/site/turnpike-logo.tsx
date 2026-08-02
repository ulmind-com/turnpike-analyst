import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function TurnpikeLogo({ className, dark = true, iconOnly = false }: { className?: string, dark?: boolean, iconOnly?: boolean }) {
  return (
    <motion.div 
      className={cn("flex items-center", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap');`}
      </style>
      <svg 
        viewBox="0 0 320 90" 
        className={cn(
          "w-auto drop-shadow-md",
          iconOnly ? "h-10 sm:h-12" : "h-12 sm:h-14 lg:h-16"
        )}
      >
        <defs>
          <linearGradient id="swoosh-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#026bc2" />
            <stop offset="100%" stopColor="#6cc24a" />
          </linearGradient>
          <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity={dark ? "0.3" : "0.1"} />
          </filter>
        </defs>

        {/* Top Swoosh */}
        <path 
          d="M 125 35 C 160 5, 210 10, 240 35 C 190 20, 150 20, 120 42 Z" 
          fill="url(#swoosh-grad)" 
          filter="url(#logo-shadow)"
        />

        {/* Bottom Swoosh */}
        <path 
          d="M 80 60 C 110 90, 160 85, 190 60 C 150 75, 110 75, 85 53 Z" 
          fill="url(#swoosh-grad)" 
          filter="url(#logo-shadow)"
        />

        {/* Text */}
        <text 
          x="160" 
          y="62" 
          textAnchor="middle" 
          fill={dark ? "#ffffff" : "#0f172a"} 
          fontFamily="'Philosopher', sans-serif" 
          fontSize="46" 
          fontWeight="700"
          filter="url(#logo-shadow)"
        >
          Turnpikeanalyst
        </text>
      </svg>
    </motion.div>
  );
}
