import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import heroImage from "../assets/banner.jpg"

const About = () => {
  return (
    <div className="min-h-screen bg-muted/40 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-14">
        
        {/* --- Hero Section --- */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            About <span className="text-primary">BuyPoint</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Your go-to shop for great finds, everyday essentials, and a smooth shopping experience.
          </p>

          {/* Hero Image */}
          <div className="mt-6">
            <img
              src={heroImage}
              alt="About Zaptro"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* --- Mission Section --- */}
        <Card className="shadow-lg border-none">
          <CardContent className="p-8 md:p-10 space-y-6">
            <Badge className="w-fit bg-primary text-primary-foreground">Our Mission</Badge>
            <h2 className="text-2xl font-semibold text-foreground">Made for Everyone</h2>
            <p className="text-muted-foreground leading-relaxed">
              At BuyPoint, we’re here to simplify your life. Whether you’re a hobbyist, a busy professional, or someone who just loves discovering convenient products, we handpick items that offer quality, value, and reliability. Shopping with us means less stress and more satisfaction.
            </p>
          </CardContent>
        </Card>

        {/* --- Why Choose Us Section --- */}
        <div>
          <Badge className="bg-primary text-primary-foreground">Why Choose Us</Badge>
          <h2 className="text-3xl font-bold mt-4 text-foreground">Why Customers Love Zaptro</h2>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">Top-Quality Products</h3>
                <p className="text-muted-foreground">
                  We bring you authentic, premium-grade electronics from trusted brands across the world.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">Fast & Secure Shipping</h3>
                <p className="text-muted-foreground">
                  Your orders are shipped with care and reach you with guaranteed speed and safety.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">Reliable Support Team</h3>
                <p className="text-muted-foreground">
                  Our customer support team is always ready to assist you before and after your purchase.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">Easy Returns</h3>
                <p className="text-muted-foreground">
                  Hassle-free returns ensure your shopping experience is straightforward and enjoyable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* --- Vision Section --- */}
        <Card className="shadow-lg border-none">
          <CardContent className="p-8 md:p-10 space-y-6">
            <Badge className="w-fit bg-primary text-primary-foreground">Our Vision</Badge>
            <h2 className="text-2xl font-semibold text-foreground">Bringing Better Living to Your Doorstep</h2>
            <p className="text-muted-foreground leading-relaxed">
              We aim to build a place where smart, useful products are easy to find and even easier to love. BuyPoint is dedicated to exploring fresh ideas and delivering items that fit seamlessly into your lifestyle.
            </p>
          </CardContent>
        </Card>

        {/* --- CTA Section --- */}
        <div className="text-center space-y-5 mt-10">
          <h3 className="text-2xl font-semibold text-foreground">Join the BuyPoint Family</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover a world of smart, useful products designed to upgrade your everyday life.
          </p>

          <Link to="/products">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About