import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { useAllProducts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChefHat,
  Heart,
  Leaf,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

const WHATSAPP_URL =
  "https://wa.me/917003353783?text=Hello%2C%20I%20want%20to%20order%20TSR%20Snacks%20%26%20Spices%20products.";

const WHY_CHOOSE = [
  {
    icon: ChefHat,
    title: "Rajasthani Handcrafted Spices",
    desc: "Traditional handmade quality in every single pack.",
  },
  {
    icon: Leaf,
    title: "All-Natural",
    desc: "Pure ingredients with no artificial preservatives or colors.",
  },
  {
    icon: Heart,
    title: "Perfect Healthy Snacks",
    desc: "Clean, guilt-free munching for your daily cravings.",
  },
  {
    icon: Shield,
    title: "Freshness Guaranteed",
    desc: "Processed in hygienic, state-of-the-art facilities and sealed in resealable, moisture-proof zip-lock packs.",
  },
];

const REVIEWS = [
  {
    text: "Amazing spices! The Garam Masala is so aromatic.",
    author: "Priya S.",
    rating: 5,
  },
  {
    text: "Millet snacks are my kids' favorite healthy snack.",
    author: "Rahul M.",
    rating: 5,
  },
  {
    text: "Best quality Lal Mirch Powder I've ever used!",
    author: "Sunita K.",
    rating: 5,
  },
];

export function Home() {
  const { data: products, isLoading } = useAllProducts();

  const spices = (products ?? [])
    .filter((p) => p.category === "spices")
    .slice(0, 4);
  const snacks = (products ?? [])
    .filter((p) => p.category === "snacks")
    .slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1200x600.jpg"
            alt="TSR Snacks & Spices"
            className="w-full h-full object-cover"
          />
          {/* Layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Pre-headline badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              <span className="text-brand-yellow text-xs font-bold uppercase tracking-widest">
                Premium Indian Spices And Snacks
              </span>
            </motion.div>

            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.0] mb-6">
              <span className="hero-headline-gradient">Authentic Taste,</span>
              <br />
              <span className="text-white">Premium Quality</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              TSR Enterprises the brand of Snacks and Spices brings you the
              perfect blend of health and heritage. From our farm-fresh masalas
              to our crispy, guilt-free snacks, we believe in one simple rule:
              Eat less, but eat well.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.primary_button"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-yellow text-black font-bold text-base rounded-xl hover:bg-brand-yellow/90 transition-all duration-200 hover:shadow-brand-glow shadow-brand-glow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </a>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold text-base rounded-xl hover:bg-white/15 transition-all"
              >
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 mt-10">
              {["All - Natural", "No Preservatives", "Made in India"].map(
                (badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-1.5 text-white/60 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                    {badge}
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-8 bg-gradient-to-b from-white/0 to-white/60" />
          <div className="w-1 h-1 rounded-full bg-white/60" />
        </div>
      </section>

      {/* ═══ OUR SPICES SECTION ═══ */}
      <section className="py-16 md:py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-2">
                Category
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white">
                Our Spices
              </h2>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1.5 text-brand-yellow font-bold text-sm hover:gap-3 transition-all duration-200"
            >
              View All Spices <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                <ProductCardSkeleton key={k} />
              ))}
            </div>
          ) : spices.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {spices.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                "Lal Mirch Powder",
                "Dhaniya Powder",
                "Garam Masala",
                "Chai Masala",
              ].map((name) => (
                <div
                  key={name}
                  className="bg-brand-card border border-border rounded-xl overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src="/assets/generated/spice-product.dim_400x400.jpg"
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-white text-sm mb-3">
                      {name}
                    </h3>
                    <a
                      href={`https://wa.me/917003353783?text=Hello%2C%20I%20want%20to%20order%20${encodeURIComponent(name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center py-2 bg-brand-yellow text-black font-bold text-xs rounded-lg hover:bg-brand-yellow/90 transition-all"
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ OUR SNACKS SECTION ═══ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-2">
                Category
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white">
                Our Snacks
              </h2>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1.5 text-brand-yellow font-bold text-sm hover:gap-3 transition-all duration-200"
            >
              View All Snacks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                <ProductCardSkeleton key={k} />
              ))}
            </div>
          ) : snacks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {snacks.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {["Jowar Bhel", "Chickpea Munch", "Millet Mix", "Party Nuts"].map(
                (name) => (
                  <div
                    key={name}
                    className="bg-brand-card border border-border rounded-xl overflow-hidden"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src="/assets/generated/snack-product.dim_400x400.jpg"
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-white text-sm mb-3">
                        {name}
                      </h3>
                      <a
                        href={`https://wa.me/917003353783?text=Hello%2C%20I%20want%20to%20order%20${encodeURIComponent(name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center py-2 bg-brand-yellow text-black font-bold text-xs rounded-lg hover:bg-brand-yellow/90 transition-all"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══ WHY CHOOSE TSR SECTION ═══ */}
      <section className="py-16 md:py-24 bg-brand-surface relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-yellow blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-3">
              Why Us
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white">
              Why Choose TSR
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-brand-card border border-border rounded-2xl p-6 group hover:border-brand-yellow/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center mb-4 group-hover:bg-brand-yellow/20 transition-colors">
                  <item.icon className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CUSTOMER REVIEWS ═══ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-3">
              Testimonials
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-brand-card border border-border rounded-2xl p-6 relative"
              >
                {/* Quote mark */}
                <div className="absolute top-5 right-6 font-display font-black text-6xl text-brand-yellow/10 leading-none select-none">
                  "
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from(
                    { length: review.rating },
                    (_, j) => `star-${review.author}-${j}`,
                  ).map((key) => (
                    <Star
                      key={key}
                      className="w-4 h-4 text-brand-yellow fill-brand-yellow"
                    />
                  ))}
                </div>
                <p className="text-white/80 text-base leading-relaxed mb-5 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-yellow/20 border border-brand-yellow/30 flex items-center justify-center">
                    <span className="font-display font-bold text-brand-yellow text-sm">
                      {review.author[0]}
                    </span>
                  </div>
                  <span className="font-display font-bold text-white text-sm">
                    {review.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHATSAPP CTA BANNER ═══ */}
      <section className="py-16 md:py-20 bg-brand-yellow relative overflow-hidden">
        {/* Diagonal pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display font-black text-xs uppercase tracking-widest text-black/50 mb-3">
              Direct Ordering
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl text-black mb-4 leading-tight">
              Ready to Order?
              <br />
              Chat with us on WhatsApp!
            </h2>
            <p className="text-black/70 text-lg mb-8">
              Get fresh products delivered directly to your doorstep.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="cta.primary_button"
              className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-black/80 transition-all duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#25D366"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order Now on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT INFO STRIP ═══ */}
      <section className="py-8 bg-brand-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a
              href="tel:7003353783"
              className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-yellow" />
              <span className="text-sm font-semibold">7003353783</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-white/70 hover:text-brand-yellow transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-brand-yellow" />
              <span className="text-sm font-semibold">Chat on WhatsApp</span>
            </a>
            <div className="flex items-center gap-2.5 text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              <span className="text-sm">Made in India, Loved Everywhere</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
