import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";

interface ProductCardProps {
  product: {
    id: string | number;
    title: string;
    price: number;
    images: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <Card
      onClick={() => navigate(`/products/${product.id}`)}
      className="cursor-pointer hover:scale-[1.03] hover:shadow-xl 
      transition-all duration-300 rounded-2xl overflow-hidden flex flex-col"
    >
      <CardHeader className="p-0">
        <img
          src={product.images}
          alt={product.title}
          className="aspect-square w-full object-cover bg-muted"
        />
      </CardHeader>

      <CardContent className="p-4 flex flex-col flex-grow">
        <h1 className="text-[15px] font-semibold line-clamp-2 min-h-[40px] leading-snug">
          {product.title}
        </h1>

        <p className="mt-3 text-xl font-bold text-foreground">
          ${product.price}
        </p>

        <div className="flex-grow" />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full flex items-center justify-center gap-2 font-semibold"
        >
          <IoCartOutline className="w-5 h-5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard