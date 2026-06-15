import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface DashboardShellProps {
  children: React.ReactNode;
  pageTitle: string;
}

/**
 * DashboardShell wraps the main content area with the Sidebar and Topbar.
 * It handles the responsive layout: Sidebar is fixed on desktop, hidden on mobile.
 */
export function DashboardShell({ children, pageTitle }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Desktop Sidebar: Hidden on mobile (default), fixed width on md and up */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-background md:flex">
        <Sidebar />
      </aside>
      
      {/* Main Content Area */}
      <div className="flex flex-col md:pl-64 w-full">
        <Topbar title={pageTitle} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}