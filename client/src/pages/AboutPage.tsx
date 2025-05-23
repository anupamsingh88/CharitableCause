import { Helmet } from 'react-helmet';
import About from '@/components/home/About';
import Impact from '@/components/home/Impact';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | E-Donation Portal</title>
        <meta name="description" content="Learn about our mission to reduce waste and help communities through donations." />
      </Helmet>
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">About Our Platform</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            Learn more about our mission to reduce waste and support communities through reuse and donation.
          </p>
        </div>
        
        <About />
        <HowItWorks />
        <Impact />
        <Testimonials />
      </main>
    </>
  );
}