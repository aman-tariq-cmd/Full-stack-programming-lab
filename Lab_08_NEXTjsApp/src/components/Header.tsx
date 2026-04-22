"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },   // ← Task 2 addition
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-stone"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-sm bg-ink-900 flex items-center justify-center group-hover:bg-amber transition-colors duration-300">
              <span className="font-display font-black text-cream text-sm">L</span>
            </span>
            <span className="font-display font-bold text-ink-900 text-lg tracking-tight">
              Luminary
              <span className="text-amber">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              // Active: exact match for "/" and starts-with for deeper paths
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-md group ${
                    isActive
                      ? "text-ink-900"
                      : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-stone rounded-md" />
                  )}
                  <span className="relative">{label}</span>
                  {!isActive && (
                    <span className="absolute bottom-1.5 left-4 right-4 h-px bg-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-3 px-5 py-2 bg-ink-900 text-cream text-sm font-medium rounded-md hover:bg-amber hover:text-ink-900 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-md text-ink-700 hover:bg-stone transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-cream/98 backdrop-blur-md border-t border-stone px-6 py-4 flex flex-col gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-stone text-ink-900"
                    : "text-ink-500 hover:text-ink-900 hover:bg-stone/60"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                )}
                {!isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                )}
                {label}
              </Link>
            );
          })}
          <div className="mt-2 pt-3 border-t border-stone">
            <Link
              href="/contact"
              className="block text-center px-4 py-2.5 bg-ink-900 text-cream text-sm font-medium rounded-md hover:bg-amber hover:text-ink-900 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
