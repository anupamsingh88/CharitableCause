import { Facebook, Twitter, Instagram, Linkedin, HandHeart, Send } from 'lucide-react';
import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <HandHeart className="text-primary h-6 w-6 mr-2" />
              <span className="font-bold text-xl text-white">E-Donate</span>
            </div>
            <p className="text-gray-400 mb-4">Making a difference through sustainable donation and reducing waste.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-400 hover:text-white transition">Donate Items</Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-400 hover:text-white transition">Browse Donations</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Stay up to date with the latest news and donations.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-r-none bg-gray-700 text-white border-gray-600 focus-visible:ring-primary"
              />
              <Button type="submit" className="rounded-l-none bg-primary hover:bg-emerald-600">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Donate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
