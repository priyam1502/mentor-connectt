import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Star, TrendingUp } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      title: "Active Mentors",
      value: "10,000+",
      description: "Verified industry experts",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Hours Mentored",
      value: "250,000+",
      description: "Total mentorship sessions",
      icon: Clock,
      color: "text-green-600",
    },
    {
      title: "Success Rate",
      value: "95%",
      description: "Career advancement rate",
      icon: TrendingUp,
      color: "text-orange-600",
    },
    {
      title: "Average Rating",
      value: "4.9/5",
      description: "User satisfaction score",
      icon: Star,
      color: "text-yellow-600",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              thousands of professionals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a thriving community of mentors and mentees who are transforming careers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title}
              className="text-center bg-card/50 dark:bg-card/70 backdrop-blur-sm border-border/50 hover:shadow-xl dark:hover:shadow-glow-primary/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg glow-primary/30">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {stat.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;