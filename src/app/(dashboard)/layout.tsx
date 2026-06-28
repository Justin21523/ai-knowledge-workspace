import { DashboardShell } from "@/components/layout/dashboard-shell";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardShell pageTitle="AI Knowledge Workspace">
      {children}
    </DashboardShell>
  );
}
