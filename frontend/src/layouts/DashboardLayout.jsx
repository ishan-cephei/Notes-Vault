import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import AppSidebar from "../components/ui/app-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4 overflow-auto">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
