import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Globe, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Luminary Studio — where ideas become reality.",
};

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Performance-first architecture built with Next.js 14 App Router and optimized for core web vitals.",
  },
  {
    icon: Globe,
    title: "Global Ready",
    desc: "Built with accessibility and internationalization in mind from the very first line of code.",
  },
  {
    icon: Layers,
    title: "Scalable Design",
    desc: "Component-driven systems that grow with your product, from prototype to production.",
  },
];

export default function HomePage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              #0f0e0d,
              #0f0e0d 1px,
              transparent 1px,
              transparent 60px
            ), repeating-linear-gradient(
              90deg,
              #0f0e0d,
              #0f0e0d 1px,
              transparent 1px,
              transparent 60px
            )`,
          }}
        />
        {/* Amber glow */}
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-amber/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-amber/5 blur-[80px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-500 mb-8">
              <span className="w-6 h-px bg-amber" />
              Est. 2024 · Creative Studio
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-ink-900 leading-[0.92] tracking-tight mb-8">
              Ideas
              <br />
              <span className="italic text-amber">shaped</span>
              <br />
              into reality.
            </h1>
            <p className="text-ink-500 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              We craft digital products that challenge conventions and leave lasting impressions. Design meets engineering at Luminary.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-ink-900 text-cream font-medium rounded-md hover:bg-amber hover:text-ink-900 transition-all duration-200 group"
              >
                Discover Our Story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-stone text-ink-700 font-medium rounded-md hover:border-amber hover:text-amber transition-all duration-200"
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-ink-900 text-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-ink-400">
              What We Do
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-cream">
              Craft at every layer.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group p-7 rounded-xl border border-ink-800 hover:border-amber/40 transition-all duration-300 bg-ink-800/30 hover:bg-ink-800/60"
              >
                <div className="w-10 h-10 rounded-md bg-amber/10 flex items-center justify-center mb-5 group-hover:bg-amber/20 transition-colors">
                  <Icon size={18} className="text-amber" />
                </div>
                <h3 className="font-display font-bold text-xl text-cream mb-3">{title}</h3>
                <p className="text-ink-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-amber p-10 md:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-ink-900/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative max-w-xl">
              <h2 className="font-display text-3xl md:text-5xl font-black text-ink-900 mb-4 leading-tight">
                Ready to build something extraordinary?
              </h2>
              <p className="text-ink-700 mb-8 leading-relaxed">
                Let's have a conversation about your next project.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-ink-900 text-cream font-medium rounded-md hover:bg-ink-700 transition-all duration-200 group"
              >
                Start a Conversation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
