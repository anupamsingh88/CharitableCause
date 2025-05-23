import { Helmet } from 'react-helmet';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | E-Donation Portal</title>
        <meta name="description" content="Get in touch with our team for questions, feedback, or support regarding donations or our platform." />
      </Helmet>
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Contact Us</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            Have questions, feedback, or need assistance? We're here to help! Get in touch with our team.
          </p>
        </div>
        
        <ContactForm />
      </main>
    </>
  );
}