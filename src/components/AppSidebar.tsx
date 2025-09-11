import { NavLink, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Search, 
  MessageSquare, 
  Settings, 
  User, 
  BarChart3,
  BookOpen,
  Video
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const mentorItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "My Sessions", url: "/sessions", icon: Calendar },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

const menteeItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Find Mentors", url: "/mentors", icon: Search },
  { title: "My Sessions", url: "/sessions", icon: Calendar },
  { title: "Learning", url: "/learning", icon: BookOpen },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  // For now, we'll assume mentee. In a real app, you'd get this from user profile
  const items = menteeItems;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-card">
        <div className="p-4">
          <div className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
            {state === "collapsed" ? "MC" : "MentorConnect"}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}