import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT_PHONE } from "@/content/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-[#0b0c10] text-slate-300 border-t border-white/10 pt-16 pb-8 px-5 sm:px-8 font-sans">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Top Section */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr] pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="grid size-8 place-items-center rounded-lg bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-sm font-bold text-background">
                T
              </span>
              <span className="text-xl font-bold tracking-tight text-white font-display uppercase">Turnpike Analyst</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm text-slate-400">
              We design, build, and scale enterprise digital products that move businesses forward. Turnpike Analyst partners with ambitious teams to drive meaningful digital transformation through scalable, high-impact technology.
            </p>
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
            </div>
            <p className="text-xs text-slate-500">150+ FIVE-STAR REVIEWS</p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider">General Enquiries</h4>
            <div className="space-y-4 text-sm">
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="size-4 text-primary" /> {CONTACT_PHONE}
              </a>
              <a href="mailto:hello@turnpikeanalyst.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="size-4 text-primary" /> hello@turnpikeanalyst.com
              </a>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider">Global HQ</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" /> 
                <p className="leading-relaxed">
                  128 Technology Drive<br />
                  Suite 400<br />
                  London, UK<br />
                  EC1A 1BB
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div>
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Client Success</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Business Consultancy</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">ECM Migration</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Platform Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Intelligent Automation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/blog" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Insights</Link></li>
              <li><Link to="/training" className="hover:text-white transition-colors">Academy</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider">Industries</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Healthcare</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">E-Commerce & Retail</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Cybersecurity</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Startups & SMBs</Link></li>
            </ul>
          </div>
        </div>

        {/* Massive Outline Text Isometric Extrusion (SVG) */}
        <div className="py-16 w-full overflow-hidden flex justify-center">
          <svg viewBox="0 0 2400 300" className="w-full h-auto max-h-[300px] pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => {
              const isFace = i === 0 || i === 29;
              const offset = 29 - i; // i=29 is the front layer (stays at 0,0), i=0 is the back layer (moves furthest)
              return (
                <motion.text 
                  key={i}
                  initial={{ x: 0, y: 0 }}
                  whileInView={{ x: -offset * 1.5, y: -offset * 2.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  x="50%"
                  y="80%"
                  textAnchor="middle" 
                  fontSize="150" 
                  fontWeight="900" 
                  fontFamily="sans-serif" 
                  fill="none" 
                  stroke={isFace ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth={isFace ? "2" : "0.75"}
                  letterSpacing="10" 
                >
                  TURNPIKE ANALYST
                </motion.text>
              );
            })}
          </svg>
        </div>

        {/* Very Bottom */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-[11px] text-slate-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Turnpike Analyst. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

