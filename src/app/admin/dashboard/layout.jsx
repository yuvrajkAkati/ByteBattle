"use client";

import { GridBackground } from "@/app/components/ui/grid-background";
import { Grid } from "lucide-react";

const { default: Sidebar } = require("@/app/components/admin/Sidebar");
const { default: Topbar } = require("@/app/components/admin/Topbar");


export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen text-white">
      <GridBackground />
      {/* Sidebar */}
      <Sidebar />

      {/* Topbar + Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <main className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
