import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Server, Cloud, Database, Code, Cog, Blocks } from "lucide-react";

export function TechStackExplorer({ stack }: { stack: { category: string; items: string[] }[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "platforms": return <Server className="size-5" />;
      case "cloud": return <Cloud className="size-5" />;
      case "database": return <Database className="size-5" />;
      case "languages": return <Code className="size-5" />;
      case "automation": return <Cog className="size-5" />;
      default: return <Blocks className="size-5" />;
    }
  };

  return (
    <div className="relative mt-16 mb-20 max-w-[1200px] mx-auto z-10 px-4 sm:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:h-[260px]">
        {stack.map((cat, index) => {
          const isHovered = hoveredIndex === index;
          
          return (
            <motion.button
              key={cat.category}
              type="button"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              animate={{
                flex: isHovered ? 3 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative isolate flex min-h-[100px] lg:min-h-full w-full flex-col overflow-hidden rounded-[2rem] border text-left transition-all duration-500 lg:w-auto cursor-default",
                isHovered 
                  ? "border-transparent bg-[linear-gradient(135deg,var(--primary),var(--brand-cyan))] text-white shadow-2xl" 
                  : "border-border/40 bg-card text-card-foreground shadow-[0_8px_30px_-12px_rgba(0,0,0,0.04)] hover:bg-accent/50"
              )}
            >
              <div className={cn(
                "flex h-full w-full p-5 lg:p-6",
                isHovered ? "flex-col justify-center lg:justify-center lg:items-start" : "flex-row items-center justify-start lg:flex-col lg:justify-center lg:items-center gap-3"
              )}>
                
                {/* Header (Icon + Title) */}
                <div className={cn(
                  "flex items-center gap-3 transition-all duration-500",
                  isHovered ? "mb-4 lg:mb-6" : "lg:flex-col lg:gap-3 lg:text-center"
                )}>
                  <span className={cn(
                    "grid shrink-0 place-items-center transition-all duration-500 rounded-xl",
                    isHovered 
                      ? "size-12 text-white bg-white/20 shadow-inner" 
                      : "size-12 text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 group-hover:scale-105 group-hover:-translate-y-1"
                  )}>
                    {getIcon(cat.category)}
                  </span>
                  
                  <span className={cn(
                    "font-bold leading-snug tracking-tight transition-all duration-300",
                    isHovered ? "text-xl text-white whitespace-nowrap" : "text-sm text-foreground break-words text-center"
                  )}>
                    {cat.category}
                  </span>
                </div>
                
                {/* Expanded Content (Grid of Items) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                        {cat.items.map((item) => (
                          <div 
                            key={item} 
                            className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs font-medium text-white shadow-sm hover:bg-white/20 transition-colors cursor-pointer"
                          >
                            <div className="size-1.5 shrink-0 rounded-full bg-[#00f2fe] shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                            <span className="truncate leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
