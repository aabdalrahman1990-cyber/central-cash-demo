"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const toggle = () => {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    window.localStorage.setItem("cbi-theme", nextDark ? "dark" : "light");
  };

  return (
    <Button onClick={toggle} variant="ghost" className="rounded-2xl border border-white/15 bg-white/10 text-white hover:bg-white/20">
      <SunMedium className="size-4 dark:hidden" />
      <MoonStar className="hidden size-4 dark:block" />
    </Button>
  );
}
