import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const PHONE_DISPLAY = "+228 93 51 00 74";
export const PHONE_HREF = "tel:+22893510074";
export const WHATSAPP_LABEL = "+228 93 51 00 74";
export const WHATSAPP_HREF =
  "https://wa.me/22893510074?text=Bonjour%20Stage%20K%C3%A9k%C3%A9li%2C%20je%20souhaite%20des%20informations%20pour%20l%27inscription%20de%20mon%20enfant.";

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return <MessageSquare className={className} />;
}

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqSection({ items, title }: { items: FaqItem[]; title?: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <Reveal textCenter>
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
          Questions Fréquentes
        </div>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          {title || <>Toutes vos questions sur Stage Kékéli</>}
        </h2>
      </Reveal>

      <div className="mt-10">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {items.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="rounded-2xl border border-border bg-card px-6 py-1 transition hover:border-[color:var(--sun-deep)]/40"
            >
              <AccordionTrigger className="text-left text-base font-bold hover:no-underline py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function CallbackCta({
  title,
  intro,
}: {
  title?: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <section className="border-t border-border bg-gradient-to-b from-card to-background">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <Reveal textCenter>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {title || <>Une question ? Parlons du suivi de votre enfant</>}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {intro || <>Appelez-nous au +228 93 51 00 74 ou écrivez-nous à stagekekeli@gmail.com pour organiser les séances du samedi.</>}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-slate-950 hover:bg-[#128C7E] hover:text-white transition shadow-md"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Écrire sur WhatsApp (+228 93 51 00 74)
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-sm font-bold text-foreground hover:bg-muted transition"
            >
              <Phone className="h-5 w-5" />
              Appeler le +228 93 51 00 74
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <Reveal textCenter>
      {eyebrow && (
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
