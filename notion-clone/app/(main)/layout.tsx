"use client";

// now every single route that we creat inside
// of our main application is auth protected!

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";
import { SearchCommand } from "@/components/ui/search-command";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      {" "}
      {/* flex: 1 1 0 -> grow: 1 shrink 1 initial width = 0  */}
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
      <SearchCommand />
    </div>
  );
};

export default MainLayout;
