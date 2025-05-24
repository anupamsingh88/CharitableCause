import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Tag } from 'lucide-react';
import { DonationItem } from '@shared/schema';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Map condition to colors
const conditionColors: Record<string, string> = {
  'New': 'bg-green-100 text-green-800',
  'Like New': 'bg-blue-100 text-blue-800',
  'Good': 'bg-yellow-100 text-yellow-800',
  'Fair': 'bg-orange-100 text-orange-800',
  'Needs Repair': 'bg-red-100 text-red-800'
};

// Map category to colors
const categoryColors: Record<string, string> = {
  'Furniture': 'bg-green-100 text-green-800',
  'Clothing': 'bg-purple-100 text-purple-800',
  'Electronics': 'bg-red-100 text-red-800',
  'Household': 'bg-yellow-100 text-yellow-800',
  'Toys': 'bg-pink-100 text-pink-800',
  'Books': 'bg-blue-100 text-blue-800',
  'Other': 'bg-gray-100 text-gray-800'
};

// Sample images for the categories
const getCategoryImage = (category: string): string => {
  const images: Record<string, string> = {
    'Furniture': 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    'Clothing': 'https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    'Electronics': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    'Household': 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    'Toys': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    'Books': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    'Other': 'https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80'
  };
  
  return images[category] || images['Other'];
};

interface DonationCardProps {
  donation: DonationItem;
}

export default function DonationCard({ donation }: DonationCardProps) {
  const { isAuthenticated, handleOpenLoginModal } = useAuth();
  const { toast } = useToast();
  
  const handleRequestItem = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to request this item",
        variant: "destructive",
      });
      handleOpenLoginModal();
      return;
    }
    
    try {
      // Send the request to the server
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donationItemId: donation.id,
          message: `I'm interested in your ${donation.name}. Please contact me.`
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send request');
      }
      
      toast({
        title: "Request sent!",
        description: "The donor has been notified of your interest.",
      });
    } catch (error) {
      toast({
        title: "Error sending request",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={donation.imageUrl || getCategoryImage(donation.category)} 
          alt={donation.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getCategoryImage(donation.category);
          }}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{donation.name}</h3>
          <Badge 
            variant="outline" 
            className={categoryColors[donation.category] || 'bg-gray-100 text-gray-800'}
          >
            {donation.category}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {donation.description}
        </p>
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-3 w-3" />
          <span>{donation.location}</span>
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <Tag className="mr-1 h-3 w-3" />
          <span>Condition: {donation.condition}</span>
        </div>
        <Button 
          className="mt-4 w-full bg-primary hover:bg-emerald-600"
          onClick={handleRequestItem}
          disabled={donation.status !== 'available'}
        >
          {donation.status === 'available' ? 'Request Item' : 'Item Unavailable'}
        </Button>
      </CardContent>
    </Card>
  );
}
