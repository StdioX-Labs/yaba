"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Plus, Minus, X, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MerchandiseCheckout } from "@/components/merchandise-checkout"

// Product type definition
type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  variants?: string[]
  isNew?: boolean
  isBestseller?: boolean
}

// Cart item type definition
type CartItem = {
  product: Product
  quantity: number
  variant: string
}

// Default products
const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Tour T-Shirt",
    description: "Official YABA world tour t-shirt featuring artwork from the latest album.",
    price: 3900,
    image: "/placeholder.svg?height=500&width=500&text=T-Shirt",
    category: "clothing",
    variants: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
  },
  {
    id: 2,
    name: "Vinyl Record",
    description: "Limited edition vinyl pressing with exclusive artwork and bonus tracks.",
    price: 4550,
    image: "/placeholder.svg?height=500&width=500&text=Vinyl",
    category: "music",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Concert Poster",
    description: "High-quality print of the iconic concert poster, perfect for framing.",
    price: 3250,
    image: "/placeholder.svg?height=500&width=500&text=Poster",
    category: "accessories",
  },
  {
    id: 4,
    name: "Hoodie",
    description: "Comfortable hoodie with embroidered logo, perfect for cooler evenings.",
    price: 6500,
    image: "/placeholder.svg?height=500&width=500&text=Hoodie",
    category: "clothing",
    variants: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Digital Album",
    description: "Download the latest album in high-resolution audio formats.",
    price: 1300,
    image: "/placeholder.svg?height=500&width=500&text=Digital",
    category: "music",
  },
  {
    id: 6,
    name: "Tote Bag",
    description: "Eco-friendly canvas tote bag featuring unique YABA artwork.",
    price: 2600,
    image: "/placeholder.svg?height=500&width=500&text=Tote",
    category: "accessories",
    isNew: true,
  },
  {
    id: 7,
    name: "Beanie",
    description: "Stylish and warm beanie with embroidered logo.",
    price: 3000,
    image: "/placeholder.svg?height=500&width=500&text=Beanie",
    category: "clothing",
    variants: ["One Size"],
  },
  {
    id: 8,
    name: "Signed Photo Print",
    description: "Exclusive signed photo print from the latest photoshoot.",
    price: 5200,
    image: "/placeholder.svg?height=500&width=500&text=Photo",
    category: "accessories",
    isBestseller: true,
  },
]

export function MerchandiseStore({
  merchandiseImages = [],
}: {
  merchandiseImages?: string[]
}) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Function to get image for a product
  const getProductImage = (index: number) => {
    if (merchandiseImages.length > 0) {
      return merchandiseImages[index % merchandiseImages.length]
    }
    return defaultProducts[index].image
  }

  // Update products with dynamic images
  const products = defaultProducts.map((product, index) => ({
    ...product,
    image: getProductImage(index),
  }))

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  // Add to cart function
  const addToCart = (product: Product, variant = "") => {
    setCart((prevCart) => {
      // Check if product already in cart with same variant
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id && item.variant === variant)

      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        return updatedCart
      } else {
        // Add new item to cart
        return [...prevCart, { product, quantity: 1, variant }]
      }
    })

    // Open cart when adding items
    setIsCartOpen(true)
  }

  // Remove from cart function
  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index))
  }

  // Update quantity function
  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCart((prevCart) => {
      const updatedCart = [...prevCart]
      updatedCart[index].quantity = newQuantity
      return updatedCart
    })
  }

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  // Handle checkout
  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  // Handle checkout completion
  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false)
    setCart([])
  }

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Products" },
    { id: "clothing", name: "Clothing" },
    { id: "music", name: "Music" },
    { id: "accessories", name: "Accessories" },
  ]

  return (
    <section id="merchandise" className="py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            Official Merchandise
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Take home a piece of the experience with official YABA merchandise.
          </p>
        </div>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="m-1"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {product.isNew && (
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-primary">New</Badge>
                  </div>
                )}
                {product.isBestseller && (
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-amber-500">Bestseller</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="font-bold">KES {product.price.toLocaleString()}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                {product.variants && (
                  <div className="mt-3">
                    <Select onValueChange={(value) => addToCart(product, value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.variants.map((variant) => (
                          <SelectItem key={variant} value={variant}>
                            {variant}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                {!product.variants ? (
                  <Button onClick={() => addToCart(product)} className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                ) : (
                  <p className="w-full text-center text-sm text-muted-foreground">Select a size above</p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Shopping Cart */}
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg">
              <ShoppingBag className="h-6 w-6" />
              {cart.length > 0 && (
                <Badge className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full p-0">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>

            {cart.length === 0 ? (
              <div className="flex h-[50vh] flex-col items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-center text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-4">
                {cart.map((item, index) => (
                  <div key={`${item.product.id}-${item.variant}`} className="flex items-center gap-4 border-b pb-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      {item.variant && <p className="text-xs text-muted-foreground">Size: {item.variant}</p>}
                      <p className="text-sm">KES {item.product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-sm font-medium">KES {(item.product.price * item.quantity).toLocaleString()}</p>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="mt-4 flex justify-between border-t pt-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">KES {cartTotal.toLocaleString()}</span>
                </div>

                <Button onClick={handleCheckout} className="mt-4">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Checkout Dialog */}
        <Dialog open={isCheckoutOpen} onOpenChange={(open) => !open && setIsCheckoutOpen(false)}>
          <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
            <MerchandiseCheckout
              cart={cart}
              onClose={() => setIsCheckoutOpen(false)}
              onComplete={handleCheckoutComplete}
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

