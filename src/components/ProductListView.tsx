// src/components/ProductListView.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Full Product type compatible with CartContext
export interface ProductType {
  id: number;
  title: string;
  price: number;
  images: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  [key: string]: any;
}

interface ProductListViewProps {
  product: ProductType;
}

const ProductListView: React.FC<ProductListViewProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const discountedPrice = Math.round(
    product.price - (product.price * product.discountPercentage) / 100
  );

  return (
    <div className="space-y-4 mt-2 rounded-md">
      <div className="bg-background dark:bg-background/80 flex gap-7 items-center p-4 rounded-md shadow-md">
        {/* Product Image */}
        <img
          src={product.images}
          alt={product.title}
          className="md:h-60 md:w-60 h-24 w-24 rounded-md cursor-pointer object-cover"
          onClick={() => navigate(`/products/${product.id}`)}
        />

        {/* Product Info */}
        <div className="space-y-2 flex-1">
          <h1 className="font-bold md:text-xl text-lg line-clamp-2 hover:text-primary transition-colors cursor-pointer">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 text-lg font-semibold">
            <span className="text-primary text-2xl">${discountedPrice}</span>
            <span className="line-through text-muted-foreground">${product.price}</span>
            <Badge variant="secondary">{product.discountPercentage}% OFF</Badge>
          </div>

          <p className="text-muted-foreground text-sm">
            FREE delivery <span className="font-semibold">Fri, 18 Apr</span>
            <br />
            Or fastest delivery <span className="font-semibold">Tomorrow, 17 Apr</span>
          </p>

          <Button
            onClick={() => addToCart({ ...product, images: [product.images] })}
            variant="default"
            className="mt-2"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductListView