// src/components/Navbar.tsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import LocationPicker from "./LocationPicker";
import type { LocationType } from "./LocationPicker";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  location: LocationType | null;
  getLocation: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ location, getLocation }) => {
  const { cartItem } = useCart();
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <header className="bg-background text-foreground shadow-md py-3 px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo + Location */}
        <div className="flex gap-7 items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-bold">
              <span className="text-blue-500 font-serif">B</span>uyPoint
            </h1>
          </Link>

          <LocationPicker location={location} getLocation={getLocation} />
        </div>

        {/* Main Nav */}
        <nav className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-7 text-base font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "border-b-2 border-primary text-primary" : "text-foreground"} transition-all`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${isActive ? "border-b-2 border-primary text-primary" : "text-foreground"} transition-all`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? "border-b-2 border-primary text-primary" : "text-foreground"} transition-all`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${isActive ? "border-b-2 border-primary text-primary" : "text-foreground"} transition-all`
              }
            >
              Contact
            </NavLink>
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <IoCartOutline className="h-6 w-6 text-foreground" />
            {cartItem.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-foreground text-accent text-xs rounded-full px-2">
                {cartItem.length}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Dark Mode Toggle */}
          <ModeToggle />

          {/* Mobile Menu Toggle */}
          {openNav ? (
            <HiMenuAlt3
              onClick={() => setOpenNav(false)}
              className="h-6 w-6 md:hidden cursor-pointer"
            />
          ) : (
            <HiMenuAlt1
              onClick={() => setOpenNav(true)}
              className="h-6 w-6 md:hidden cursor-pointer"
            />
          )}
        </nav>
      </div>

      {/* Mobile responsive menu */}
      <ResponsiveMenu
        openNav={openNav}
        setOpenNav={setOpenNav}
        location={location}
        getLocation={getLocation}
      />
    </header>
  );
};

export default Navbar