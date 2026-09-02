import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  Banknote,
  Building2,
  GraduationCap,
  HeartPulse,
  Plane,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type Industry = { title: string; description: string; icon: LucideIcon };

export const INDUSTRIES: readonly Industry[] = [
  { title: "E-Commerce & Retail", description: "High-performance storefronts, inventory management, and personalized shopping experiences.", icon: ShoppingCart },
  { title: "Healthcare", description: "Secure, compliant data pipelines and patient management systems for modern healthcare.", icon: HeartPulse },
  { title: "Cybersecurity & Enterprise", description: "Zero-trust architectures and threat detection systems engineered for scale.", icon: ShieldCheck },
  { title: "Education & EdTech", description: "Scalable learning management systems and educational content delivery platforms.", icon: GraduationCap },
  { title: "Fintech & Banking", description: "Compliant fintech platforms — payments, lending, wealth management and banking infrastructure engineered for security and scale.", icon: Banknote },
  { title: "Travel & Tourism", description: "Booking engines, loyalty programs, and digital experiences for the travel sector.", icon: Plane },
  { title: "Logistics & Supply Chain", description: "Real-time tracking, warehouse automation, and supply chain visibility solutions.", icon: Truck },
  { title: "Startups & SMBs", description: "Agile product development and scalable architecture for rapidly growing companies.", icon: Rocket },
];

export function IndustryGrid({
  items = INDUSTRIES,
  className,
}: {
  items?: readonly Industry[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Chunk items into rows of 4 for the flex layout
  const rows = [];
  for (let i = 0; i < items.length; i += 4) {
    rows.push(items.slice(i, i + 4));
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-col gap-4 lg:flex-row lg:h-52">
          {row.map((item, colIndex) => {
            const index = rowIndex * 4 + colIndex;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.button
                key={item.title}
                type="button"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                animate={{
                  flex: isHovered ? 2.5 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "industry-tile group relative isolate flex min-h-48 w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-500 hover:shadow-[0_26px_60px_-28px_color-mix(in_oklab,var(--primary)_40%,transparent)] lg:w-auto",
                  isHovered 
                    ? "border-primary/50 bg-[linear-gradient(135deg,var(--primary),var(--brand-cyan))] text-primary-foreground shadow-lg" 
                    : "border-border/40 bg-card text-card-foreground shadow-[0_8px_30px_-12px_rgba(0,0,0,0.04)]"
                )}
              >
                <div className={cn(
                  "flex h-full w-full items-center justify-center p-6 lg:p-8",
                  isHovered ? "lg:justify-start" : "flex-col gap-4 text-center"
                )}>
                  
                  {/* Icon */}
                  <span className={cn(
                    "grid shrink-0 place-items-center transition-all duration-500",
                    isHovered 
                      ? "size-16 text-white" 
                      : "size-14 text-[linear-gradient(150deg,var(--primary),var(--brand-cyan))] text-primary group-hover:-translate-y-1 group-hover:scale-110"
                  )}>
                    <item.icon className={cn("transition-all duration-500", isHovered ? "size-12" : "size-10")} strokeWidth={isHovered ? 1.5 : 1.5} />
                  </span>
                  
                  {/* Content Container (Visible differently based on state) */}
                  <div className={cn(
                    "flex flex-col transition-all duration-500",
                    isHovered ? "ml-6 items-start" : "items-center"
                  )}>
                    <span className={cn(
                      "font-bold leading-snug tracking-tight transition-all duration-300",
                      isHovered ? "text-xl text-white mb-2" : "text-sm text-foreground"
                    )}>
                      {item.title}
                    </span>
                    
                    {/* Description (Only fully visible when hovered) */}
                    <motion.p
                      initial={false}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? "auto" : 0,
                        display: isHovered ? "block" : "none"
                      }}
                      className="text-sm font-medium text-white/90 max-w-[280px]"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                  
                </div>
              </motion.button>
            );
          })}
          
          {/* Fill empty spots in the last row to maintain grid sizing */}
          {row.length < 4 && Array.from({ length: 4 - row.length }).map((_, i) => (
             <div key={`empty-${i}`} className="hidden flex-1 lg:block" />
          ))}
        </div>
      ))}
    </div>
  );
}
