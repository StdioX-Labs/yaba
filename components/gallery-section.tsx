"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"

// Define the gallery image type
type GalleryImage = {
  id: number
  src: string
  alt?: string
  category?: string
}

// Helper function to format camelCase to Title Case with spaces
function formatCamelCase(text: string): string {
  // Add space before capital letters and capitalize the first letter
  const withSpaces = text.replace(/([A-Z])/g, " $1").trim()
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}

// Helper function to add spaces between letters and numbers
function addSpacesBetweenLettersAndNumbers(text: string): string {
  return text.replace(/([a-zA-Z])(\d)/g, "$1 $2").replace(/(\d)([a-zA-Z])/g, "$1 $2")
}

// Helper function to extract caption from filename (part after underscore)
function getCaptionFromFilename(path: string): string {
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

  // Get the part after underscore if it exists
  const parts = nameWithoutExtension.split("_")
  if (parts.length > 1) {
    // Format the caption (part after underscore)
    const rawCaption = parts[1]
    // First convert camelCase to spaces
    const camelCaseFormatted = formatCamelCase(rawCaption)
    // Then add spaces between letters and numbers
    return addSpacesBetweenLettersAndNumbers(camelCaseFormatted)
  }

  // If no underscore, use the whole filename
  const camelCaseFormatted = formatCamelCase(nameWithoutExtension)
  return addSpacesBetweenLettersAndNumbers(camelCaseFormatted)
}

// Helper function to extract and format category from filename (part before underscore)
function getCategoryFromFilename(path: string): string {
  // Extract filename from path
  const filename = path.split("/").pop() || ""

  // For placeholder images with category in text parameter
  if (filename.includes("placeholder.svg")) {
    const textMatch = path.match(/text=([^&]+)/)
    if (textMatch && textMatch[1]) {
      const text = decodeURIComponent(textMatch[1])
      // Try to extract category from text
      const firstPart = text.split(" ")[0]
      return formatCamelCase(firstPart)
    }
  }

  // Remove file extension
  const nameWithoutExtension = filename.split(".")[0]

  // Get the part before underscore
  const parts = nameWithoutExtension.split("_")
  const categoryPart = parts[0]

  // Format the category for display
  return formatCamelCase(categoryPart)
}

// Process an image to add category and formatted caption
function processImage(image: GalleryImage): GalleryImage & { formattedCaption: string } {
  const category = image.category || getCategoryFromFilename(image.src)
  const formattedCaption = getCaptionFromFilename(image.src)

  return {
    ...image,
    category,
    formattedCaption,
  }
}

// Update the GallerySection component to use the server data
export function GallerySection({ images = [] }: { images?: GalleryImage[] }) {
  // Process images to ensure they all have categories and formatted captions
  const processedImages = useMemo(() => {
    return images.map(processImage)
  }, [images])

  // Extract unique categories from processed images
  const uniqueCategories = useMemo(() => {
    const categories = processedImages.map((img) => img.category)
    return [...new Set(categories)].sort()
  }, [processedImages])

  // Set initial selected category to the first available category
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Set initial category when component mounts or categories change
  useEffect(() => {
    if (uniqueCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(uniqueCategories[0] || '')
    }
  }, [uniqueCategories, selectedCategory])

  // Filter images by selected category
  const filteredImages = useMemo(() => {
    if (!selectedCategory) return processedImages
    return processedImages.filter((img) => img.category === selectedCategory)
  }, [processedImages, selectedCategory])

  return (
    <section id="gallery" className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Visual Journey
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Explore moments captured throughout performances, studio sessions, and artistic collaborations.
          </p>
        </div>

        {uniqueCategories.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {uniqueCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category || '')}
                className="m-1"
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => setSelectedImage(image.id)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.formattedCaption}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-md">
                  <p className="text-center text-white font-medium">{image.formattedCaption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            {selectedImage && (
              <>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  {(() => {
                    const selectedImageData = processedImages.find((img) => img.id === selectedImage)
                    if (!selectedImageData) return null

                    return (
                      <Image
                        src={selectedImageData.src || ""}
                        alt={selectedImageData.formattedCaption}
                        fill
                        className="object-contain"
                      />
                    )
                  })()}
                </div>
                <div className="text-center mt-2">
                  {(() => {
                    const selectedImageData = processedImages.find((img) => img.id === selectedImage)
                    if (!selectedImageData) return null

                    return (
                      <div className="space-y-1">
                        <p className="text-lg font-medium">{selectedImageData.formattedCaption}</p>
                        <p className="text-sm text-muted-foreground">Category: {selectedImageData.category}</p>
                      </div>
                    )
                  })()}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

