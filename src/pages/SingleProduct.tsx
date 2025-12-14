import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import type { Product } from "../types/product";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { isSignedIn } = useUser();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get<Product>(
        `https://dummyjson.com/products/${params.id}`
      );
      setSingleProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (!singleProduct)
    return (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );

  const originalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100
  );

  const handleAddToCart = () => {
    if (!isSignedIn) {
      toast.error("Sign in first");
      return;
    }

    addToCart(singleProduct);
  };

  return (
    <div className="px-4 md:px-0 pb-10">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-8 mt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{singleProduct.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Product Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:p-6">
        {/* Image */}
        <div className="w-full">
          <img
            src={singleProduct.images[0]}
            alt={singleProduct.title}
            className="rounded-2xl w-full object-cover shadow"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <h1 className="md:text-3xl text-2xl font-bold text-foreground">
            {singleProduct.title}
          </h1>

          <div className="text-muted-foreground font-medium space-x-2">
            <Badge variant="secondary">{singleProduct.brand}</Badge>
            <Badge variant="outline">{singleProduct.category}</Badge>
          </div>

          {/* Price */}
          <div className="text-xl font-semibold flex items-center gap-3">
            <span className="text-primary text-2xl">
              ${singleProduct.price}
            </span>

            <span className="line-through text-muted-foreground">
              ${originalPrice}
            </span>

            <Badge className="bg-primary text-primary-foreground">
              {singleProduct.discountPercentage}% OFF
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {singleProduct.description}
          </p>

          {/* Quantity Selector (visual only for now) */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">
              Quantity:
            </label>
            <Input type="number" min={1} defaultValue={1} className="w-20" />
          </div>

          {/* Add to Cart */}
          <div className="mt-4 flex gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              onClick={handleAddToCart}
            >
              <IoCartOutline className="w-6 h-6" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;