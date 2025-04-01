import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-xl font-bold">YABA</h3>
            <p className="text-sm text-muted-foreground">
              Bringing artistic performances to life, creating unforgettable experiences for audiences worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Links</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Home
                </Link>
                <Link href="#shows" className="text-sm text-muted-foreground hover:text-foreground">
                  Shows
                </Link>
                <Link href="#gallery" className="text-sm text-muted-foreground hover:text-foreground">
                  Gallery
                </Link>
                <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Contact</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Enquiries
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Bookings
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Press
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Newsletter
                </Link>
              </nav>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Follow</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Subscribe to our newsletter for exclusive updates and behind-the-scenes content.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} YABA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

