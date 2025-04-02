"use server"

import { getImagesFromPublicFolder } from "@/utils/server-image-utils"


// Helper function to format camelCase to Title Case with spaces
function formatCamelCase(text: string): string {
  // Add space before capital letters and capitalize the first letter
  const withSpaces = text.replace(/([A-Z])/g, " $1").trim()
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}

// Helper function to extract category from filename (part before underscore)
function getCategoryFromFilename(path: string): string {
  // Extract filename from path (without directory)
  const filename = path.split("/").pop() || ""

  // Remove file extension
  const nameWithoutExtension = filename.split(".")[0]

  // Get the part before underscore if it exists
  const parts = nameWithoutExtension.split("_")
  const categoryPart = parts[0]

  // Format the category for display
  return formatCamelCase(categoryPart)
}

// Gallery images
export async function getGalleryImages() {
  const images = await getImagesFromPublicFolder("images/gallery")

  // If no images found, return empty array
  if (images.length === 0) {
    return []
  }

  // Map the images to the expected format with dynamic categories
  return images.map((src, index) => {
    // Extract category from filename
    const category = getCategoryFromFilename(src)

    return {
      id: index + 1,
      src,
      category,
    }
  })
}

// Carousel images
export async function getCarouselImages() {
  const images = await getImagesFromPublicFolder("images/carousel")

  if (images.length === 0) {
    return []
  }

  return images.map((src, index) => ({
    id: index + 1,
    src,
    alt: `Carousel image ${index + 1}`,
  }))
}

// Show images
export async function getShowImages() {
  const images = await getImagesFromPublicFolder("images/shows")
  return images
}

// Timeline images
export async function getTimelineImages() {
  const images = await getImagesFromPublicFolder("images/timeline")
  return images
}

// About images
export async function getAboutImages() {
  const images = await getImagesFromPublicFolder("images/about")
  return images
}

// Social images
export async function getSocialImages() {
  const images = await getImagesFromPublicFolder("images/social")
  return images
}

// Testimonial images
export async function getTestimonialImages() {
  const images = await getImagesFromPublicFolder("images/testimonials")
  return images
}

// Merchandise images
export async function getMerchandiseImages() {
  const images = await getImagesFromPublicFolder("images/merchandise")
  return images
}

