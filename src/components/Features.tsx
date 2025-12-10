import { Card, CardContent } from "@/components/ui/card";
import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    text: "Free Shipping",
    subtext: "On orders over $100",
  },
  {
    icon: ShieldCheck,
    text: "Secure Payment",
    subtext: "100% protected payments",
  },
  {
    icon: RefreshCw,
    text: "Easy Returns",
    subtext: "30-day return policy",
  },
  {
    icon: Headphones,
    text: "24/7 Support",
    subtext: "Dedicated customer service",
  },
];

const Features = () => {
  return (
    <div className="bg-muted py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Card
              key={i}
              className="transition hover:shadow-lg hover:bg-accent"
            >
              <CardContent className="p-5 flex items-center space-x-6">
                <Icon className="h-10 w-10 text-primary" />

                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {feature.text}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {feature.subtext}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Features