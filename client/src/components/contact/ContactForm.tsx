import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RectangleEllipsis, Phone, MapPin, Send } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertContactMessageSchema } from '@/lib/validation';

type FormValues = z.infer<typeof insertContactMessageSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  
  // Setup form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  // Handle contact message creation
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await apiRequest('POST', '/api/contact', data);
      return res.json();
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    sendMessage(data);
  };
  
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">Have questions or feedback? We'd love to hear from you!</p>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
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
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                <SelectItem value="Donation Question">Donation Question</SelectItem>
                                <SelectItem value="Technical Support">Technical Support</SelectItem>
                                <SelectItem value="Feedback">Feedback</SelectItem>
                                <SelectItem value="Partnerships">Partnerships</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message*</FormLabel>
                            <FormControl>
                              <Textarea rows={5} placeholder="Type your message here" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-primary hover:bg-emerald-600"
                        disabled={isPending}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                  
                  <div className="mb-6 flex">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-primary mr-4">
                      <RectangleEllipsis className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600">support@e-donate.org</p>
                    </div>
                  </div>
                  
                  <div className="mb-6 flex">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-primary mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="mb-6 flex">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-primary mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p className="text-gray-600">123 Green Street<br />Boston, MA 02108</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"
                        aria-label="Facebook"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"
                        aria-label="Twitter"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"
                        aria-label="Instagram"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"
                        aria-label="LinkedIn"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
