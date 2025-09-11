import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Morgan",
      role: "Software Engineer → Senior Product Manager",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      content: "MentorConnect helped me transition from engineering to product management. My mentor provided invaluable insights that accelerated my career by 2+ years.",
      rating: 5,
    },
    {
      name: "Sarah Kim",
      role: "Marketing Associate → Director of Growth",
      company: "Shopify",
      image: "https://images.unsplash.com/photo-1494790108755-2616c639749c?w=80&h=80&fit=crop&crop=face",
      content: "The quality of mentors on this platform is exceptional. I learned advanced growth strategies that directly contributed to a 300% increase in our user acquisition.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Junior Developer → Tech Lead",
      company: "Stripe",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      content: "My mentor didn't just teach me technical skills—they showed me how to lead teams and think strategically. Best investment I've made in my career.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ambitious professionals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how MentorConnect has transformed careers and accelerated professional growth 
            for thousands of mentees worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name} 
              className="card-hover bg-gradient-card border-white/20 shadow-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-lg leading-relaxed mb-6 text-foreground/90">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm font-medium text-primary">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;