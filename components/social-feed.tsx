import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Share2 } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const socialPosts = [
  {
    id: 1,
    platform: "Instagram",
    content:
      "Excited to announce new tour dates for the summer! Check out the Shows section for more details. Can't wait to see you all there! #NewTour #LiveMusic",
    date: "2 days ago",
    likes: 1243,
    comments: 89,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    platform: "Twitter",
    content:
      "Just finished recording a new track with @amazingproducer. Can't wait for you all to hear it! #NewMusic #ComingSoon",
    date: "5 days ago",
    likes: 876,
    comments: 42,
    image: null,
  },
  {
    id: 3,
    platform: "Instagram",
    content:
      "Behind the scenes from yesterday's photoshoot for the upcoming album cover. Special thanks to @photographername for the amazing work!",
    date: "1 week ago",
    likes: 2105,
    comments: 134,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    platform: "Twitter",
    content:
      "Just announced! I'll be performing at @festivalnameofficial this year! Tickets on sale now - link in bio. #FestivalSeason",
    date: "2 weeks ago",
    likes: 1532,
    comments: 67,
    image: null,
  },
]

// Update the SocialFeed component to accept socialImages prop
export function SocialFeed({ socialImages = [] }: { socialImages?: string[] }) {
  // Function to get image for a social post
  const getSocialImage = (index: number) => {
    if (socialImages.length > 0 && socialPosts[index].image) {
      return socialImages[index % socialImages.length]
    }
    return socialPosts[index].image
  }

  return (
    <div className="grid gap-6">
      {socialPosts.map((post, index) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="YABA" />
                <AvatarFallback>YB</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">YABA</span>
                <span className="text-xs text-muted-foreground">
                  {post.platform} • {post.date}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm">{post.content}</p>
            {post.image && (
              <div className="mt-3 overflow-hidden rounded-md">
                <Image
                  src={getSocialImage(index) || "/placeholder.svg"}
                  alt="Social media post image"
                  width={500}
                  height={500}
                  className="aspect-square object-cover transition-all hover:scale-105"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-3">
            <div className="flex w-full justify-between text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
      <div className="text-center">
        <Button asChild variant="outline">
          <Link href="#">View More Updates</Link>
        </Button>
      </div>
    </div>
  )
}

