import { Link } from "@tanstack/react-router";
import { Heart, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-black border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-brand-yellow rounded-md flex items-center justify-center">
                <span className="font-display font-black text-black text-sm leading-none">
                  TSR
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-white text-base">
                  TSR
                </span>
                <span className="text-brand-yellow text-xs font-semibold tracking-wider uppercase">
                  Snacks & Spices
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Authentic Indian spices and healthy snacks made with quality
              ingredients and traditional taste.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <span
                aria-label="Instagram"
                className="w-9 h-9 rounded-md bg-white/5 border border-border flex items-center justify-center text-white/60 cursor-default"
              >
                <SiInstagram className="w-4 h-4" />
              </span>
              <span
                aria-label="Facebook"
                className="w-9 h-9 rounded-md bg-white/5 border border-border flex items-center justify-center text-white/60 cursor-default"
              >
                <SiFacebook className="w-4 h-4" />
              </span>
              <span
                aria-label="YouTube"
                className="w-9 h-9 rounded-md bg-white/5 border border-border flex items-center justify-center text-white/60 cursor-default"
              >
                <SiYoutube className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-brand-yellow text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Our Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/products"
                  className="text-white/60 hover:text-brand-yellow text-sm transition-colors"
                >
                  Indian Spices
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-white/60 hover:text-brand-yellow text-sm transition-colors"
                >
                  Healthy Snacks
                </Link>
              </li>
              <li>
                <span className="text-white/60 text-sm">Jain Products</span>
              </li>
              <li>
                <span className="text-white/60 text-sm">Gluten-Free Range</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <a
                  href="tel:7003353783"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  7003353783
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <a
                  href="https://wa.me/917003353783?text=Hello%2C%20I%20want%20to%20order%20TSR%20Snacks%20%26%20Spices%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-brand-yellow text-sm transition-colors"
                >
                  WhatsApp Order
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span className="text-white/60 text-sm">India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {year} TSR Snacks & Spices. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-brand-yellow inline" />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-brand-yellow transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
