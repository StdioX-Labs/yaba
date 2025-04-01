"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="relative h-[90vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center text-white">
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">YABA</h1>
              <p className="mt-4 text-lg sm:text-xl md:text-2xl">Prince Of Rhumbacane</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {/* Video background option - uncomment to use */}
        {/* <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-70"
        >
          <source src="/images/hero/hero-video.mp4" type="video/mp4" />
        </video> */}

        {/* Image background */}
        <Image
          src="/images/hero/yaba_image_13.JPG"
          alt="YABA performing on stage"
          fill
          quality={100}
          sizes="100vw"
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              YABA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-lg sm:text-xl md:text-2xl"
            >
              Where Music Meets Magic | Prince Of Rhumbacane
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 shadow-lg min-w-[160px] text-lg"
              >
                <Link href="#shows">Experience Live</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-2 border-white text-white hover:bg-white/30 shadow-lg min-w-[160px] text-lg font-medium"
              >
                <Link href="/contact">Connect With Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

