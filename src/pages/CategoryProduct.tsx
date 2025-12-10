import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loading from "../assets/Loading4.webm";
import ProductListView from "../components/ProductListView";

interface ProductType {
  id: number;
  title: string;
  price: number;
  images: string;
  discountPrecentage: number;
  brand: string;
  description: string;
  discountPercentage: number;
  category: string;
  [key: string]: any;
}

const CategoryProduct: React.FC = () => {
  const [searchData, setSearchData] = useState<ProductType[]>([]);
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const getFilteredProducts = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      setSearchData(res.data.products);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    getFilteredProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {searchData.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">

          {/* BACK BUTTON */}
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="mb-5 flex gap-2 items-center"
          >
            ← Back
          </Button>

          {/* PRODUCT LIST */}
          {searchData.map((product) => (
            <ProductListView key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct