import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Product } from "../backend.d";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: bigint) => void;
  updateQuantity: (id: bigint, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
}

// ─── Context ────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "tsr-cart";

function serializeCart(items: CartItem[]): string {
  return JSON.stringify(
    items.map((item) => ({
      product: {
        ...item.product,
        id: item.product.id.toString(),
      },
      quantity: item.quantity,
    })),
  );
}

function deserializeCart(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw) as Array<{
      product: Omit<Product, "id"> & { id: string };
      quantity: number;
    }>;
    return parsed.map((item) => ({
      product: {
        ...item.product,
        id: BigInt(item.product.id),
      },
      quantity: item.quantity,
    }));
  } catch {
    return [];
  }
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? deserializeCart(stored) : [];
  });

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializeCart(items));
  }, [items]);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: bigint) => {
    setItems((prev) => prev.filter((item) => item.product.id !== id));
  }, []);

  const updateQuantity = useCallback((id: bigint, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: qty } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
