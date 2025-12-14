import {
  UserButton,
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "@/components/ui/button";
import type { LocationType } from "./LocationPicker";

interface ResponsiveMenuProps {
  openNav: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
  location: LocationType | null;
  getLocation: () => void;
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({
  openNav,
  setOpenNav,
}) => {
  const { user } = useUser();

  return (
    <div
      className={`
        fixed top-0 bottom-0 z-9999 w-[75%] md:hidden 
        bg-background text-foreground shadow-xl rounded-r-2xl
        px-8 pb-6 pt-16
        transition-all duration-300 ease-in-out
        ${openNav ? "left-0" : "-left-full"}
      `}
    >
      {/* Close Button */}
      <button
        onClick={() => setOpenNav(false)}
        className="
          absolute top-4 right-4 
          text-foreground hover:text-primary
          transition-all
        "
      >
        <HiX size={28} />
      </button>

      <div>
        {/* User Info */}
        <div className="flex flex-col gap-3 mt-4">
          <SignedIn>
            <div className="flex items-center justify-start gap-3">
              <UserButton />
              <div>
                <h1 className="font-semibold">
                  Hello, {user?.firstName ?? "user"}
                </h1>
                <h1 className="text-sm text-muted-foreground">
                  Premium User
                </h1>
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FaUserCircle size={50} />
                <div>
                  <h1 className="font-semibold">Welcome, guest</h1>
                  <h1 className="text-sm text-muted-foreground">
                    Please sign in to continue
                  </h1>
                </div>
              </div>

              <SignInButton>
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>

        {/* Nav Links */}
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-xl font-semibold">
            <Link
              to="/"
              onClick={() => setOpenNav(false)}
              className="cursor-pointer hover:text-primary"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setOpenNav(false)}
              className="cursor-pointer hover:text-primary"
            >
              Products
            </Link>

            <Link
              to="/about"
              onClick={() => setOpenNav(false)}
              className="cursor-pointer hover:text-primary"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setOpenNav(false)}
              className="cursor-pointer hover:text-primary"
            >
              Contact
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;