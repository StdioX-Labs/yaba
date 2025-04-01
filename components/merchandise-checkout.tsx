"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, User, Mail, Phone, MapPin, Check, Truck, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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

// Shipping method type
type ShippingMethod = {
  id: string
  name: string
  price: number
  estimatedDelivery: string
}

// Props type definition
type MerchandiseCheckoutProps = {
  cart: CartItem[]
  onClose: () => void
  onComplete: () => void
}

export function MerchandiseCheckout({ cart, onClose, onComplete }: MerchandiseCheckoutProps) {
  const [activeStep, setActiveStep] = useState("shipping")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [shippingMethod, setShippingMethod] = useState<string>("standard")

  // Shipping methods
  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 5.99,
      estimatedDelivery: "5-7 business days",
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 12.99,
      estimatedDelivery: "2-3 business days",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      price: 24.99,
      estimatedDelivery: "Next business day",
    },
  ]

  // Get selected shipping method
  const getSelectedShipping = () => {
    return shippingMethods.find((method) => method.id === shippingMethod) || shippingMethods[0]
  }

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shippingCost = getSelectedShipping().price
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shippingCost + tax

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeStep === "shipping") {
      setActiveStep("payment")
    } else if (activeStep === "payment") {
      setIsProcessing(true)

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)
      }, 2000)
    }
  }

  // Handle completion
  const handleComplete = () => {
    onComplete()
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="container py-8">
        {!isComplete ? (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center">
                <Button variant="ghost" size="sm" onClick={onClose} className="mr-2">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="ml-1">Back</span>
                </Button>
                <h1 className="text-2xl font-bold">Checkout</h1>
              </div>

              <Tabs value={activeStep} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="shipping" disabled={activeStep !== "shipping"}>
                    1. Shipping
                  </TabsTrigger>
                  <TabsTrigger value="payment" disabled={activeStep !== "payment"}>
                    2. Payment
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="shipping" className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div>
                        <h2 className="text-xl font-semibold">Contact Information</h2>
                        <div className="mt-3 grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input id="name" placeholder="John Doe" className="pl-10" required />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input id="phone" type="tel" placeholder="07XX XXX XXX" className="pl-10" required />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">Shipping Address</h2>
                        <div className="mt-3 grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="address">Street Address</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input id="address" placeholder="123 Main St" className="pl-10" required />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                            <Input id="address2" placeholder="Apt 4B" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" placeholder="Nairobi" required />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="county">County</Label>
                              <Select defaultValue="Nairobi">
                                <SelectTrigger id="county">
                                  <SelectValue placeholder="Select county" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Nairobi">Nairobi</SelectItem>
                                  <SelectItem value="Mombasa">Mombasa</SelectItem>
                                  <SelectItem value="Kisumu">Kisumu</SelectItem>
                                  <SelectItem value="Nakuru">Nakuru</SelectItem>
                                  <SelectItem value="Eldoret">Eldoret</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="postal">Postal Code</Label>
                              <Input id="postal" placeholder="00100" required />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="country">Country</Label>
                              <Select defaultValue="KE">
                                <SelectTrigger id="country">
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="KE">Kenya</SelectItem>
                                  <SelectItem value="UG">Uganda</SelectItem>
                                  <SelectItem value="TZ">Tanzania</SelectItem>
                                  <SelectItem value="RW">Rwanda</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">Shipping Method</h2>
                        <RadioGroup
                          defaultValue={shippingMethod}
                          onValueChange={setShippingMethod}
                          className="mt-3 grid gap-3"
                        >
                          {shippingMethods.map((method) => (
                            <div key={method.id} className="flex items-start space-x-3">
                              <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                              <div className="grid gap-1 w-full">
                                <div className="flex justify-between">
                                  <Label htmlFor={method.id} className="font-medium">
                                    {method.name}
                                  </Label>
                                  <span className="font-medium">
                                    KES {Math.round(method.price * 130).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  <span>{method.estimatedDelivery}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="notes">Order Notes (optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Special instructions for delivery or gift messages"
                          className="min-h-[80px]"
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="payment" className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div>
                        <h2 className="text-xl font-semibold">Payment Method</h2>
                        <RadioGroup defaultValue="mpesa" className="mt-4">
                          <div className="flex items-center space-x-2 rounded-md border p-3 mb-3">
                            <RadioGroupItem value="mpesa" id="mpesa-payment" />
                            <Label htmlFor="mpesa-payment" className="flex-1 cursor-pointer">
                              <div className="font-medium">M-PESA</div>
                              <div className="text-sm text-muted-foreground">Pay via M-PESA mobile money</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="card" id="card-payment" />
                            <Label htmlFor="card-payment" className="flex-1 cursor-pointer">
                              <div className="font-medium">Credit/Debit Card</div>
                              <div className="text-sm text-muted-foreground">
                                Pay with Visa, Mastercard, or other cards
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="mpesa-phone-payment">M-PESA Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input id="mpesa-phone-payment" placeholder="07XX XXX XXX" className="pl-10" required />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            You will receive an M-PESA prompt on this number to complete payment
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
                      </div>

                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Complete Purchase"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {cart.reduce((total, item) => total + item.quantity, 0)} items in your cart
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="max-h-[200px] overflow-auto">
                    {cart.map((item, index) => (
                      <div key={`${item.product.id}-${item.variant}`} className="flex items-center gap-4 py-2">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          {item.variant && <p className="text-xs text-muted-foreground">Size: {item.variant}</p>}
                          <div className="flex justify-between">
                            <p className="text-sm">
                              KES {Math.round(item.product.price * 130).toLocaleString()} x {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              KES {Math.round(item.product.price * item.quantity * 130).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Subtotal</p>
                      <p className="text-sm font-medium">KES {Math.round(subtotal * 130).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Shipping</p>
                      <p className="text-sm font-medium">KES {Math.round(shippingCost * 130).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Tax</p>
                      <p className="text-sm font-medium">KES {Math.round(tax * 130).toLocaleString()}</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-medium">
                      <p>Total</p>
                      <p>KES {Math.round(total * 130).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Truck className="mr-2 h-4 w-4" />
                    <span>Shipping via {getSelectedShipping().name}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Order Complete!</CardTitle>
              <CardDescription>Thank you for your purchase. Your order has been confirmed.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">Order #: ORD-{Math.floor(Math.random() * 1000000)}</p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
              <div className="grid gap-2">
                <p className="font-medium">Order Summary</p>
                <div className="max-h-[150px] overflow-auto">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.variant}`}
                      className="flex items-center justify-between py-1 text-sm"
                    >
                      <span>
                        {item.product.name} {item.variant ? `(${item.variant})` : ""} x {item.quantity}
                      </span>
                      <span className="font-medium">
                        KES {Math.round(item.product.price * item.quantity * 130).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-sm">Subtotal</p>
                  <p className="text-sm font-medium">KES {Math.round(subtotal * 130).toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Shipping</p>
                  <p className="text-sm font-medium">KES {Math.round(shippingCost * 130).toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Tax</p>
                  <p className="text-sm font-medium">KES {Math.round(tax * 130).toLocaleString()}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <p>Total</p>
                  <p>KES {Math.round(total * 130).toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Truck className="mr-2 h-4 w-4" />
                <span>Estimated delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleComplete} className="w-full">
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

