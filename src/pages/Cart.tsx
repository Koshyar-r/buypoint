import React from "react";
import { useCart } from "../context/CartContext";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LocationType {
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

interface CartProps {
  location: LocationType | null;
  getLocation: () => void;
}

const Cart: React.FC<CartProps> = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  // Total price (fixed floating point issue)
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * (item.quantity ?? 0),
    0
  );

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-foreground">
            My Cart ({cartItem.length})
          </h1>

          <div className="space-y-4">
            {cartItem.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <CardTitle className="line-clamp-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="font-semibold text-foreground">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(cartItem, item.id, "decrease")
                    }
                  >
                    -
                  </Button>

                  <span className="font-semibold text-foreground">
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(cartItem, item.id, "increase")
                    }
                  >
                    +
                  </Button>

                  <Button variant="ghost" onClick={() => deleteItem(item.id)}>
                    🗑️
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Delivery + Billing Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Delivery Info */}
            <Card className="space-y-4 p-6">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  Delivery Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input type="text" placeholder="Full Name" value={user?.fullName || ""} />
                <Input type="text" placeholder="Address" value={location?.county || ""} />

                <div className="grid grid-cols-2 gap-3">
                  <Input type="text" placeholder="State" value={location?.state || ""} />
                  <Input type="text" placeholder="Postcode" value={location?.postcode || ""} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input type="text" placeholder="Country" value={location?.country || ""} />
                  <Input type="text" placeholder="Phone No" />
                </div>

                <Button className="w-full">Submit</Button>
                <div className="text-center text-muted-foreground">--- OR ---</div>
                <Button className="w-full" onClick={getLocation}>
                  Detect Location
                </Button>
              </CardContent>
            </Card>

            {/* Billing Details */}
            <Card className="space-y-4 p-6">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  Bill Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="flex justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <IoDocumentTextOutline /> Items Total
                  </span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <MdDeliveryDining /> Delivery Charge
                  </span>
                  <span className="font-semibold text-muted-foreground line-through">
                    $25
                  </span>
                  <span className="font-semibold text-foreground">FREE</span>
                </div>

                <div className="flex justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <GiShoppingBag /> Handling Charge
                  </span>
                  <span className="font-semibold text-foreground">$5.00</span>
                </div>

                <hr className="border-muted-foreground" />

                <div className="flex justify-between font-semibold text-foreground text-lg">
                  <span>Grand Total</span>
                  <span>${(totalPrice + 5).toFixed(2)}</span>
                </div>

                <Input type="text" placeholder="Enter Promo Code" />
                <Button className="w-full">Apply</Button>

                <Button className="w-full mt-3">Proceed to Checkout</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[600px] gap-4">
          <h1 className="text-foreground font-bold text-4xl text-center">
            Your Cart is Empty 😢
          </h1>
          <img src={emptyCart} alt="Empty Cart" className="w-64" />
          <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
        </div>
      )}
    </div>
  );
};

export default Cart