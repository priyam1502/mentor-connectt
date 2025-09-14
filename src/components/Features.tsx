import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, Video, Users, Shield, TrendingUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Smart Mentor Matching",
      description: "Our AI-powered algorithm connects you with mentors who align with your goals, industry, and learning style.",
      icon: Search,
      color: "text-blue-600",
    },
    {
      title: "Seamless Booking",
      description: "Book sessions instantly with integrated calendar scheduling. No back-and-forth emails needed.",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Expert Community",
      description: "Connect with 10,000+ verified industry leaders from top companies worldwide.",
      icon: Users,
      color: "text-orange-600",
    },
    {
      title: "Secure & Private",
      description: "End-to-end encryption ensures your conversations and data remain completely private and secure.",
      icon: Shield,
      color: "text-red-600",
    },
    {
      title: "Track Your Growth",
      description: "Monitor your progress with detailed analytics, goal tracking, and personalized learning insights.",
      icon: TrendingUp,
      color: "text-indigo-600",
    },
  ];

  return (
    <section className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              accelerate your career
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            MentorConnect provides a comprehensive platform designed to make mentorship accessible, 
            effective, and transformative for your professional journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="card-hover bg-card/50 dark:bg-card/70 backdrop-blur-sm border-border/50 shadow-xl dark:shadow-glow-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 shadow-lg glow-primary/50`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;