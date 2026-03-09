import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const isSpice = product.category === "spices";
  const isJain = product.tags.includes("jain");
  const isGlutenFree = product.tags.includes("gluten-free");
  const { addToCart } = useCart();

  const imageUrl = isSpice
    ? "/assets/generated/spice-product.dim_400x400.jpg"
    : "/assets/generated/snack-product.dim_400x400.jpg";

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: "View your cart to place an order.",
      duration: 2500,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      data-ocid={`product.item.${index + 1}`}
      className="bg-brand-card border border-border rounded-xl overflow-hidden group product-card-glow transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-44 bg-black/40">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges overlay */}
        {(isJain || isGlutenFree) && (
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {isJain && (
              <span className="px-2 py-0.5 bg-brand-yellow text-black text-[10px] font-bold rounded-full uppercase tracking-wide">
                Jain
              </span>
            )}
            {isGlutenFree && (
              <span className="px-2 py-0.5 bg-[#22c55e] text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                Gluten Free
              </span>
            )}
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white/80 text-[10px] font-semibold rounded-full uppercase tracking-wide border border-white/10">
            {isSpice ? "Spice" : "Snack"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-white text-base leading-tight mb-1.5 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem] mb-2">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-white/40 text-xs font-medium mb-3 italic">
          Contact for Price
        </p>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          data-ocid={`product.button.${index + 1}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-yellow text-black font-bold text-sm rounded-lg hover:bg-brand-yellow/90 transition-all duration-200 hover:shadow-brand-glow-sm active:scale-[0.98] group/btn mt-auto pt-3"
        >
          <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-brand-card border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="h-44 bg-white/5" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-white/10 rounded-md w-3/4" />
        <div className="h-3 bg-white/5 rounded-md w-full" />
        <div className="h-3 bg-white/5 rounded-md w-5/6" />
        <div className="h-10 bg-white/10 rounded-lg mt-4" />
      </div>
    </div>
  );
}
