import { Globe, Users, Recycle } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Donate Instead of Dump?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Joining our platform helps reduce waste, support communities, and create a sustainable future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary text-2xl mb-4">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Environmental Impact</h3>
            <p className="text-gray-600">
              Reduce landfill waste by giving your items a second life instead of throwing them away.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary text-2xl mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600">
              Help those in need by providing essential items to individuals and families in your community.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary text-2xl mb-4">
              <Recycle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Resource Conservation</h3>
            <p className="text-gray-600">
              Conserve resources by extending the life cycle of products through reuse and recycling.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80" 
                alt="Community recycling efforts" 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                We're building a platform that connects people who have items they no longer need with those who can put them to good use. 
                Our goal is to reduce waste, support communities, and promote sustainable consumption.
              </p>
              <p className="text-gray-600 mb-4">
                Every item donated through our platform helps reduce landfill waste and provides valuable resources to individuals, 
                families, and organizations in need.
              </p>
              <a href="#" className="text-primary hover:text-emerald-600 font-medium flex items-center">
                Learn more about our impact <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
