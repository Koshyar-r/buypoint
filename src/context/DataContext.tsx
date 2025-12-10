import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export interface Product {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  images: string[];
  [key: string]: any; // allow extra fields from API
}

interface DataContextType {
  data: Product[];
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchAllProducts: () => Promise<void>;
  categoryOnlyData: string[];
  brandOnlyData: string[];
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Product[]>([]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=150");
      const productsData = res.data.products;

      // Ensure images is always an array
      const cleaned = productsData.map((p: any) => ({
        ...p,
        images: Array.isArray(p.images) ? p.images : [p.thumbnail],
      }));

      setData(cleaned);
    } catch (error) {
      console.log(error);
    }
  };

  const getUniqueCategory = (arr: Product[], property: keyof Product) => {
    let values = arr.map((item) => item[property]);
    return ["All", ...new Set(values)];
  };

  const categoryOnlyData = getUniqueCategory(data, "category");
  const brandOnlyData = getUniqueCategory(data, "brand");

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ----------------------

export const getData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("getData must be used inside <DataProvider />");
  }
  return ctx;
}