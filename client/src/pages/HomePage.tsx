import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import About from '@/components/home/About';
import HowItWorks from '@/components/home/HowItWorks';
import DonationForm from '@/components/donate/DonationForm';
import DonationsList from '@/components/browse/DonationsList';
import Testimonials from '@/components/home/Testimonials';
import Impact from '@/components/home/Impact';
import CallToAction from '@/components/home/CallToAction';
import ContactForm from '@/components/contact/ContactForm';
import { Helmet } from 'react-helmet';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>E-Donation Portal | Don't Dump, Donate</title>
        <meta name="description" content="Connect with others to donate and receive items instead of throwing them away. Reduce waste and help your community through our donation platform." />
        <meta property="og:title" content="E-Donation Portal | Don't Dump, Donate" />
        <meta property="og:description" content="Connect with others to donate and receive items instead of throwing them away. Reduce waste and help your community through our donation platform." />
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <main className="pt-16">
        <Hero />
        <Stats />
        <About />
        <HowItWorks />
        <DonationForm />
        <DonationsList />
        <Testimonials />
        <Impact />
        <CallToAction />
        <ContactForm />
      </main>
    </>
  );
}
