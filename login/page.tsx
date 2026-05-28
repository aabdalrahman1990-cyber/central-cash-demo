import Link from "next/link";
import { Building2, Fingerprint, ShieldCheck } from "lucide-react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function LoginPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : "ar";
  const dict = getDictionary(safeLocale);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto grid min-h-[88vh] max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="glass-panel relative overflow-hidden rounded-[32px] border border-white/10 p-8 shadow-panel lg:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,47,73,0.95),rgba(15,118,110,0.88),rgba(234,179,8,0.36))]" />
          <div className="relative z-10 flex h-full flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/12 p-3">
                  <Building2 className="size-7" />
                </div>
                <div>
                  <p className="text-sm text-white/70">{dict.product.kicker}</p>
                  <h1 className="text-2xl font-semibold lg:text-4xl">{dict.product.title}</h1>
                </div>
              </div>
              <ThemeToggle />
            </div>

            <div className="max-w-2xl space-y-6">
              <p className="text-lg leading-8 text-white/85 lg:text-xl">{dict.product.description}</p>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { icon: ShieldCheck, title: dict.login.heroCards[0].title, value: dict.login.heroCards[0].value },
                  { icon: Fingerprint, title: dict.login.heroCards[1].title, value: dict.login.heroCards[1].value },
                  { icon: Building2, title: dict.login.heroCards[2].title, value: dict.login.heroCards[2].value }
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/15 bg-white/10 p-5">
                    <item.icon className="mb-3 size-6 text-amber-300" />
                    <p className="text-sm text-white/70">{item.title}</p>
                    <p className="mt-2 text-xl font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Card className="glass-panel flex items-center rounded-[32px] border-white/30 shadow-panel">
          <CardContent className="w-full p-8 lg:p-10">
            <CardHeader className="px-0 pb-8">
              <CardTitle className="text-3xl font-semibold text-foreground">{dict.login.title}</CardTitle>
              <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-300">{dict.login.subtitle}</p>
            </CardHeader>

            <div className="space-y-5">
              <Input label={dict.login.username} placeholder="cbi.manager@cbi.iq" />
              <Input label={dict.login.password} placeholder="**********" type="password" />
              <Input label={dict.login.mfa} placeholder={dict.login.mfaPlaceholder} />
              <div className="grid gap-4 md:grid-cols-2">
                <Button asChild className="h-12 text-base">
                  <Link href={`/${safeLocale}/portal`}>{dict.login.signIn}</Link>
                </Button>
                <Button variant="outline" className="h-12 text-base">
                  {dict.login.requestAccess}
                </Button>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-dashed border-slate-300/80 bg-slate-100/80 p-5 text-sm leading-7 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
              {dict.login.securityNote}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
