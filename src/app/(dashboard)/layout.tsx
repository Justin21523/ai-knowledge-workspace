import { DashboardShell } from "@/components/layout/dashboard-shell";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout for all routes inside the (dashboard) group.
 * It wraps every page with the DashboardShell.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // We pass a default title, but individual pages can override the UI inside the main area.
  // For a more dynamic title, we could use React Context or pass props, 
  // but for simplicity, we'll let pages define their own headers or we can enhance this later.
  return (
    <DashboardShell pageTitle="AI Knowledge Workspace">
      {children}
    </DashboardShell>
  );
}