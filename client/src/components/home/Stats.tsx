export default function Stats() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-emerald-50">
            <div className="text-primary text-4xl font-bold mb-2">5,000+</div>
            <p className="text-gray-600">Items Donated</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-blue-50">
            <div className="text-primary text-4xl font-bold mb-2">1,200+</div>
            <p className="text-gray-600">Active Users</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-emerald-50">
            <div className="text-primary text-4xl font-bold mb-2">350+</div>
            <p className="text-gray-600">Communities Served</p>
          </div>
        </div>
      </div>
    </section>
  );
}
