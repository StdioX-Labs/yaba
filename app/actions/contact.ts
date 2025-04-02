'use server'

interface ContactFormData {
  name: string
  email: string
  date: Date
  message: string
  budget: number
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Here you would typically send the data to your backend/email service
    // For now, we'll just simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    }
  }
}