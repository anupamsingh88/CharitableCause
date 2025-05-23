import { Helmet } from 'react-helmet';
import DonationsList from '@/components/browse/DonationsList';
import CallToAction from '@/components/home/CallToAction';

export default function BrowsePage() {
  return (
    <>
      <Helmet>
        <title>Browse Donations | E-Donation Portal</title>
        <meta name="description" content="Browse available items for donation in your community. Find furniture, electronics, clothing, and more." />
      </Helmet>
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Browse Available Donations</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            Explore items currently available for donation in your community. Find furniture, electronics, clothing, and more.
          </p>
        </div>
        
        <DonationsList />
        <CallToAction />
      </main>
    </>
  );
}