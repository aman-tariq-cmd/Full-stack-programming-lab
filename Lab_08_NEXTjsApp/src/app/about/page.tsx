import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the people and philosophy behind Luminary Studio.",
};

const values = [
  {
    number: "01",
    title: "Craft First",
    desc: "We treat every pixel, every line of code, every user interaction as an opportunity to exceed expectations.",
  },
  {
    number: "02",
    title: "Radical Clarity",
    desc: "Complexity is easy. Simplicity is hard. We work until the right answer feels inevitable.",
  },
  {
    number: "03",
    title: "Open Collaboration",
    desc: "The best work happens when clients become partners. We bring you into our process from day one.",
  },
  {
    number: "04",
    title: "Long-Term Thinking",
    desc: "We build for durability — systems that evolve gracefully rather than buckle under growth.",
  },
];

const team = [
  { name: "Ava Chen", role: "Founder & Creative Director", initials: "AC" },
  { name: "Marcus Reid", role: "Lead Engineer", initials: "MR" },
  { name: "Sofia Lund", role: "UX Researcher", initials: "SL" },
];

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 bg-ink-900" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
        {/* Decorative diagonal */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber/5 clip-diagonal pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-400 mb-8">
            <span className="w-6 h-px bg-amber" />
            Our Story
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black text-cream leading-tight tracking-tight max-w-2xl">
            We obsess over{" "}
            <span className="italic text-amber">the details</span>{" "}
            so you don't have to.
          </h1>
          <p className="mt-8 text-ink-300 text-lg max-w-xl leading-relaxed">
            Luminary was founded in 2024 with a single conviction: great design and great engineering are inseparable. We exist to prove that beautiful software can also be fast, accessible, and maintainable.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-stone">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: "48+", label: "Projects Delivered" },
              { stat: "12", label: "Countries Reached" },
              { stat: "99%", label: "Client Satisfaction" },
              { stat: "3", label: "Years of Excellence" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-black text-ink-900">{stat}</div>
                <div className="text-ink-500 text-sm mt-1.5 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-ink-400">
              Core Values
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-ink-900">
              What drives us.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map(({ number, title, desc }) => (
              <div
                key={number}
                className="flex gap-6 p-7 rounded-xl border border-stone hover:border-amber/50 transition-colors duration-300 bg-cream hover:bg-amber/5"
              >
                <span className="font-mono text-amber font-bold text-sm shrink-0 mt-0.5">
                  {number}
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl text-ink-900 mb-2">{title}</h3>
                  <p className="text-ink-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-stone/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-ink-400">
              The Team
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-ink-900">
              Small team, big vision.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map(({ name, role, initials }) => (
              <div
                key={name}
                className="group p-7 rounded-xl border border-stone bg-cream hover:border-amber/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-ink-900 flex items-center justify-center mb-5 group-hover:bg-amber transition-colors duration-300">
                  <span className="font-display font-bold text-cream group-hover:text-ink-900 text-sm transition-colors">
                    {initials}
                  </span>
                </div>
                <div className="font-display font-bold text-lg text-ink-900">{name}</div>
                <div className="text-ink-500 text-sm mt-1">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-black text-ink-900 mb-5">
            Let's build together.
          </h2>
          <p className="text-ink-500 mb-8 max-w-md mx-auto leading-relaxed">
            We take on a limited number of projects each quarter. Reach out early.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-4 bg-ink-900 text-cream font-medium rounded-md hover:bg-amber hover:text-ink-900 transition-all duration-200 group"
          >
            Get in Touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
