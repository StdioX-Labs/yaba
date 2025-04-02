
'use server'

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  enquiryType: "booking" | "songwriting" | "other";
  phone?: string;
  eventDate?: Date;
  performanceBudget?: number;
  songwritingBudget?: string;
  // These two fields are currently required in your interface but not provided
  date?: Date;  // Make this optional with ?
  budget?: number; // Make this optional with ?
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Here you would typically send the data to your backend/email service
    // For now, we'll just simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    };
  }
}