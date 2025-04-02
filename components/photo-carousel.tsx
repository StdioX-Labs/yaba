"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define the carousel image type
type CarouselImage = {
  id: number
  src: string
  alt?: string
}

// Helper function to extract and format filename from path
function getFilenameFromPath(path: string): string {
  // Extract filename from path
  const filename = path.split("/").pop() || ""

  // For placeholder images, extract the text parameter if it exists
  if (filename.includes("placeholder.svg")) {
    const textMatch = path.match(/text=([^&]+)/)
    if (textMatch && textMatch[1]) {
      // URL decode the text parameter
      return decodeURIComponent(textMatch[1])
    }
  }

  // Remove file extension
  const nameWithoutExtension = filename.split(".")[0]

  // Replace hyphens and underscores with spaces
  const nameWithSpaces = nameWithoutExtension.replace(/[-_]/g, " ")

  // Capitalize each word
  return nameWithSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function PhotoCarousel({ images = [] }: { images?: CarouselImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    if (images.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    if (images.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying && images.length > 0) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current) return
      if (document.activeElement !== carouselRef.current && !carouselRef.current.contains(document.activeElement))
        return

      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === " ") {
        e.preventDefault()
        toggleAutoPlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, toggleAutoPlay])

  if (images.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl text-white">
            Performance Highlights
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
          <p className="max-w-[750px] text-lg text-white/80 sm:text-xl">
            Capturing the essence of artistic expression through visual moments.
          </p>
        </div>

        <div
          ref={carouselRef}
          className="relative mt-12 mx-auto max-w-5xl overflow-hidden rounded-xl shadow-2xl"
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Performance highlights carousel"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => {
              // Always use the filename as the caption, ignoring any provided alt text
              const caption = getFilenameFromPath(image.src)

              return (
                <div key={image.id} className="min-w-full" aria-hidden={currentIndex !== index}>
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={caption}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 to-black/0">
                      <p className="text-xl md:text-2xl font-medium text-white drop-shadow-md">{caption}</p>
                      <div className="w-16 h-0.5 bg-primary mt-2" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    currentIndex === index ? "h-3 w-12 bg-primary" : "h-3 w-3 bg-white/50 hover:bg-white/80",
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentIndex === index}
                />
              ))}
            </div>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
              onClick={toggleAutoPlay}
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-transform hover:scale-110"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-transform hover:scale-110"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">Press arrow keys to navigate or space to pause/play</p>
        </div>
      </div>
    </section>
  )
}

