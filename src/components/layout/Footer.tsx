import Link from "next/link";
import { Mail, Linkedin, BookOpen, Globe } from "lucide-react";

const socialLinks = [
  { href: "mailto:uchoudhury@crimson.ua.edu", icon: Mail, label: "Email" },
  { href: "https://linkedin.com/in/utkarsh-roy-choudhury-816162ba/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://scholar.google.com/citations?user=gWzksQwAAAAJ&hl=en", icon: BookOpen, label: "Google Scholar" },
  { href: "https://orcid.org/0000-0001-6446-1138", icon: Globe, label: "ORCID" },
];

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand & Bio */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-display font-bold text-2xl tracking-tight hover:text-accent transition-colors"
            >
              Utkarsh Roy Choudhury
            </Link>
            <p className="mt-4 text-text-secondary max-w-md">
              Climate & Biodiversity Policy Researcher at the University of Alabama,
              focusing on environmental governance, the financialization of nature, and conservation.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-text-tertiary mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-sm">
            © {currentYear} Utkarsh Roy Choudhury
          </p>
        </div>
      </div>
    </footer>
  );
}
