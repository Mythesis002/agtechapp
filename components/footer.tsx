import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary">AgTech Solutions</h3>
          <p className="text-sm text-muted-foreground">
            Your trusted partner for all agricultural needs. Quality products for better farming.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="text-sm hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-sm hover:text-primary">
                Farming Tips
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-semibold">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="text-sm hover:text-primary">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-sm hover:text-primary">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/returns" className="text-sm hover:text-primary">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm hover:text-primary">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-semibold">Newsletter</h4>
          <p className="text-sm text-muted-foreground">
            Subscribe to receive updates on new products and farming tips.
          </p>
          <div className="flex">
            <Input type="email" placeholder="Your email" className="rounded-r-none" />
            <Button className="rounded-l-none">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-sm text-center text-muted-foreground">
          © {new Date().getFullYear()} AgTech Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

