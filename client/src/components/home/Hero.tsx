import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Gift, Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-emerald-50 to-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Don't Dump, <span className="text-primary">Donate</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Give your items a second life and help those in need. Your unwanted items could be someone else's treasure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/donate">
                <Button className="w-full bg-primary hover:bg-emerald-600 px-6 py-6 h-auto">
                  <Gift className="mr-2 h-5 w-5" />
                  Donate Items
                </Button>
              </Link>
              <Link href="/browse">
                <Button variant="outline" className="w-full text-primary border-primary hover:bg-gray-50 px-6 py-6 h-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Donations
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80" 
              alt="Volunteers working with donated items" 
              className="rounded-lg shadow-lg w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
