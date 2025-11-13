import React from 'react'
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar";
import { NuqsAdapter } from 'nuqs/adapters/react';
function layout({children}:{children:React.ReactNode}) {
  return (
    <NuqsAdapter>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </NuqsAdapter>
  );
}

export default layout