import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Upload, Gift, X, Image as ImageIcon } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertDonationItemSchema } from '@/lib/validation';

type FormValues = z.infer<typeof insertDonationItemSchema>;

export default function DonationForm() {
  const { toast } = useToast();
  const { isAuthenticated, handleOpenLoginModal } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  
  // Setup form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(insertDonationItemSchema),
    defaultValues: {
      name: '',
      category: '',
      condition: '',
      description: '',
      location: '',
      imageUrl: '',
      selfPickup: false,
      canDeliver: false,
    },
  });
  
  // Handle donation creation
  const { mutate: createDonation, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await apiRequest('POST', '/api/donations', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/donations'] });
      form.reset();
      toast({
        title: "Donation submitted successfully!",
        description: "Thank you for your contribution to the community.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error submitting donation",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });
  
  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }
    
    // Check file type
    if (!file.type.match('image/(jpeg|jpg|png|gif)')) {
      toast({
        title: "Invalid file type",
        description: "Only JPG, PNG, and GIF files are allowed",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Create a URL for the uploaded image
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // Use the actual image data instead of a placeholder
    setImageUrl(objectUrl);
    form.setValue('imageUrl', objectUrl);
    
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Image uploaded",
        description: "Your image has been added to the donation",
      });
    }, 1500);
  };
  
  const removeImage = () => {
    setPreviewUrl('');
    setImageUrl('');
    form.setValue('imageUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a donation",
        variant: "destructive",
      });
      handleOpenLoginModal();
      return;
    }
    
    // Include the image URL in the form data
    const formData = {
      ...data,
      imageUrl: imageUrl,
    };
    
    createDonation(formData);
  };
  
  return (
    <section id="donate" className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Donate Your Items</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Help reduce waste and support your community by donating items you no longer need.
          </p>
        </div>
        
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Item Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Item Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter item name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Category*</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Furniture">Furniture</SelectItem>
                            <SelectItem value="Clothing">Clothing</SelectItem>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Household">Household Items</SelectItem>
                            <SelectItem value="Toys">Toys & Games</SelectItem>
                            <SelectItem value="Books">Books & Media</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Condition*</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="New">New (never used)</SelectItem>
                            <SelectItem value="Like New">Like New</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Needs Repair">Needs Repair</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Description*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your item, including any relevant details about its condition, size, etc." 
                            className="resize-none" 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Location & Contact</h3>
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Location*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city or neighborhood" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="mb-4">
                    <FormLabel className="block text-gray-700 mb-2">Pickup Options*</FormLabel>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="selfPickup"
                        render={({ field }) => (
                          <div className="flex items-center">
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Self Pickup</FormLabel>
                            </FormItem>
                          </div>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="canDeliver"
                        render={({ field }) => (
                          <div className="flex items-center">
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Can Deliver</FormLabel>
                            </FormItem>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <FormLabel className="block text-gray-700 mb-2">Photos (1 image)</FormLabel>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    
                    {previewUrl ? (
                      <div className="relative border rounded-md overflow-hidden">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {isUploading ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-2"></div>
                            <p className="text-gray-500">Uploading image...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-gray-500">Drag and drop a photo or</p>
                            <Button 
                              type="button" 
                              variant="secondary"
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                            >
                              Browse Files
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (max. 5MB)</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-white hover:bg-emerald-600 py-6 h-auto"
                      disabled={isPending}
                    >
                      <Gift className="mr-2 h-5 w-5" />
                      {isPending ? "Submitting..." : "Submit Donation"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
