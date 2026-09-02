import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, Moon, Sun, X, Boxes } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, useMemo } from "react";
import { TurnpikeLogo } from "@/components/site/turnpike-logo";
import { usePrefs } from "@/hooks/use-prefs";
import { useSession, useUpdateProfile } from "@/hooks/use-auth";
import { useServices, useIndustries } from "@/hooks/use-api";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MEGA_MENUS } from "./mega-menu-content";
const SERVICES = [
  "Applications",
  "Artificial & Augmented Intelligence",
  "Business Process",
  "Business Solutions",
  "Cloud",
  "Consulting",
  "Cybersecurity",
  "Data & Analytics",
  "Design & Experience",
  "Digital Marketing & Interaction",
  "Engineering",
  "Infrastructure",
  "Sustainability",
  "Talent Cloud"
];

const INDUSTRIES = [
  "Aerospace & Defense",
  "Automotive",
  "Banking",
  "Consumer Electronics",
  "Consumer Packaged Goods",
  "Education",
  "Engineering Construction & Operations",
  "Healthcare",
  "Industrial & Process Manufacturing",
  "Insurance",
  "Life Sciences & Pharma",
  "Logistics & Cargo",
  "Media & Entertainment",
  "Medical Devices",
  "Natural Resources",
  "Oil & Gas",
  "Professional Services",
  "Public Sector",
  "Retail",
  "Telecommunications",
  "Travel & Transport",
  "Utilities"
];

const DIGITAL_CONTENT = [
  "Digital Content Migration",
  "Digital Content Capture",
  "Managed Services"
];

const TRAINING = [
  "Show Me All Available Training",
  "Become an instructor"
];

const CONTACT_US = [
  "Offices",
  "Support",
  "Sales Inquiries"
];
import { MegaMenuDropdown } from "./mega-menu-dropdown";

export function SiteHeader({ revealOnScroll = false }: { revealOnScroll?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { dark, setPref } = usePrefs();
  const { isAuthenticated } = useSession();
  const updateProfile = useUpdateProfile();

  const { data: servicesData } = useServices({ limit: 1000 });
  const dynamicServicesMenu = useMemo(() => {
    if (!servicesData) return MEGA_MENUS.services;

    const categoriesMap = new Map<string, any[]>();
    const staticItems = MEGA_MENUS.services.categories.flatMap(c => c.items);

    servicesData.forEach(service => {
      const parent = service.parent_category || "OTHER";
      // Exclude DIGITAL_CONTENT_SERVICES from the main Services dropdown
      if (parent.toUpperCase() === "DIGITAL_CONTENT_SERVICES") return;

      if (!categoriesMap.has(parent)) categoriesMap.set(parent, []);

      const existingItem = staticItems.find(i => i.href === `/services/${service.slug}`);
      const icon = existingItem ? existingItem.icon : Boxes;

      categoriesMap.get(parent)!.push({
        title: service.title,
        description: service.short_description || "Explore this service",
        icon: icon,
        href: `/services/${service.slug}`
      });
    });

    return {
      ...MEGA_MENUS.services,
      categories: Array.from(categoriesMap.entries()).map(([name, items]) => ({
        name: name.toUpperCase(),
        items: items.sort((a, b) => a.title.localeCompare(b.title))
      })).sort((a, b) => a.name.localeCompare(b.name))
    };
  }, [servicesData]);

  const dynamicDigitalContentMenu = useMemo(() => {
    if (!servicesData) return MEGA_MENUS.digitalContent;

    const categoriesMap = new Map<string, any[]>();
    const staticItems = MEGA_MENUS.digitalContent.categories.flatMap(c => c.items);

    servicesData.forEach(service => {
      const parent = service.parent_category || "OTHER";
      // Only include DIGITAL_CONTENT_SERVICES in this dropdown
      if (parent.toUpperCase() !== "DIGITAL_CONTENT_SERVICES") return;

      if (!categoriesMap.has(parent)) categoriesMap.set(parent, []);

      const existingItem = staticItems.find(i => i.href === `/services/${service.slug}`);
      const icon = existingItem ? existingItem.icon : Boxes;

      categoriesMap.get(parent)!.push({
        title: service.title,
        description: service.short_description || "Explore this service",
        icon: icon,
        href: `/services/${service.slug}`
      });
    });

    return {
      ...MEGA_MENUS.digitalContent,
      categories: Array.from(categoriesMap.entries()).map(([name, items]) => ({
        name: name === "DIGITAL_CONTENT_SERVICES" ? "DIGITAL CONTENT SOLUTIONS" : name.toUpperCase(),
        items: items.sort((a, b) => a.title.localeCompare(b.title))
      })).sort((a, b) => a.name.localeCompare(b.name))
    };
  }, [servicesData]);

  const { data: industriesData } = useIndustries({ limit: 1000 });
  const dynamicIndustriesMenu = useMemo(() => {
    if (!industriesData) return MEGA_MENUS.industries;

    const categoriesMap = new Map<string, any[]>();
    const staticItems = MEGA_MENUS.industries.categories.flatMap(c => c.items);

    industriesData.forEach(industry => {
      const parent = industry.parent_category || "OTHER";
      if (!categoriesMap.has(parent)) categoriesMap.set(parent, []);

      const existingItem = staticItems.find(i => i.href === `/industries/${industry.slug}`);
      const icon = existingItem ? existingItem.icon : Boxes;

      categoriesMap.get(parent)!.push({
        title: industry.title,
        description: industry.short_description || "Explore this industry",
        icon: icon,
        href: `/industries/${industry.slug}`
      });
    });

    return {
      ...MEGA_MENUS.industries,
      categories: Array.from(categoriesMap.entries()).map(([name, items]) => ({
        name: name.toUpperCase(),
        items: items.sort((a, b) => a.title.localeCompare(b.title))
      })).sort((a, b) => a.name.localeCompare(b.name))
    };
  }, [industriesData]);

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  const hidden = revealOnScroll && !scrolled;
  const isActive = (to: string) => pathname === to;

  const mobileLinkClass = (to: string) => 
    `flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors ${
      isActive(to)
        ? "bg-primary/10 font-semibold text-primary"
        : "text-muted-foreground hover:bg-white/70 hover:text-foreground"
    }`;

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -140 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={`sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-500 ${scrolled ? "shadow-sm" : ""}`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex shrink-0 items-center pl-1">
          <TurnpikeLogo dark={false} />
        </Link>

        <NavigationMenu className="hidden lg:flex flex-1 justify-center px-2">
          <NavigationMenuList className="gap-1 justify-center flex-nowrap">
            <NavigationMenuItem>
              <Link
                to="/"
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  isActive("/") ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive("/") ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))]"
                  />
                ) : null}
                <span className="relative">Home</span>
              </Link>
            </NavigationMenuItem>

            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${isActive("/services") ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground data-[state=open]:text-foreground"}`}
              >
                {isActive("/services") ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))]"
                  />
                ) : null}
                <span className="relative">Services</span>
              </NavigationMenuTrigger>
              <MegaMenuDropdown data={dynamicServicesMenu} />
            </NavigationMenuItem>

            {/* Industries Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                <span className="relative">Industries</span>
              </NavigationMenuTrigger>
              <MegaMenuDropdown data={dynamicIndustriesMenu} />
            </NavigationMenuItem>

            {/* Digital Content Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                <span className="relative">Digital Content Services</span>
              </NavigationMenuTrigger>
              <MegaMenuDropdown data={dynamicDigitalContentMenu} />
            </NavigationMenuItem>

            {/* Software Support Link */}
            <NavigationMenuItem>
              <Link
                to="/software-support"
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  isActive("/software-support") ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive("/software-support") ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))]"
                  />
                ) : null}
                <span className="relative">Software Support</span>
              </Link>
            </NavigationMenuItem>

            {/* Training & Courses Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${isActive("/training") ? "text-primary" : "text-muted-foreground hover:text-foreground data-[state=open]:text-foreground"}`}
              >
                <span className="relative">Training & Courses</span>
              </NavigationMenuTrigger>
              <MegaMenuDropdown data={MEGA_MENUS.training} />
            </NavigationMenuItem>

            {/* Blogs Link */}
            <NavigationMenuItem>
              <Link
                to="/blog"
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  isActive("/blog") ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive("/blog") ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))]"
                  />
                ) : null}
                <span className="relative">Blogs</span>
              </Link>
            </NavigationMenuItem>

            {/* Contact Us Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${isActive("/contact") ? "text-primary" : "text-muted-foreground hover:text-foreground data-[state=open]:text-foreground"}`}
              >
                <span className="relative">Contact Us</span>
              </NavigationMenuTrigger>
              <MegaMenuDropdown data={MEGA_MENUS.contactUs} />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const newDark = !dark;
              setPref("dark", newDark);
              if (isAuthenticated) {
                updateProfile.mutate({ theme: newDark ? "dark" : "light" });
              }
            }}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-border/60 bg-background/60 text-foreground transition-colors hover:text-primary mr-1 sm:mr-2"
          >
            {dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </button>
          
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-border/60 bg-background/60 text-foreground transition-colors hover:text-primary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-2 top-full mt-2 flex flex-col gap-2 rounded-3xl border border-border/60 bg-background/80 p-3 shadow-xl backdrop-blur-xl lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <Link to="/" onClick={() => setOpen(false)} className={mobileLinkClass("/")}>
              Home <ArrowRight className="size-4 opacity-60" />
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="services" className="border-b-0">
                <AccordionTrigger className={`px-4 py-3 text-sm hover:no-underline rounded-2xl transition-colors ${isActive("/services") ? "text-primary" : "text-muted-foreground hover:bg-white/70 hover:text-foreground"}`}>
                  Services
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-4 pr-2">
                  <div className="flex flex-col gap-1 py-2">
                    {dynamicServicesMenu.categories.flatMap(c => c.items).map(item => (
                      <Link key={item.title} to={item.href} onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-primary">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="industries" className="border-b-0">
                <AccordionTrigger className="px-4 py-3 text-sm hover:no-underline rounded-2xl transition-colors text-muted-foreground hover:bg-white/70 hover:text-foreground">
                  Industries
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-4 pr-2">
                  <div className="flex flex-col gap-1 py-2">
                    {dynamicIndustriesMenu.categories.flatMap(c => c.items).map(item => (
                      <Link key={item.title} to={item.href} onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-primary">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="digital" className="border-b-0">
                <AccordionTrigger className="px-4 py-3 text-sm hover:no-underline rounded-2xl transition-colors text-muted-foreground hover:bg-white/70 hover:text-foreground">
                  Digital Content Services
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-4 pr-2">
                  <div className="flex flex-col gap-1 py-2">
                    {dynamicDigitalContentMenu.categories.flatMap(c => c.items).map(item => (
                      <Link key={item.title} to={item.href} onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-primary">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <Link to="/services" onClick={() => setOpen(false)} className={mobileLinkClass("/software-support")}>
                Software Support <ArrowRight className="size-4 opacity-60" />
              </Link>

              <AccordionItem value="academy" className="border-b-0">
                <AccordionTrigger className={`px-4 py-3 text-sm hover:no-underline rounded-2xl transition-colors ${isActive("/training") ? "text-primary" : "text-muted-foreground hover:bg-white/70 hover:text-foreground"}`}>
                  Training & Courses
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-4 pr-2">
                  <div className="flex flex-col gap-1 py-2">
                    {TRAINING.map(item => (
                      <Link key={item} to="/training" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-primary">
                        {item}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact" className="border-b-0">
                <AccordionTrigger className={`px-4 py-3 text-sm hover:no-underline rounded-2xl transition-colors ${isActive("/contact") ? "text-primary" : "text-muted-foreground hover:bg-white/70 hover:text-foreground"}`}>
                  Contact Us
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-4 pr-2">
                  <div className="flex flex-col gap-1 py-2">
                    {CONTACT_US.map(item => (
                      <Link key={item} to="/contact" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-primary">
                        {item}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>

            <Link to="/blog" onClick={() => setOpen(false)} className={mobileLinkClass("/blog")}>
              Blogs <ArrowRight className="size-4 opacity-60" />
            </Link>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
