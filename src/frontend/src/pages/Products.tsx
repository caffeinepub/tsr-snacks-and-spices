import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { useAllProducts } from "@/hooks/useQueries";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Filter = "all" | "spices" | "snacks";

const FILTER_TABS: { value: Filter; label: string; ocid: string }[] = [
  { value: "all", label: "All Products", ocid: "products.tab.1" },
  { value: "spices", label: "Spices", ocid: "products.tab.2" },
  { value: "snacks", label: "Snacks", ocid: "products.tab.3" },
];

export function Products() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const { data: products, isLoading } = useAllProducts();

  const filtered = (products ?? []).filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  const spiceCount = (products ?? []).filter(
    (p) => p.category === "spices",
  ).length;
  const snackCount = (products ?? []).filter(
    (p) => p.category === "snacks",
  ).length;

  return (
    <main className="min-h-screen pt-20">
      {/* ─── Page Header ─── */}
      <section className="relative py-16 md:py-24 bg-brand-surface overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, oklch(0.83 0.165 92) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-3">
              Premium Collection
            </p>
            <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
              Our Products
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Discover our range of authentic Indian spices and healthy snacks
              crafted with love.
            </p>

            {/* Stats */}
            {!isLoading && products && (
              <div className="flex items-center justify-center gap-8 mt-8">
                <div className="text-center">
                  <div className="font-display font-black text-3xl text-brand-yellow">
                    {spiceCount}
                  </div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">
                    Spices
                  </div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="font-display font-black text-3xl text-brand-yellow">
                    {snackCount}
                  </div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">
                    Snacks
                  </div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="font-display font-black text-3xl text-brand-yellow">
                    {(products ?? []).length}
                  </div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">
                    Total
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Filter Tabs ─── */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {FILTER_TABS.map((tab) => (
              <button
                type="button"
                key={tab.value}
                data-ocid={tab.ocid}
                onClick={() => setActiveFilter(tab.value)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeFilter === tab.value
                    ? "bg-brand-yellow text-black shadow-brand-glow-sm"
                    : "bg-brand-card border border-border text-white/70 hover:text-white hover:border-brand-yellow/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Products Grid ─── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div
              data-ocid="products.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                "sk1",
                "sk2",
                "sk3",
                "sk4",
                "sk5",
                "sk6",
                "sk7",
                "sk8",
                "sk9",
              ].map((k) => (
                <ProductCardSkeleton key={k} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div data-ocid="products.empty_state" className="py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌶️</span>
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">
                No products yet
              </h3>
              <p className="text-white/50 text-sm">
                Products will appear here shortly.
              </p>
            </div>
          ) : (
            <>
              {/* Section headings when viewing "all" */}
              {activeFilter === "all" ? (
                <div className="space-y-16">
                  {/* Spices */}
                  {filtered.filter((p) => p.category === "spices").length >
                    0 && (
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div>
                          <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-1">
                            Category
                          </p>
                          <h2 className="font-display font-black text-2xl md:text-3xl text-white">
                            Our Spices
                          </h2>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                      </div>
                      <AnimatePresence mode="popLayout">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filtered
                            .filter((p) => p.category === "spices")
                            .map((product, i) => (
                              <ProductCard
                                key={product.id.toString()}
                                product={product}
                                index={i}
                              />
                            ))}
                        </div>
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Snacks */}
                  {filtered.filter((p) => p.category === "snacks").length >
                    0 && (
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div>
                          <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-1">
                            Category
                          </p>
                          <h2 className="font-display font-black text-2xl md:text-3xl text-white">
                            Our Snacks
                          </h2>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                      </div>
                      <AnimatePresence mode="popLayout">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filtered
                            .filter((p) => p.category === "snacks")
                            .map((product, i) => (
                              <ProductCard
                                key={product.id.toString()}
                                product={product}
                                index={i}
                              />
                            ))}
                        </div>
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((product, i) => (
                      <ProductCard
                        key={product.id.toString()}
                        product={product}
                        index={i}
                      />
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </>
          )}
        </div>
      </section>

      {/* ─── WhatsApp CTA ─── */}
      <section className="py-12 bg-brand-surface border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm mb-4">
            Can't find what you're looking for? Contact us directly!
          </p>
          <a
            href="https://wa.me/917003353783?text=Hello%2C%20I%20want%20to%20order%20TSR%20Snacks%20%26%20Spices%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-black font-bold text-sm rounded-xl hover:bg-brand-yellow/90 transition-all hover:shadow-brand-glow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
