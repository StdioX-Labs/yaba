import Link from "next/link"
import { ArrowRight, Calendar, Mail, Mic } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnquiryForm } from "@/components/enquiry-form"
import { SocialFeed } from "@/components/social-feed"
import { ShowsList } from "@/components/shows-list"
import { HeroSection } from "@/components/hero-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

import { GallerySection } from "@/components/gallery-section"
import { VisualTimeline } from "@/components/visual-timeline"
import { Testimonials } from "@/components/testimonials"
import { PhotoCarousel } from "@/components/photo-carousel"
import { AboutSection } from "@/components/about-section"
import { MerchandiseStore } from "@/components/merchandise-store"

// Import server actions
import {
  getGalleryImages,
  getCarouselImages,
  getShowImages,
  getTimelineImages,
  getAboutImages,
  getSocialImages,
  getTestimonialImages,
  getMerchandiseImages,
} from "./actions"

// Default gallery images for fallback
const defaultGalleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Performance at Summer Festival",
    category: "live",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Studio recording session",
    category: "studio",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Backstage preparation",
    category: "backstage",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=800&width=800",
    alt: "Album cover photoshoot",
    category: "photoshoot",
  },
]

// Default carousel images for fallback
const defaultCarouselImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=800&width=1600&text=Performance",
    alt: "Live performance at Madison Square Garden",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=800&width=1600&text=Studio",
    alt: "Recording session for the new album",
  },
]

// Make the Home component async to fetch images
export default async function Home() {
  // Fetch all images
  const galleryImages = (await getGalleryImages()) || defaultGalleryImages
  const carouselImages = (await getCarouselImages()) || defaultCarouselImages
  const showImages = (await getShowImages()) || []
  const timelineImages = (await getTimelineImages()) || []
  const aboutImages = (await getAboutImages()) || []
  const socialImages = (await getSocialImages()) || []
  const testimonialImages = (await getTestimonialImages()) || []
  const merchandiseImages = (await getMerchandiseImages()) || []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-24 lg:py-32" id="shows">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Experience the Art of Performance
            </h2>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Immerse yourself in a world of artistic expression, where every performance tells a story and every moment
              creates a memory.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <Tabs defaultValue="upcoming" className="w-full" >
              <div className="flex items-center justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="upcoming">
                    <Calendar className="mr-2 h-4 w-4" />
                    Shows
                  </TabsTrigger>
                  <TabsTrigger value="social">
                    <Mic className="mr-2 h-4 w-4" />
                    Updates
                  </TabsTrigger>
                  <TabsTrigger value="contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="upcoming" className="mt-8" >
                <ShowsList showImages={showImages} />
              </TabsContent>
              <TabsContent value="social" className="mt-8">
                <SocialFeed socialImages={socialImages} />
              </TabsContent>
              <TabsContent value="contact" className="mt-8" id="contact">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Get in Touch</CardTitle>
                    <CardDescription>
                      Fill out the form below for bookings, collaborations, or any other inquiries.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EnquiryForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <PhotoCarousel images={carouselImages} />

        <AboutSection aboutImages={aboutImages} />

        <GallerySection images={galleryImages} />

        <MerchandiseStore merchandiseImages={merchandiseImages} />

        <VisualTimeline timelineImages={timelineImages} />

        <Testimonials testimonialImages={testimonialImages} />

        <section className="bg-muted/50 py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">Join the Journey</h2>
              <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                Stay connected and be part of the artistic journey. Follow on social media for exclusive content and
                updates.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="#" className="gap-1">
                    Book a Show
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#" className="gap-1">
                    Join Newsletter
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

