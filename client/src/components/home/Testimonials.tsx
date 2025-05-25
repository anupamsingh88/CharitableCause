import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Vinayak S.",
    initials: "LS",
    color: "bg-primary",
    rating: 5,
    text: "I was moving apartments and had so many items I couldn't take with me. Thanks to E-Donate, I was able to find new homes for my furniture instead of sending it to a landfill. The process was simple and rewarding!"
  },
  {
    id: 2,
    name: "Anupam Singh.",
    initials: "MJ",
    color: "bg-black",
    rating: 5,
    text: "As a student on a tight budget, E-Donate has been a lifesaver. I've furnished most of my apartment with donated items, saving money while reducing waste. The community here is incredibly generous!"
  },
  {
    id: 3,
    name: "Harsh S.",
    initials: "AP",
    color: "bg-emerald-600",
    rating: 5,
    text: "I run a community center and we've received so many wonderful donations through this platform. From furniture to electronics, these items have made a huge difference for the families we serve."
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Real stories from people making a difference in their communities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold`}>
                  {testimonial.initials}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="text-yellow-400 text-sm flex">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <Star className="h-4 w-4 fill-current" strokeWidth={0} style={{ clipPath: 'inset(0 50% 0 0)' }} />
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
