import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const Contact = () => {
  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-6xl space-y-10">

        {/* --- Hero Section --- */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Reach Out to <span className="text-primary">BuyPoint</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Whether it’s support, feedback, or just a quick question — we’ve got you covered.
          </p>
        </div>

        {/* --- Contact Cards & Form --- */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Info Card */}
          <Card className="bg-background/70 border border-border shadow-md">
            <CardHeader>
              <CardTitle>Contact Info</CardTitle>
              <CardDescription>
                Reach out to us anytime — we’re ready to assist you with your tech needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground">
              <p><strong>📍 Address:</strong> 123 Tech Lane, Kolkata, India</p>
              <p><strong>📧 Email:</strong> support@zaptro.com</p>
              <p><strong>📞 Phone:</strong> +91 98765 43210</p>
            </CardContent>
          </Card>

          {/* Form Card */}
          <Card className="bg-background/70 border border-border shadow-md">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and our team will get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name</label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Your Message</label>
                  <Textarea id="message" placeholder="Type your message..." rows={5} />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Send Message 🚀
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Contact