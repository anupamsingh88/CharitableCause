import { Button } from '@/components/ui/button';
import { UserPlus, Gift } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/useAuth';

export default function CallToAction() {
  const { handleOpenSignupModal, isAuthenticated } = useAuth();
  
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-emerald-100 max-w-2xl mx-auto mb-8">
          Join our community today and start giving your unused items a second life while helping others in need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isAuthenticated && (
            <Button 
              variant="secondary" 
              className="bg-white text-emerald-600 hover:bg-gray-100"
              onClick={handleOpenSignupModal}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up Now
            </Button>
          )}
          <Link href="/donate">
            <Button 
              variant="outline" 
              className="bg-emerald-500 text-white border-emerald-400 hover:bg-emerald-400"
            >
              <Gift className="mr-2 h-4 w-4" />
              Donate Items
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
