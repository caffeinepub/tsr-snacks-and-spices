import { Award, Heart, Leaf, MapPin, Shield, Star, Target } from "lucide-react";
import { motion } from "motion/react";

const TRUST_BADGES = [
  { icon: Shield, label: "Premium Quality" },
  { icon: Leaf, label: "Fresh Ingredients" },
  { icon: Star, label: "No Preservatives" },
  { icon: MapPin, label: "Made in India" },
];

const VALUES = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To bring the authentic taste of traditional Indian spices and healthy snacks to every household, preserving culinary heritage while meeting modern health standards.",
    color: "text-brand-yellow",
    bg: "bg-brand-yellow/10 border-brand-yellow/20",
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Quality above all — we never compromise on ingredients. Every batch is made with care, using time-honored recipes passed down through generations of Indian culinary tradition.",
    color: "text-[#22c55e]",
    bg: "bg-[#22c55e]/10 border-[#22c55e]/20",
  },
  {
    icon: Award,
    title: "Our Promise",
    desc: "We promise fresh, natural ingredients in every product — no artificial preservatives, no shortcuts. Just pure, authentic flavors you can trust for your family.",
    color: "text-[#f97316]",
    bg: "bg-[#f97316]/10 border-[#f97316]/20",
  },
];

export function About() {
  return (
    <main className="min-h-screen pt-20">
      {/* ─── Hero ─── */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/about-us-banner.dim_1000x500.jpg"
            alt="About TSR Snacks & Spices"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-3">
              Our Story
            </p>
            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white leading-[1.0] mb-4">
              About TSR
              <br />
              <span className="text-brand-yellow">Snacks & Spices</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── Story Section ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-4">
                Who We Are
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-6 leading-tight">
                Rooted in Tradition,
                <br />
                Built for Today
              </h2>
              <div className="space-y-4 text-white/70 text-base leading-relaxed">
                <p>
                  TSR Snacks & Spices is dedicated to delivering authentic
                  Indian spices and healthy snacks made with quality ingredients
                  and traditional taste.
                </p>
                <p>
                  Founded with a passion for Indian culinary heritage, we bring
                  you products crafted with care, using time-honored recipes
                  passed down through generations.
                </p>
                <p>
                  Every product is made with fresh, natural ingredients — no
                  artificial preservatives, no compromises. We believe that
                  great taste and good health go hand in hand.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src="/assets/generated/spices-collection.dim_800x600.jpg"
                  alt="Our spice collection"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-brand-yellow rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <div className="font-display font-black text-3xl text-black leading-none">
                  30+
                </div>
                <div className="text-black/70 text-xs font-semibold uppercase tracking-wide">
                  Products
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Trust Badges ─── */}
      <section className="py-12 bg-brand-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center gap-3 p-5 bg-brand-card border border-border rounded-xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-brand-yellow" />
                </div>
                <span className="font-display font-bold text-white text-sm">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values Section ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-3">
              What Drives Us
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white">
              Our Mission, Values & Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-brand-card border border-border rounded-2xl p-6 md:p-8"
              >
                <div
                  className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-5 ${item.bg}`}
                >
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="font-display font-black text-white text-xl mb-4">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Snacks Preview ─── */}
      <section className="py-12 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden relative">
            <img
              src="/assets/generated/snacks-collection.dim_800x600.jpg"
              alt="Our snacks collection"
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="font-display font-black text-2xl md:text-3xl text-white mb-2">
                  Healthy Snacks
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Millet-based, gluten-free, and Jain-friendly options available
                </p>
                <a
                  href="https://wa.me/917003353783?text=Hello%2C%20I%20want%20to%20order%20TSR%20Snacks%20%26%20Spices%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-yellow text-black font-bold text-sm rounded-lg hover:bg-brand-yellow/90 transition-all"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
