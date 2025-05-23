import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { HandHeart, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, user, handleOpenLoginModal, handleOpenSignupModal } = useAuth();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle closing mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`bg-white shadow-sm fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <HandHeart className="text-primary h-6 w-6 mr-2" />
              <span className="font-bold text-xl text-gray-800">E-Donate</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`text-gray-700 hover:text-primary font-medium ${location === '/' ? 'text-primary' : ''}`}>
              Home
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-primary font-medium">
              About
            </Link>
            <Link href="/#donate" className="text-gray-700 hover:text-primary font-medium">
              Donate
            </Link>
            <Link href="/#browse" className="text-gray-700 hover:text-primary font-medium">
              Browse
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-primary font-medium">
              Contact
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" className="flex items-center">
                    <span className="text-sm font-medium">{user?.firstName}</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={handleOpenLoginModal}>Login</Button>
                <Button variant="default" className="bg-primary hover:bg-emerald-600" onClick={handleOpenSignupModal}>Sign Up</Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link href="/" className="block py-2 text-gray-700 hover:text-primary font-medium">
              Home
            </Link>
            <Link href="/#about" className="block py-2 text-gray-700 hover:text-primary font-medium">
              About
            </Link>
            <Link href="/#donate" className="block py-2 text-gray-700 hover:text-primary font-medium">
              Donate
            </Link>
            <Link href="/#browse" className="block py-2 text-gray-700 hover:text-primary font-medium">
              Browse
            </Link>
            <Link href="/#contact" className="block py-2 text-gray-700 hover:text-primary font-medium">
              Contact
            </Link>
            <div className="pt-2 flex space-x-4">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <Link href="/dashboard">
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="outline" className="w-full">{user?.firstName}'s Profile</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Button variant="outline" className="flex-1" onClick={handleOpenLoginModal}>Login</Button>
                  <Button variant="default" className="flex-1 bg-primary hover:bg-emerald-600" onClick={handleOpenSignupModal}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
