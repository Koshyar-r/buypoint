import banner from '../assets/banner.jpg'
import { Button } from "@/components/ui/button";

const MidBanner = () => {
  return (
    <div className="bg-muted md:py-24">
      <div
        className="
          relative max-w-7xl mx-auto md:rounded-2xl pt-28 
          bg-cover bg-center h-[550px] md:h-[600px]
        "
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl flex items-center justify-center">

          <div className="text-center px-4">

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Your Favorite Finds, All in One Place
            </h1>

            <p className="text-lg md:text-xl mb-6 text-gray-200">
              Discover quality products, smart prices, and free shipping on every order.
            </p>

            {/* Button that does NOT change in dark mode */}
            <Button
              size="lg"
              className="
                font-semibold 
                bg-white 
                text-black 
                hover:bg-white/90 
                shadow 
                transition
              "
            >
              Shop Now
            </Button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MidBanner