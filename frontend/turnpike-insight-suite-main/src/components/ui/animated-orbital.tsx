import { Award, FileText, Mail, PieChart, Rocket, Target } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

export function AnimatedOrbital() {
  return (
    <div className="relative mx-auto my-16 flex h-[350px] w-[350px] items-center justify-center md:h-[450px] md:w-[450px] lg:h-[550px] lg:w-[550px]">
      {/* Dashed outer rings */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/40"></div>
      <div className="absolute inset-10 rounded-full border border-sky-400/20"></div>

      {/* Center Circle with Gradient and Image */}
      <div className="relative z-10 flex h-[220px] w-[220px] items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl ring-4 ring-white/20 md:h-[300px] md:w-[300px] lg:h-[380px] lg:w-[380px]">
        <img
          src="/team_portrait.png"
          alt="Team"
          className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
        />
      </div>

      {/* Orbiting Container */}
      <div className="absolute inset-0 animate-spin [animation-duration:25s] [animation-timing-function:linear]">
        {/* Icons placed absolutely around the circle */}
        <OrbitIcon
          icon={PieChart}
          className="-top-6 left-1/2 -translate-x-1/2 border-emerald-500 text-emerald-500"
        />
        <OrbitIcon
          icon={Rocket}
          className="right-[8%] top-[12%] translate-x-1/2 border-blue-500 text-blue-500"
        />
        <OrbitIcon
          icon={Mail}
          className="-right-4 top-1/2 -translate-y-1/2 border-sky-500 text-sky-500"
        />
        <OrbitIcon
          icon={FileText}
          className="bottom-[8%] right-[15%] translate-x-1/2 border-blue-400 text-blue-400"
        />
        <OrbitIcon
          icon={Target}
          className="bottom-[15%] left-[8%] -translate-x-1/2 border-sky-600 text-sky-600"
        />
      </div>

      {/* Badge Floating */}
      <div className="absolute -bottom-4 -left-8 z-20 flex animate-bounce flex-col items-center justify-center rounded-3xl bg-white p-5 shadow-2xl [animation-duration:4s]">
        <Award className="size-10 text-emerald-500" />
        <span className="mt-2 text-center text-sm font-extrabold leading-tight text-slate-800">
          Best Agency
          <br />
          Awards
        </span>
      </div>
    </div>
  );
}

function OrbitIcon({ icon: Icon, className }: { icon: any; className?: string }) {
  return (
    <div
      className={cn(
        "absolute flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-white transition-transform hover:scale-110",
        className,
      )}
    >
      <div className="animate-spin [animation-direction:reverse] [animation-duration:25s] [animation-timing-function:linear]">
        <Icon className="size-6" />
      </div>
    </div>
  );
}
