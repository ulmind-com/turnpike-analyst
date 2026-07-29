import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Server, Cloud, Database, Code, Cog, Blocks } from "lucide-react";

export function TechStackExplorer({ stack }: { stack: { category: string; items: string[] }[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

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
    <div className="relative mt-16 mb-20 max-w-[1000px] mx-auto z-10 px-4 sm:px-6">
      
      {/* Decorative dots top-left */}
      <div className="absolute -top-8 -left-2 grid grid-cols-4 gap-2 opacity-60 z-0 hidden lg:grid">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="size-2 rounded-full bg-brand-cyan" />
        ))}
      </div>



      <div className="flex flex-col lg:flex-row gap-6 relative z-10 items-start">
        
        {/* Left Sidebar Menu */}
        <div className="flex flex-col bg-white rounded-2xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden w-full lg:w-[280px] shrink-0">
          
          {/* Header of sidebar (like "Sections" in screenshot) */}
          <div className="flex border-b border-slate-100">
             <div className="flex-1 text-center py-4 text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 border-primary">
               Ecosystem
             </div>
             <div className="flex-1 text-center py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
               Connectors
             </div>
          </div>
          
          <div className="flex flex-col py-2">
            {stack.map((cat, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 text-sm font-semibold transition-all duration-300 border-l-4 border-b border-b-slate-50 last:border-b-0",
                    isActive 
                      ? "border-l-primary bg-primary/[0.03] text-primary" 
                      : "border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <span className={cn("transition-colors", isActive ? "text-primary" : "text-slate-400")}>
                    {getIcon(cat.category)}
                  </span>
                  {cat.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Canvas / Mockup Area */}
        <div className="flex-1 w-full bg-[linear-gradient(135deg,var(--primary),var(--brand-cyan))] rounded-[2rem] p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[450px] relative border border-white/20">
          
          {/* Mockup Top Bar */}
          <div className="absolute top-4 left-4 right-4 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center px-5 gap-3">
             <div className="w-16 h-2.5 bg-white/40 rounded-full" />
             <div className="w-8 h-2.5 bg-white/40 rounded-full" />
             <div className="flex-1" />
             <div className="w-24 h-2.5 bg-white/40 rounded-full hidden sm:block" />
          </div>

          <div className="mt-16 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1, 
                    transition: { staggerChildren: 0.05, delayChildren: 0.05 } 
                  },
                  exit: { opacity: 0, transition: { duration: 0.15 } }
                }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {stack[activeIdx]?.items.map((item) => (
                  <motion.div
                    key={item}
                    variants={{
                      hidden: { opacity: 0, scale: 0.85, y: 15 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } },
                    }}
                    className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl aspect-square text-center transition-transform hover:-translate-y-1.5 hover:bg-white/20 duration-300 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] group"
                  >
                    <span className="grid size-12 place-items-center mb-3 bg-white/20 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      {getIcon(stack[activeIdx].category)}
                    </span>
                    <span className="font-display font-medium text-white text-sm sm:text-sm leading-snug">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
