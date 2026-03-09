import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const WHATSAPP_NUMBER = "917003353783";

function buildWhatsAppMessage(
  items: Array<{ name: string; quantity: number }>,
  totalItems: number,
): string {
  const lines = items.map(
    (item, i) => `${i + 1}. ${item.name} - ${item.quantity} Pack`,
  );
  return [
    "Hello, I want to order the following products from TSR Snacks & Spices:",
    "",
    ...lines,
    "",
    `Total Items: ${totalItems}`,
  ].join("\n");
}

export function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems } = useCart();

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    const message = buildWhatsAppMessage(
      items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
      })),
      totalItems,
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main data-ocid="cart.page" className="min-h-screen pt-20">
      {/* ─── Page Header ─── */}
      <section className="relative py-12 md:py-16 bg-brand-surface overflow-hidden">
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              to="/products"
              data-ocid="cart.continue_shopping.link"
              className="inline-flex items-center gap-2 text-white/50 hover:text-brand-yellow text-sm font-semibold transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest">
                  Review Order
                </p>
                <h1 className="font-display font-black text-3xl md:text-4xl text-white">
                  Your Cart
                </h1>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Cart Content ─── */}
      <section className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            /* ─── Empty State ─── */
            <motion.div
              data-ocid="cart.empty_state"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="py-24 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-brand-card border border-border flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-9 h-9 text-white/30" />
              </div>
              <h2 className="font-display font-black text-2xl text-white mb-3">
                Your cart is empty
              </h2>
              <p className="text-white/50 text-sm mb-8 max-w-xs mx-auto">
                Add some delicious spices and snacks from our collection to get
                started.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-black font-bold text-sm rounded-xl hover:bg-brand-yellow/90 transition-all hover:shadow-brand-glow-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                Browse Products
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* ─── Items List ─── */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => {
                    const isSpice = item.product.category === "spices";
                    const imageUrl = isSpice
                      ? "/assets/generated/spice-product.dim_400x400.jpg"
                      : "/assets/generated/snack-product.dim_400x400.jpg";

                    return (
                      <motion.div
                        key={item.product.id.toString()}
                        data-ocid={`cart.item.${index + 1}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        layout
                        className="bg-brand-card border border-border rounded-xl overflow-hidden flex gap-4 p-4 product-card-glow transition-all duration-300"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-black/40">
                          <img
                            src={imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-display font-bold text-white text-base leading-tight line-clamp-2">
                              {item.product.name}
                            </h3>
                            <button
                              type="button"
                              data-ocid={`cart.item.${index + 1}`}
                              onClick={() => removeFromCart(item.product.id)}
                              className="flex-shrink-0 p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-white/40 text-xs mb-1 uppercase tracking-wider font-semibold">
                            {isSpice ? "Spice" : "Snack"}
                          </p>
                          <p className="text-brand-yellow/70 text-xs font-medium mb-3">
                            Contact for Price
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-black/40 border border-border rounded-lg overflow-hidden">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-white font-bold text-sm tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-white/40 text-xs">
                              {item.quantity}{" "}
                              {item.quantity === 1 ? "pack" : "packs"}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* ─── Order Summary ─── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-brand-card border border-border rounded-xl p-6 sticky top-24">
                  <h2 className="font-display font-black text-xl text-white mb-6">
                    Order Summary
                  </h2>

                  {/* Summary Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">
                        Total Products
                      </span>
                      <span className="text-white font-bold text-sm">
                        {items.length} item{items.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Total Packs</span>
                      <span className="font-display font-black text-brand-yellow text-lg">
                        {totalItems}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <p className="text-white/40 text-xs text-center">
                      Pricing will be confirmed via WhatsApp
                    </p>
                  </div>

                  {/* WhatsApp Order Button */}
                  <button
                    type="button"
                    data-ocid="cart.whatsapp.button"
                    onClick={handlePlaceOrder}
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-5 bg-brand-yellow text-black font-bold text-sm rounded-xl hover:bg-brand-yellow/90 transition-all duration-200 hover:shadow-brand-glow-sm active:scale-[0.98]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Place Order on WhatsApp
                  </button>

                  <Link
                    to="/products"
                    data-ocid="cart.continue_shopping.link"
                    className="w-full mt-3 flex items-center justify-center gap-2 py-3 px-5 bg-transparent border border-border text-white/60 hover:text-white hover:border-white/30 font-semibold text-sm rounded-xl transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
