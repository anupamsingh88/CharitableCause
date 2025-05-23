export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our platform makes donating and finding items simple and efficient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
            <p className="text-gray-600">
              Sign up and create your profile to start donating or browsing available items.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">List or Browse Items</h3>
            <p className="text-gray-600">
              Post items you want to donate or search for items you need.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect and Exchange</h3>
            <p className="text-gray-600">
              Coordinate with other users to arrange item pickup or delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
