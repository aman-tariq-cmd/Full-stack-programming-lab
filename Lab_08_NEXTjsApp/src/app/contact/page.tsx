"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@luminary.studio",
    href: "mailto:hello@luminary.studio",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #faf8f5 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-amber/10 blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-400 mb-8">
            <span className="w-6 h-px bg-amber" />
            Contact
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black text-cream leading-tight tracking-tight max-w-2xl">
            Let's start a{" "}
            <span className="italic text-amber">conversation.</span>
          </h1>
          <p className="mt-6 text-ink-300 text-lg max-w-lg leading-relaxed">
            Whether you have a project in mind, a question, or just want to say hello — our inbox is always open.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Info sidebar */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl text-ink-900 mb-6">
                  Get in touch
                </h2>
                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-md bg-amber/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={15} className="text-amber" />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-ink-400 mb-0.5">
                          {label}
                        </div>
                        {href ? (
                          <a href={href} className="text-ink-700 hover:text-amber transition-colors text-sm font-medium">
                            {value}
                          </a>
                        ) : (
                          <span className="text-ink-700 text-sm font-medium">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-stone bg-stone/20">
                <div className="font-display font-bold text-ink-900 mb-2">Office Hours</div>
                <p className="text-ink-500 text-sm leading-relaxed">
                  Mon – Fri, 9:00 AM – 6:00 PM PST
                  <br />
                  We aim to respond within one business day.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-16 gap-5">
                  <div className="w-16 h-16 rounded-full bg-amber/10 flex items-center justify-center">
                    <CheckCircle size={28} className="text-amber" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-ink-900 mb-2">
                      Message received!
                    </h3>
                    <p className="text-ink-500 text-sm max-w-sm">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-2 text-sm text-amber hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-ink-400 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-md border border-stone bg-cream text-ink-900 text-sm placeholder:text-ink-400 focus:outline-none focus:border-amber transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-ink-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 rounded-md border border-stone bg-cream text-ink-900 text-sm placeholder:text-ink-400 focus:outline-none focus:border-amber transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-ink-400 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-stone bg-cream text-ink-900 text-sm focus:outline-none focus:border-amber transition-colors appearance-none"
                    >
                      <option value="" disabled>Select a topic…</option>
                      <option value="project">New Project</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-ink-400 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, timeline, and goals…"
                      className="w-full px-4 py-3 rounded-md border border-stone bg-cream text-ink-900 text-sm placeholder:text-ink-400 focus:outline-none focus:border-amber transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-ink-900 text-cream font-medium rounded-md hover:bg-amber hover:text-ink-900 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
