import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import DonationCard from './DonationCard';
import { Skeleton } from '@/components/ui/skeleton';
import { DonationItem } from '@shared/schema';

export default function DonationsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Fetch donations
  const { 
    data: donations, 
    isLoading, 
    error 
  } = useQuery<DonationItem[]>({ 
    queryKey: ['/api/donations', selectedCategory], 
  });
  
  // Filter donations based on search query
  const filteredDonations = donations?.filter(donation => 
    donation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donation.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  
  // Render loading skeletons
  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
        <Skeleton className="w-full h-48" />
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-5 w-1/4 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
      </div>
    ));
  };
  
  return (
    <section id="browse" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Available Donations</h2>
            <p className="text-gray-600">Browse items currently available in your community</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Input
                type="text"
                placeholder="Search items..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            
            <Select onValueChange={handleCategoryChange} value={selectedCategory}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="All Categories" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Household">Household Items</SelectItem>
                <SelectItem value="Toys">Toys & Games</SelectItem>
                <SelectItem value="Books">Books & Media</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            renderSkeletons()
          ) : error ? (
            <div className="col-span-full text-center py-10">
              <p className="text-red-500">Error loading donations. Please try again later.</p>
            </div>
          ) : filteredDonations && filteredDonations.length > 0 ? (
            filteredDonations.map(donation => (
              <DonationCard key={donation.id} donation={donation} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No donations found matching your criteria.</p>
            </div>
          )}
        </div>
        
        {filteredDonations && filteredDonations.length > 0 && (
          <div className="mt-10 text-center">
            <Button 
              variant="outline" 
              className="text-primary border-primary hover:bg-gray-50"
            >
              Load More Items
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
