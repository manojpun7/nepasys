"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import CartLoader from "@/lib/cartLoader";

import { SidebarTrigger } from "@/components/ui/sidebar"; // use your correct path if different

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <CartLoader />
        <Navbar />

        <SidebarProvider>

          {/* Sidebar remains normal ✅ */}
          <AppSidebar className="top-14 h-[calc(100vh-64px)]" />
            <SidebarTrigger  />

            <main className="w-full">{children}</main>

        </SidebarProvider>

      </Provider>
    </ThemeProvider>
  );
}
