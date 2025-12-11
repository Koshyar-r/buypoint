// src/App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import CategoryProduct from "./pages/CategoryProduct";
import { useCart } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import type { LocationType } from "./components/LocationPicker";

const App = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const { cartItem, setCartItem } = useCart();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const res = await axios.get(url);
        const address = res.data.address;

        const exactLocation: LocationType = {
          county: address.county ?? "",
          state: address.state ?? "",
          label:
            res.data.display_name ??
            `${address.county ?? ""} ${address.state ?? ""}`.trim(),
        };

        setLocation(exactLocation);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
  }, [setCartItem]);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/category/:category" element={<CategoryProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart location={location} getLocation={getLocation} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;