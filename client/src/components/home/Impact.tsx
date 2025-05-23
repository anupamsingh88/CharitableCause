import { Trash2, Sprout, HandHelping } from 'lucide-react';

export default function Impact() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Environmental Impact</h2>
            <p className="text-gray-600 mb-6">
              Through the generosity of our users, we've been able to divert tons of usable items from landfills 
              and reduce the carbon footprint associated with manufacturing new products.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-primary">
                  <Trash2 className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">50+ Tons</h4>
                  <p className="text-gray-600">Waste diverted from landfills</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-primary">
                  <Sprout className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">30+ Acres</h4>
                  <p className="text-gray-600">Forest equivalent carbon offset</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-primary">
                  <HandHelping className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">100+ Communities</h4>
                  <p className="text-gray-600">Supported through donations</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80" 
              alt="Community recycling event" 
              className="rounded-lg shadow-lg w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
