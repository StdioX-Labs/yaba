import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnquiryForm } from "@/components/enquiry-form"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Get in Touch
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Reach out for bookings, collaborations, press inquiries, or any questions you may have.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/" className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Form</CardTitle>
                <CardDescription>
                  Fill out the form below for bookings, collaborations, or any other inquiries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnquiryForm />
              </CardContent>
            </Card>
            
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <h3 className="mb-2 text-lg font-bold">Bookings</h3>
                <p className="text-muted-foreground">For performance inquiries and scheduling</p>
                <p className="mt-2 font-medium">bookings@yaba.com</p>
              </div>
              
              <div className="text-center">
                <h3 className="mb-2 text-lg font-bold">Press</h3>
                <p className="text-muted-foreground">For media and interview requests</p>
                <p className="mt-2 font-medium">press@yaba.com</p>
              </div>
              
              <div className="text-center">
                <h3 className="mb-2 text-lg font-bold">General</h3>
                <p className="text-muted-foreground">For all other inquiries</p>
                <p className="mt-2 font-medium">info@yaba.com</p>
              </div>
            </div>
            
            <div className="mt-16 text-center ">
              <h2 className="mb-6 text-2xl font-bold">Follow YABA</h2>
              <div className="flex justify-center space-x-6">
                <Link href="#" className="text-foreground hover:text-primary">Instagram</Link>
                <Link href="#" className="text-foreground hover:text-primary">Twitter</Link>
                <Link href="#" className="text-foreground hover:text-primary">Facebook</Link>
                <Link href="#" className="text-foreground hover:text-primary">YouTube</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}