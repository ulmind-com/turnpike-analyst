import { Code2, ShieldCheck, Zap } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Reveal } from "@/components/site/parallax";
import React from "react";

const ICONS = [Code2, ShieldCheck, Zap];
const IMAGES = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80"  
];

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ x: [0, 150, -100, 0], y: [0, -150, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-brand-cyan/15 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -150, 100, 0], y: [0, 150, -100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]"
      />
    </div>
  );
}

function AnimatedCard({ item, index, imgSrc, Icon }: { item: any, index: number, imgSrc: string, Icon: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Reveal delay={index * 0.1}>
      <div style={{ perspective: 1000 }} className="h-full">
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.15}
          className="relative group/card h-full pt-16 cursor-grab active:cursor-grabbing w-full"
        >
          {/* Image circle overlapping the top with 3D pop */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
            style={{ transform: "translateZ(50px) translateX(-50%)" }}
          >
            <motion.div 
              className="size-32 sm:size-36 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative bg-slate-900"
            >
              <img 
                src={imgSrc}
                alt={item.title}
                className="object-cover w-full h-full opacity-90 group-hover/card:scale-110 transition-transform duration-700" 
              />
            </motion.div>
            {/* Small icon overlapping the bottom of the video circle */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand-cyan text-white p-2.5 rounded-full shadow-lg z-20 group-hover/card:scale-110 transition-transform duration-300">
              <Icon className="w-5 h-5" />
            </div>
          </div>

          <div 
            className="bg-[#0a0a0a] rounded-xl p-8 pt-24 shadow-2xl border border-white/5 hover:border-brand-cyan/30 transition-all duration-300 h-full text-center flex flex-col justify-between"
            style={{ transform: "translateZ(20px)" }}
          >
            <div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover/card:text-brand-cyan transition-colors">
                {item.title}
              </h3>
              <p className="text-amber-500 text-sm font-medium mb-5 tracking-wide">Turnpike Insight</p>
              <p className="text-slate-300 leading-relaxed text-sm italic">
                "{item.body}"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

export function WhyChoose({ items, onCta }: { items: readonly { title: string; body: string }[]; onCta?: () => void }) {
  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center py-16 md:py-24">
      <AnimatedBackground />
      
      <div className="relative z-10 text-center max-w-3xl mb-20 px-4">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-6 uppercase">
          What Makes Us Different
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The constraints are different. Budget is finite. Time to market matters. And the first version needs to be good enough to win customers and bad enough to be affordable to build. Getting this balance right is what we do.
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-3 gap-8 mt-4 w-full max-w-7xl mx-auto px-4">
        {items.map((item, i) => (
          <AnimatedCard 
            key={i} 
            item={item} 
            index={i} 
            imgSrc={IMAGES[i % IMAGES.length]} 
            Icon={ICONS[i % ICONS.length]} 
          />
        ))}
      </div>
    </div>
  );
}
