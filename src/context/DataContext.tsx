// src/context/DataContext.tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "../types/product";

interface DataContextType {
  data: Product[];
  categoryOnlyData: string[];
  brandOnlyData: string[];
  fetchAllProducts: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Product[]>([]);
  const [categoryOnlyData, setCategoryOnlyData] = useState<string[]>([]);
  const [brandOnlyData, setBrandOnlyData] = useState<string[]>([]);

  const fetchAllProducts = useCallback(async () => {
    try {
      // 🔧 Replace this with your real API
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const json = await res.json();

      const products: Product[] = json.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        images: Array.isArray(p.images) ? p.images : [p.thumbnail ?? ""],
        brand: p.brand,
        category: p.category,
        description: p.description,
        discountPercentage: p.discountPercentage ?? 0,
      }));

      setData(products);

      const categories = Array.from(
        new Set(products.map((p) => p.category))
      ).sort();
      const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

      setCategoryOnlyData(categories);
      setBrandOnlyData(brands);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{ data, categoryOnlyData, brandOnlyData, fetchAllProducts }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("getData must be used inside <DataProvider>");
  return ctx;
};