"use client";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <Navbar />
        <SidebarProvider>
          <AppSidebar className="top-14 h-[calc(100vh-64px)]" />
          <main>
            <SidebarTrigger className="sticky top-10" />
            {children}
          </main>
        </SidebarProvider>
      </Provider>
    </ThemeProvider>
  );
}
