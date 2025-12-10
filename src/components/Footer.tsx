import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaInstagram, FaTwitterSquare, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 md:grid md:grid-cols-4 gap-10 text-muted-foreground">
        
        {/* Info */}
        <div>
          <Link to="/">
            <h1 className="text-primary text-2xl font-bold">BuyPoint</h1>
          </Link>
          <p className="mt-2 text-sm">Quality You Can Trust. Prices You’ll Love.</p>
          <p className="mt-2 text-sm">215 Ludendorff, North Yankton, USA</p>
          <p className="text-sm">Email: support@buypoint.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-foreground">Customer Service</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="hover:text-primary transition cursor-pointer">Contact Us</li>
            <li className="hover:text-primary transition cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-primary transition cursor-pointer">FAQs</li>
            <li className="hover:text-primary transition cursor-pointer">Order Tracking</li>
            <li className="hover:text-primary transition cursor-pointer">Size Guide</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-foreground">Follow Us</h3>
          <div className="flex space-x-4 mt-3 text-foreground">
            <FaFacebook className="h-6 w-6 hover:text-primary transition cursor-pointer" />
            <FaInstagram className="h-6 w-6 hover:text-primary transition cursor-pointer" />
            <FaTwitterSquare className="h-6 w-6 hover:text-primary transition cursor-pointer" />
            <FaPinterest className="h-6 w-6 hover:text-primary transition cursor-pointer" />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-foreground">Stay in the Loop</h3>
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more.
          </p>

          <form className="mt-4 flex">
            <Input
              type="email"
              placeholder="Your email address"
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <Separator />

      {/* Bottom */}
      <div className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} <span className="text-primary">Made By Kushyar Rashidzadeh</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer