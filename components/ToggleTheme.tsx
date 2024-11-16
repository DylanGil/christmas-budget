"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export const ToggleTheme = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="m-2"
    >
      <LucideSun className="h-6 w-[1.3rem] text-gray-400 dark:hidden" />
      <LucideMoon className="hidden size-5 text-gray-400 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
