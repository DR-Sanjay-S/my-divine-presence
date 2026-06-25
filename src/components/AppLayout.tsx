import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Building2,
  Target,
  Mic,
  CalendarDays,
  StickyNote,
  BookOpen,
  Search,
  Sparkles,
  Settings as SettingsIcon,
} from "lucide-react";
import profilePhoto from "@/assets/sanjay-profile.jpg";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "People", url: "/people", icon: Users },
  { title: "Organizations", url: "/organizations", icon: Building2 },
  { title: "Opportunities", url: "/opportunities", icon: Target },
  { title: "Podcasts", url: "/podcasts", icon: Mic },
  { title: "Events", url: "/events", icon: CalendarDays },
  { title: "Notes", url: "/notes", icon: StickyNote },
  { title: "Journal", url: "/journal", icon: BookOpen },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
];

function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="relative w-9 h-9 shrink-0 rounded-lg overflow-hidden ring-1 ring-primary/40">
            <img src={profilePhoto} alt="Sanjay" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-semibold text-sidebar-foreground truncate">
                My Personal Book
              </div>
              <div className="text-[10px] text-muted-foreground font-mono tracking-wider">
                FOUNDER OS
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && (
          <div className="px-2 py-2 text-[10px] text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            <span className="font-mono">AI features coming soon</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border px-3 sticky top-0 bg-background/80 backdrop-blur-xl z-30">
            <SidebarTrigger />
            <div className="ml-3 text-xs text-muted-foreground font-mono tracking-wider">
              MY PERSONAL BOOK
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
