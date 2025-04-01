"use server"

import { getImagesFromPublicFolder } from "@/utils/server-image-utils"

// Gallery images
export async function getGalleryImages() {
  const images = await getImagesFromPublicFolder("images/gallery")

  // If no images found, return empty array
  if (images.length === 0) {
    return []
  }

  // Map the images to the expected format
  return images.map((src, index) => ({
    id: index + 1,
    src,
    alt: `Gallery image ${index + 1}`,
    category: ["live", "studio", "backstage", "photoshoot", "press"][index % 5],
  }))
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

