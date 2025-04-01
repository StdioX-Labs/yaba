import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

// Update the AboutSection component to accept aboutImages prop
export function AboutSection({ aboutImages = [] }: { aboutImages?: string[] }) {
  // Function to get image for about section
  const getAboutImage = (index: number) => {
    if (aboutImages.length > 0) {
      return aboutImages[index % aboutImages.length]
    }

    // Default placeholder images
    const placeholders = [
      "/placeholder.svg?height=600&width=400&text=Portrait",
      "/placeholder.svg?height=400&width=400&text=Studio",
      "/placeholder.svg?height=400&width=400&text=Performance",
      "/placeholder.svg?height=600&width=400&text=Stage",
    ]

    return placeholders[index]
  }

  return (
    <section id="about" className="py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">About YABA</h2>
            <p className="text-lg text-muted-foreground">
              YABA is a multifaceted performing artist known for pushing boundaries and creating immersive experiences
              through music, movement, and visual art.
            </p>
            <p className="text-muted-foreground">
              With a background spanning classical training and experimental techniques, YABA's performances blend
              tradition with innovation, creating a unique artistic signature that resonates with audiences worldwide.
            </p>
            <p className="text-muted-foreground">
              Having performed across five continents and collaborated with renowned artists and orchestras, YABA
              continues to explore new artistic territories while maintaining a deep connection with audiences through
              authentic expression.
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link href="/contact" className="gap-1">
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={getAboutImage(0) || "/placeholder.svg"}
                  alt="YABA portrait"
                  width={400}
                  height={600}
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={getAboutImage(1) || "/placeholder.svg"}
                  alt="YABA in the studio"
                  width={400}
                  height={400}
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={getAboutImage(2) || "/placeholder.svg"}
                  alt="YABA performing"
                  width={400}
                  height={400}
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={getAboutImage(3) || "/placeholder.svg"}
                  alt="YABA on stage"
                  width={400}
                  height={600}
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

