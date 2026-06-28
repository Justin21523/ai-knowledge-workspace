import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface DashboardShellProps {
  children: React.ReactNode;
  pageTitle: string;
}

export function DashboardShell({ children, pageTitle }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-background md:flex">
        <Sidebar />
      </aside>
      
      <div className="flex w-full flex-col md:pl-64">
        <Topbar title={pageTitle} />
        <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
