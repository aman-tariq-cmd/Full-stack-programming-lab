import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "https://twitter.com", label: "Twitter / X", Icon: Twitter },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-sm bg-amber flex items-center justify-center">
                <span className="font-display font-black text-ink-900 text-sm">L</span>
              </span>
              <span className="font-display font-bold text-cream text-lg tracking-tight">
                Luminary<span className="text-amber">.</span>
              </span>
            </Link>
            <p className="text-ink-300 text-sm leading-relaxed max-w-xs">
              A creative studio building meaningful experiences at the intersection of design and technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-ink-300 hover:text-amber text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink-400 mb-4">
              Follow Along
            </h3>
            <ul className="space-y-2.5">
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-ink-300 hover:text-amber text-sm transition-colors duration-200 group"
                  >
                    <Icon size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-500 text-xs font-mono">
            © {year} Luminary Studio. All rights reserved.
          </p>
          <p className="text-ink-600 text-xs font-mono">
            Built with Next.js 14 & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
