import { Helmet } from 'react-helmet';
import DonationForm from '@/components/donate/DonationForm';
import Stats from '@/components/home/Stats';

export default function DonatePage() {
  return (
    <>
      <Helmet>
        <title>Donate Items | E-Donation Portal</title>
        <meta name="description" content="Donate your unused items to those in need and help reduce waste through our donation platform." />
      </Helmet>
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Donate Your Items</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            Help reduce waste and support your community by donating items you no longer need.
            Your contributions make a real difference.
          </p>
        </div>
        
        <Stats />
        <DonationForm />
      </main>
    </>
  );
}