import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/contexts/PlanContext";
import UpgradeDialog from "@/components/billing/UpgradeDialog";
import { BackButton } from "@/components/ui/back-button";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { plan } = usePlan();
  const [open, setOpen] = useState(false);
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-40 flex h-14 items-center gap-2 sm:gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 sm:px-4">
            <SidebarTrigger className="h-7 w-7" />
            <BackButton />
            <div className="flex-1" />
            <div className="flex items-center gap-2 sm:gap-3">
              {plan === 'free' && (
                <Button size="sm" onClick={() => setOpen(true)} className="text-xs sm:text-sm">Upgrade</Button>
              )}
              {plan === 'premium' && (
                <Badge variant="default" className="text-xs sm:text-sm">Premium</Badge>
              )}
              <ProfileDropdown />
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
      <UpgradeDialog open={open} onOpenChange={setOpen} />
    </SidebarProvider>
  );
}