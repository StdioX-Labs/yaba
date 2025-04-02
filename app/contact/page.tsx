import ContactForm from "@/components/contact-form"
import { SiteHeader } from "@/components/site-header"

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <div className="container max-w-5xl py-12 px-4 md:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Book a performance, request a song, or send a special enquiry
          </p>
        </div>
        <ContactForm />
      </div>
    </>
  )
}

