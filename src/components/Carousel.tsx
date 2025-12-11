import React, { useEffect } from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import { getData } from "../context/DataContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import Category from "./Category";
import type { Product } from "@/types/product";

// Arrow button props
interface ArrowProps {
  onClick?: () => void;
}

const Carousel: React.FC = () => {
  const { data, fetchAllProducts } = getData();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-40">
      <Button
        onClick={onClick}
        variant="outline"
        className="rounded-full p-2 bg-background/70 dark:bg-background/50 shadow-md hover:scale-110 transition"
      >
        <AiOutlineArrowLeft className="h-5 w-5" />
      </Button>
    </div>
  );

  const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40">
      <Button
        onClick={onClick}
        variant="outline"
        className="rounded-full p-2 bg-background/70 dark:bg-background/50 shadow-md hover:scale-110 transition"
      >
        <AiOutlineArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );

  const settings: Settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative mt-16 md:mt-0">
      <Slider {...settings}>
        {data.slice(0, 7).map((item: Product, index: number) => (
          <div key={index} className="bg-background text-foreground">
            <div className="flex flex-col md:flex-row gap-10 justify-center items-center h-[600px] px-4 md:px-16">
              
              {/* TEXT SECTION */}
              <div className="space-y-4 max-w-md">
                <h3 className="text-primary font-medium text-sm">
                  Powering Your World with the Best in Electronics
                </h3>

                <h1 className="text-xl md:text-4xl font-bold uppercase line-clamp-2">
                  {item.title}
                </h1>

                <p className="text-muted-foreground line-clamp-3 md:w-[500px]">
                  {item.description}
                </p>

                <Button className="mt-2 px-4 py-2 shadow hover:scale-105 transition">
                  Shop Now
                </Button>
              </div>

              {/* IMAGE */}
              <div>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="rounded-full w-[350px] md:w-[550px] shadow-2xl hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <Category />
    </div>
  );
};

export default Carousel