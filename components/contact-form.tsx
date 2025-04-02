"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2, Music, Calendar, MessageSquare } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { submitContactForm } from "@/app/actions/contact"
import { AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Style to remove number input arrows
const inputStyles = `
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  enquiryType: z.enum(["booking", "songwriting", "other"], {
    required_error: "Please select an enquiry type",
  }),
  eventDate: z.date().optional(),
  performanceBudget: z.number().min(10000).optional(),
  songwritingBudget: z.enum(["50000-100000", "100000-250000", "250000-500000", "500000+"]).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      enquiryType: undefined,
      message: "",
      performanceBudget: 100000,
    },
  })

  const enquiryType = form.watch("enquiryType")
  const performanceBudget = form.watch("performanceBudget") || 100000

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      await submitContactForm(data)
      setIsSuccess(true)
      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <AlertTitle className="text-2xl font-bold mb-2">Thank you for your message!</AlertTitle>
          <AlertDescription className="text-muted-foreground text-lg mb-6">
            We've received your enquiry and will get back to you as soon as possible.
          </AlertDescription>
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={() => setIsSuccess(false)}
          >
            Send another message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <style jsx global>
        {inputStyles}
      </style>
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        <CardContent className="p-6 md:p-8">
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="booking" onClick={() => form.setValue("enquiryType", "booking")}>
                <Calendar className="h-4 w-4 mr-2" />
                Booking
              </TabsTrigger>
              <TabsTrigger value="songwriting" onClick={() => form.setValue("enquiryType", "songwriting")}>
                <Music className="h-4 w-4 mr-2" />
                Songwriting
              </TabsTrigger>
              <TabsTrigger value="form">
                <MessageSquare className="h-4 w-4 mr-2" />
                All Options
              </TabsTrigger>
            </TabsList>

            <TabsContent value="booking" className="mt-0">
              <BookingForm form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} />
            </TabsContent>

            <TabsContent value="songwriting" className="mt-0">
              <SongwritingForm form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} />
            </TabsContent>

            <TabsContent value="form" className="mt-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="enquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enquiry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select enquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="booking">Book a Performance</SelectItem>
                              <SelectItem value="songwriting">Song Writing Request</SelectItem>
                              <SelectItem value="other">Special Enquiry</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {enquiryType === "booking" && (
                    <>
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="eventDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Event Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={`w-full pl-3 text-left font-normal ${
                                        !field.value && "text-muted-foreground"
                                      }`}
                                    >
                                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormDescription>When would you like to book the artist?</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="performanceBudget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget Range</FormLabel>
                              <FormControl>
                                <div className="space-y-4">
                                  <Slider
                                    min={50000}
                                    max={5000000}
                                    step={50000}
                                    defaultValue={[field.value || 100000]}
                                    onValueChange={(value) => field.onChange(value[0])}
                                    className="py-4"
                                  />
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">KES 50,000</span>
                                    <div className="relative w-40">
                                      <Input
                                        type="number"
                                        min={50000}
                                        value={performanceBudget}
                                        onChange={(e) => {
                                          const value = Number.parseInt(e.target.value)
                                          if (!isNaN(value) && value >= 50000) {
                                            form.setValue("performanceBudget", value)
                                          }
                                        }}
                                        className="pl-10 pr-2 h-8 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full border-0 text-center"
                                      />
                                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-white">
                                        KES
                                      </div>
                                    </div>
                                    <span className="text-sm font-medium">No Maximum</span>
                                  </div>
                                </div>
                              </FormControl>
                              <FormDescription>
                                Approximate budget for the performance (no maximum limit)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}

                  {enquiryType === "songwriting" && (
                    <FormField
                      control={form.control}
                      name="songwritingBudget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="50000-100000">KES 50,000 - KES 100,000</SelectItem>
                              <SelectItem value="100000-250000">KES 100,000 - KES 250,000</SelectItem>
                              <SelectItem value="250000-500000">KES 250,000 - KES 500,000</SelectItem>
                              <SelectItem value="500000+">KES 500,000+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Estimated budget for songwriting services</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide details about your enquiry..."
                            className="min-h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}

function BookingForm({ 
  form, 
  onSubmit, 
  isSubmitting 
}: { 
  form: any; 
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}) {
  const performanceBudget = form.watch("performanceBudget") || 100000

  return (
    <>
      <style jsx global>
        {inputStyles}
      </style>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>When would you like to book the artist?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="performanceBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Slider
                        min={50000}
                        max={5000000}
                        step={50000}
                        defaultValue={[field.value || 100000]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="py-4"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">KES 50,000</span>
                        <div className="relative w-40">
                          <Input
                            type="number"
                            min={50000}
                            value={performanceBudget}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value)
                              if (!isNaN(value) && value >= 50000) {
                                form.setValue("performanceBudget", value)
                              }
                            }}
                            className="pl-10 pr-2 h-8 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full border-0 text-center"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-white">
                            KES
                          </div>
                        </div>
                        <span className="text-sm font-medium">No Maximum</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>Approximate budget for the performance (no maximum limit)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide details about your event, venue, expected audience size, and any specific requirements..."
                    className="min-h-32 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Booking Request...
              </>
            ) : (
              "Submit Booking Request"
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}

function SongwritingForm({ 
  form, 
  onSubmit, 
  isSubmitting 
}: { 
  form: any;
  onSubmit: (data: FormValues) => Promise<void>;
  isSubmitting: boolean;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="songwritingBudget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Range</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="50000-100000">KES 50,000 - KES 100,000</SelectItem>
                  <SelectItem value="100000-250000">KES 100,000 - KES 250,000</SelectItem>
                  <SelectItem value="250000-500000">KES 250,000 - KES 500,000</SelectItem>
                  <SelectItem value="500000+">KES 500,000+</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Estimated budget for songwriting services</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe the song you'd like written, including genre, mood, theme, and any specific requirements..."
                  className="min-h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Request...
            </>
          ) : (
            "Submit Songwriting Request"
          )}
        </Button>
      </form>
    </Form>
  )
}

