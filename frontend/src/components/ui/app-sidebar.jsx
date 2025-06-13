import { NotebookPen, Files, FilePlus, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "./sidebar";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "All Notes",
    icon: Files,
  },
  {
    title: "Create Note",
    icon: FilePlus,
  },
];

export default function AppSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Sidebar className="bg-[#fcfcfc] text-[#1e1e1e] w-64 flex flex-col border-r border-[#e5e5e5]">
      <SidebarHeader className="px-4 py-4 border-b border-[#e5e5e5]">
        <div className="flex items-center gap-2 text-[24px] font-bold text-[#FFB5A7]">
          <NotebookPen className="h-[24px] w-[24px] text-[#FFB5A7]" />
          <span>Notes Vault</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 pt-4 pb-2 text-[14px] font-medium text-[#8a8a8a]">
            My Notes
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-3 px-4 py-2 text-[16px] text-[#0d0d0d] rounded-md hover:bg-[#f7f7f7] transition-colors cursor-pointer">
                      <div className="tex">
                        <item.icon className="h-[5] w-[5] stroke-[1.1]" />
                      </div>
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t border-[#e5e5e5]">
        <div
          className="flex items-center gap-3 text-[16px] text-[#e63946] cursor-pointer hover:text-red-700 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-[5] w-[5]" />
          <span>Logout</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
