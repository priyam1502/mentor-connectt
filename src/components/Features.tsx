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
      title: "Built-in Video Calls",
      description: "High-quality video sessions with screen sharing, recording, and integrated chat for the best experience.",
      icon: Video,
      color: "text-purple-600",
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
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6 lg:px-8">
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
              className="card-hover bg-white/50 backdrop-blur-sm border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
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