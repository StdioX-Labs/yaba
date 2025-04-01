"use client"

import { useState } from "react"
import { CalendarDays, MapPin, Clock, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { TicketCheckout } from "@/components/ticket-checkout"

const upcomingShows = [
  {
    id: 1,
    title: "Summer Solstice Festival",
    date: "June 21, 2025",
    time: "8:00 PM",
    location: "Central Park Amphitheater, Nairobi",
    description: "A magical evening performance celebrating the summer solstice with special guest artists.",
    ticketLink: "#",
    isSoldOut: false,
    price: 7800, // KES price
  },
  {
    id: 2,
    title: "Moonlight Sonata",
    date: "July 15, 2025",
    time: "9:30 PM",
    location: "Riverside Theater, Nairobi",
    description: "An intimate acoustic performance under the stars with a full orchestra accompaniment.",
    ticketLink: "#",
    isSoldOut: false,
    price: 6500, // KES price
  },
  {
    id: 3,
    title: "Autumn Rhythms Tour",
    date: "September 5, 2025",
    time: "7:00 PM",
    location: "Grand Concert Hall, Mombasa",
    description: "The opening night of the nationwide Autumn Rhythms tour featuring new material.",
    ticketLink: "#",
    isSoldOut: true,
    price: 9100, // KES price
  },
  {
    id: 4,
    title: "Winter Wonderland",
    date: "December 12, 2025",
    time: "6:30 PM",
    location: "Symphony Hall, Kisumu",
    description: "A festive celebration with holiday classics reimagined in a unique artistic style.",
    ticketLink: "#",
    isSoldOut: false,
    price: 7150, // KES price
  },
]

// Update the ShowsList component to accept showImages prop
export function ShowsList({ showImages = [] }: { showImages?: string[] }) {
  const [selectedShow, setSelectedShow] = useState<number | null>(null)

  // Function to get image for a show
  const getShowImage = (index: number) => {
    if (showImages.length > 0) {
      return showImages[index % showImages.length]
    }
    return `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(upcomingShows[index].title)}`
  }

  // Handle ticket purchase
  const handleTicketPurchase = (showId: number) => {
    setSelectedShow(showId)
  }

  // Close ticket dialog
  const closeTicketDialog = () => {
    setSelectedShow(null)
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {upcomingShows.map((show, index) => (
          <Card key={show.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={getShowImage(index) || "/placeholder.svg"}
                alt={show.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">{show.title}</h3>
                <div className="flex items-center gap-1 text-white/80">
                  <CalendarDays className="h-4 w-4" />
                  <span>{show.date}</span>
                </div>
              </div>
              {show.isSoldOut ? (
                <div className="absolute right-4 top-4">
                  <Badge variant="destructive">Sold Out</Badge>
                </div>
              ) : (
                <div className="absolute right-4 top-4">
                  <Badge>Available</Badge>
                </div>
              )}
            </div>
            <CardContent className="pb-3 pt-4">
              <div className="grid gap-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span>{show.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span>{show.time}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{show.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={show.isSoldOut ? "outline" : "default"}
                disabled={show.isSoldOut}
                onClick={() => !show.isSoldOut && handleTicketPurchase(show.id)}
              >
                {show.isSoldOut ? "Sold Out" : "Get Tickets"}
                {!show.isSoldOut && <ExternalLink className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Ticket Checkout Dialog */}
      <Dialog open={selectedShow !== null} onOpenChange={(open) => !open && setSelectedShow(null)}>
        <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
          {selectedShow && (
            <TicketCheckout
              show={upcomingShows.find((show) => show.id === selectedShow)!}
              onClose={closeTicketDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

