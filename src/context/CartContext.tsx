import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  quantity?: number;
}

interface CartContextType {
  cartItem: Product[];
  setCartItem: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  updateQuantity: (
    cart: Product[],
    productId: number,
    action: "increase" | "decrease"
  ) => void;
  deleteItem: (productId: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItem, setCartItem] = useState<Product[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product: Product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item
      );
      setCartItem(updatedCart);
      toast.success("Product quantity increased!");
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product is added to cart!");
    }
  };

  const updateQuantity = (
    cart: Product[],
    productId: number,
    action: "increase" | "decrease"
  ) => {
    setCartItem(
      cart
        .map((item) => {
          if (item.id === productId) {
            let newQuantity = item.quantity ?? 1;
            if (action === "increase") {
              newQuantity++;
              toast.success("Quantity increased!");
            } else {
              newQuantity--;
              toast.error("Quantity decreased!");
            }
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as Product[]
    );
  };

  const deleteItem = (productId: number) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.success("Product removed from cart!");
  };

  const clearCart = () => {
    setCartItem([]);
    toast.info("Cart cleared!");
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart safely
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}