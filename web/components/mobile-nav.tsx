"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SidebarNav } from "@/components/sidebar-nav";
import { Button } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/lib/i18n";

export function MobileNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="h-12 w-12 rounded-2xl border-white/60 bg-white/90 p-0 shadow-sm backdrop-blur-sm lg:hidden"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[120] bg-slate-950/70 p-4 backdrop-blur-sm lg:hidden">
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
