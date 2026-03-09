import { useCart } from "@/context/CartContext";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = location.pathname;
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally reset menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-[0_1px_0_oklch(var(--border))]"
          : "bg-black"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group gap-2">
            <img
              src="/assets/uploads/file_00000000fae072088d8ed6b747a2e155-1.png"
              alt="TSR Enterprises"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-brand-yellow font-black text-base md:text-lg tracking-wide uppercase">
                TSR Enterprises
              </span>
              <span className="text-white/70 text-xs md:text-sm font-medium tracking-wider uppercase">
                Spices And Snacks
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.link.${i + 1}`}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-brand-yellow bg-brand-yellow/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Cart Icon (Desktop) */}
            <Link
              to="/cart"
              data-ocid="nav.cart.button"
              className="relative ml-2 p-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-brand-yellow text-black text-[10px] font-black rounded-full flex items-center justify-center px-1 leading-none">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            <a
              href="https://wa.me/917003353783?text=Hello%2C%20I%20want%20to%20order%20TSR%20Snacks%20%26%20Spices%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2.5 bg-brand-yellow text-black rounded-md text-sm font-bold hover:bg-brand-yellow/90 transition-all duration-200 hover:shadow-brand-glow-sm"
            >
              Order Now
            </a>
          </div>

          {/* Mobile: Cart icon + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              to="/cart"
              data-ocid="nav.cart.button"
              className="relative p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-brand-yellow text-black text-[10px] font-black rounded-full flex items-center justify-center px-1 leading-none">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            <button
              type="button"
              data-ocid="nav.button"
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      data-ocid={`nav.link.${i + 1}`}
                      className={`px-4 py-3 rounded-md text-sm font-semibold transition-all ${
                        isActive
                          ? "text-brand-yellow bg-brand-yellow/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  to="/cart"
                  data-ocid="nav.cart.button"
                  className="px-4 py-3 rounded-md text-sm font-semibold transition-all text-white/80 hover:text-white hover:bg-white/5 flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-1 min-w-[20px] h-5 bg-brand-yellow text-black text-[10px] font-black rounded-full flex items-center justify-center px-1 leading-none">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <a
                  href="https://wa.me/917003353783?text=Hello%2C%20I%20want%20to%20order%20TSR%20Snacks%20%26%20Spices%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-0 mt-2 px-5 py-3 bg-brand-yellow text-black rounded-md text-sm font-bold text-center hover:bg-brand-yellow/90 transition-all"
                >
                  Order Now on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
