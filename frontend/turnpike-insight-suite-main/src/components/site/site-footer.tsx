import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT_PHONE } from "@/content/site-content";
import { TurnpikeLogo } from "@/components/site/turnpike-logo";

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-[#0b0c10] text-slate-300 border-t border-white/10 pt-16 pb-8 px-5 sm:px-8 font-sans">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Top Section */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr] pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div>
            <div className="mb-6">
              <TurnpikeLogo dark={true} />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm text-slate-400">
              We design, build, and scale enterprise solutions that move businesses forward. Turnpike Analyst partners with ambitious teams to drive meaningful digital transformation through scalable, high-impact technology.
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

        {/* Massive Logo Footer Banner */}
        <div className="py-24 w-full flex justify-center items-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center scale-150 sm:scale-[2] md:scale-[2.5] lg:scale-[3] transform-gpu my-16"
          >
            <TurnpikeLogo />
          </motion.div>
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

