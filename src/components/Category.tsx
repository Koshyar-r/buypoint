import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ItemType {
  category: string;
  [key: string]: any;
}

const MAX_CATEGORIES = 8; // 👈 change this to however many you want

const Category = () => {
  const navigate = useNavigate();
  const { data } = getData();

  const getUniqueCategory = <T, K extends keyof T>(
    arr: T[] | undefined,
    key: K
  ): T[K][] => {
    if (!arr) return [];
    const values = arr.map((item) => item[key]);
    return [...new Set(values)];
  };

  const categoryOnlyData = getUniqueCategory<ItemType, "category">(
    data,
    "category"
  ).slice(0, MAX_CATEGORIES); // 👈 limit how many categories we render

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {categoryOnlyData?.map((item, index) => (
          <Button
            key={index}
            onClick={() => navigate(`/category/${item}`)}
            className="
              uppercase px-6 py-2 rounded-full
              bg-primary text-primary-foreground 
              shadow-sm
              hover:bg-primary/90
              transition-all active:scale-95
            "
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Category;