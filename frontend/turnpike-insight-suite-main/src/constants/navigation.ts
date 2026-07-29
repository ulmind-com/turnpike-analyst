import {
  Activity,
  BookOpen,
  Boxes,
  CalendarClock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MonitorCheck,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { UserRole } from "@/types/api";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  /** Roles allowed to see the item. Undefined = every signed-in role. */
  roles?: UserRole[];
  /** True when the backend has no endpoint for this surface yet. */
  unavailable?: boolean;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { label: "System Health", to: "/system-health", icon: MonitorCheck },
    ],
  },
  {
    label: "Revenue",
    items: [
      { label: "Leads", to: "/leads", icon: Workflow, roles: ["ADMIN", "CONSULTANT"] },
      { label: "Book Calls", to: "/book-calls", icon: CalendarClock, roles: ["ADMIN", "CONSULTANT"] },
      {
        label: "Demo Requests",
        to: "/demo-requests",
        icon: Sparkles,
        roles: ["ADMIN", "CONSULTANT"],
      },
      {
        label: "Enterprise Requirements",
        to: "/enterprise-requirements",
        icon: ShieldCheck,
        roles: ["ADMIN", "CONSULTANT"],
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      { label: "Services", to: "/services", icon: Boxes },
      { label: "Products", to: "/products", icon: Activity },
      { label: "Training Courses", to: "/courses", icon: GraduationCap },
      {
        label: "Instructor Applications",
        to: "/instructor-applications",
        icon: Users,
        roles: ["ADMIN", "CONSULTANT", "INSTRUCTOR"],
      },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Blogs", to: "/blogs", icon: FileText },
      { label: "Newsletter", to: "/newsletter", icon: Mail, roles: ["ADMIN", "CONSULTANT"] },
      { label: "CMS Library", to: "/cms", icon: BookOpen, unavailable: true },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "User Management", to: "/users", icon: UserCog, roles: ["ADMIN"], unavailable: true },
      { label: "Activity Logs", to: "/activity", icon: Activity, roles: ["ADMIN"], unavailable: true },
      { label: "Profile", to: "/profile", icon: Users },
      { label: "Settings", to: "/settings", icon: Settings },
    ],
  },
];

export const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/system-health": "System Health",
  "/leads": "Lead Management",
  "/book-calls": "Book Calls",
  "/demo-requests": "Product Demo Requests",
  "/enterprise-requirements": "Enterprise Requirements",
  "/services": "Services",
  "/products": "Products",
  "/courses": "Training Courses",
  "/instructor-applications": "Instructor Applications",
  "/blogs": "Blogs",
  "/newsletter": "Newsletter Subscribers",
  "/cms": "CMS Library",
  "/users": "User Management",
  "/activity": "Activity Logs",
  "/profile": "Profile",
  "/settings": "Settings",
  "/notifications": "Notifications",
};
