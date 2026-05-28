"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SidebarNav } from "@/components/sidebar-nav";
import { Button } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/lib/i18n";

export function MobileNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="h-11 w-11 rounded-2xl p-0 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/65 p-4 backdrop-blur-sm lg:hidden">
          <div className="mx-auto max-w-md">
            <div className="mb-3 flex items-center justify-between rounded-[24px] bg-slate-950 px-4 py-3 text-white shadow-panel">
              <p className="font-semibold">{dict.product.title}</p>
              <Button
                type="button"
                variant="ghost"
                className="h-10 w-10 rounded-2xl p-0 text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <SidebarNav locale={locale} dict={dict} mobile onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
