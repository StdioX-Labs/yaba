import Image from "next/image"
import { Quote } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    quote:
      "One of the most captivating performances I've witnessed in years. YABA brings a unique energy to the stage that's simply mesmerizing.",
    author: "Music Weekly",
    authorRole: "Magazine",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    quote:
      "The artistic vision and execution in YABA's latest album is nothing short of brilliant. A true innovator in the contemporary scene.",
    author: "Sarah Johnson",
    authorRole: "Music Critic",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    quote:
      "Working with YABA was an incredible experience. The level of professionalism and creative input transformed our collaboration.",
    author: "Michael Chen",
    authorRole: "Producer",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function Testimonials({ testimonialImages = [] }: { testimonialImages?: string[] }) {
  // Function to get image for a testimonial
  const getTestimonialImage = (index: number) => {
    if (testimonialImages.length > 0) {
      return testimonialImages[index % testimonialImages.length]
    }
    return testimonials[index].image
  }

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">Voices & Reviews</h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            What critics, collaborators, and audiences are saying.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/40" />
                <p className="mt-4 text-lg italic">{testimonial.quote}</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={getTestimonialImage(index) || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.authorRole}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

