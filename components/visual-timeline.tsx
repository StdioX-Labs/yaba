import Image from "next/image"

const timelineEvents = [
  {
    id: 1,
    year: "2018",
    title: "First Album Release",
    description: "Debut album 'Beginnings' launched to critical acclaim",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    year: "2019",
    title: "World Tour",
    description: "First international tour across 15 countries",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    year: "2020",
    title: "Award Recognition",
    description: "Recipient of the Best New Artist award",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    year: "2021",
    title: "Collaboration Album",
    description: "Released 'Harmony' featuring various artists",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    year: "2022",
    title: "Symphony Performance",
    description: "Special performance with the National Symphony Orchestra",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    year: "2023",
    title: "Documentary Release",
    description: "Behind-the-scenes documentary 'The Journey'",
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Update the VisualTimeline component to accept timelineImages prop
export function VisualTimeline({ timelineImages = [] }: { timelineImages?: string[] }) {
  // Function to get image for a timeline event
  const getTimelineImage = (index: number) => {
    if (timelineImages.length > 0) {
      return timelineImages[index % timelineImages.length]
    }
    return timelineEvents[index].image
  }

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">Artistic Journey</h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            A visual timeline of milestones and memorable moments throughout the years.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border" />

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex flex-col items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="md:w-1/2" />

                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10 h-4 w-4 rounded-full bg-primary" />

                <div className="relative mt-6 md:mt-0 md:w-1/2 p-4">
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={getTimelineImage(index) || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <span className="inline-block rounded bg-primary px-2 py-1 text-sm font-bold">
                          {event.year}
                        </span>
                        <h3 className="mt-2 text-xl font-bold">{event.title}</h3>
                        <p className="text-sm text-white/80">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

