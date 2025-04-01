"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, User, Mail, Phone, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

// Show type definition
type Show = {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  ticketLink: string
  isSoldOut: boolean
  price?: number
}

// Ticket type definition
type TicketType = {
  id: string
  name: string
  price: number
  description: string
}

// Props type definition
type TicketCheckoutProps = {
  show: Show
  onClose: () => void
}

export function TicketCheckout({ show, onClose }: TicketCheckoutProps) {
  const [activeStep, setActiveStep] = useState("details")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [selectedTicketType, setSelectedTicketType] = useState<string>("standard")
  const router = useRouter()

  // Ticket types for this show
  const ticketTypes: TicketType[] = [
    {
      id: "standard",
      name: "Standard Admission",
      price: show.price || 6500,
      description: "General admission with standard seating",
    },
    {
      id: "vip",
      name: "VIP Experience",
      price: (show.price || 6500) * 2.5,
      description: "Premium seating with backstage access and exclusive merchandise",
    },
    {
      id: "early",
      name: "Early Entry",
      price: (show.price || 6500) * 1.5,
      description: "Enter 1 hour before general admission with preferred seating",
    },
  ]

  // Get selected ticket type
  const getSelectedTicket = () => {
    return ticketTypes.find((ticket) => ticket.id === selectedTicketType) || ticketTypes[0]
  }

  // Calculate subtotal
  const subtotal = getSelectedTicket().price * ticketQuantity
  const serviceFee = subtotal * 0.15
  const total = subtotal + serviceFee

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeStep === "details") {
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

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0 && value <= 10) {
      setTicketQuantity(value)
    }
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
                <h1 className="text-2xl font-bold">Secure Checkout</h1>
              </div>

              <Tabs value={activeStep} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details" disabled={activeStep !== "details"}>
                    1. Ticket Details
                  </TabsTrigger>
                  <TabsTrigger value="payment" disabled={activeStep !== "payment"}>
                    2. Payment
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div>
                        <h2 className="text-xl font-semibold">Select Ticket Type</h2>
                        <RadioGroup
                          defaultValue={selectedTicketType}
                          onValueChange={setSelectedTicketType}
                          className="mt-3 grid gap-3"
                        >
                          {ticketTypes.map((ticket) => (
                            <div key={ticket.id} className="flex items-start space-x-3">
                              <RadioGroupItem value={ticket.id} id={ticket.id} className="mt-1" />
                              <div className="grid gap-1.5">
                                <Label htmlFor={ticket.id} className="font-medium">
                                  {ticket.name} - KES {Math.round(ticket.price).toLocaleString()}
                                </Label>
                                <p className="text-sm text-muted-foreground">{ticket.description}</p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">Ticket Quantity</h2>
                        <div className="mt-3 flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => ticketQuantity > 1 && setTicketQuantity(ticketQuantity - 1)}
                            className="h-10 w-10"
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            value={ticketQuantity}
                            onChange={handleQuantityChange}
                            className="mx-2 h-10 w-20 text-center"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => ticketQuantity < 10 && setTicketQuantity(ticketQuantity + 1)}
                            className="h-10 w-10"
                          >
                            +
                          </Button>
                        </div>
                      </div>

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

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
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
                            <RadioGroupItem value="mpesa" id="mpesa" />
                            <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                              <div className="font-medium">M-PESA</div>
                              <div className="text-sm text-muted-foreground">Pay via M-PESA mobile money</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">
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
                          <Label htmlFor="mpesa-phone">M-PESA Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input id="mpesa-phone" placeholder="07XX XXX XXX" className="pl-10" required />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            You will receive an M-PESA prompt on this number to complete payment
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms-payment" required />
                        <label
                          htmlFor="terms-payment"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the payment terms and conditions
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
                  <CardDescription>Ticket details for {show.title}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{show.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {show.date} at {show.time}
                      </p>
                      <p className="text-sm text-muted-foreground">{show.location}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        {getSelectedTicket().name} x {ticketQuantity}
                      </p>
                      <p className="text-sm font-medium">KES {Math.round(subtotal).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Service Fee</p>
                      <p className="text-sm font-medium">KES {Math.round(serviceFee).toLocaleString()}</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-medium">
                      <p>Total</p>
                      <p>KES {Math.round(total).toLocaleString()}</p>
                    </div>
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
              <CardTitle className="text-2xl">Purchase Complete!</CardTitle>
              <CardDescription>Thank you for your purchase. Your tickets have been confirmed.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <p className="font-medium">{show.title}</p>
                <p className="text-sm text-muted-foreground">
                  {show.date} at {show.time}
                </p>
                <p className="text-sm text-muted-foreground">{show.location}</p>
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    {getSelectedTicket().name} x {ticketQuantity}
                  </p>
                  <p className="text-sm font-medium">KES {Math.round(subtotal).toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Service Fee</p>
                  <p className="text-sm font-medium">KES {Math.round(serviceFee).toLocaleString()}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <p>Total</p>
                  <p>KES {Math.round(total).toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">Confirmation #: TKT-{Math.floor(Math.random() * 1000000)}</p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onClose} className="w-full">
                Return to Shows
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

