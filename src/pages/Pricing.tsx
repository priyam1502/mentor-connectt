import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Freemium",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with mentorship",
      badge: null,
      features: [
        { name: "Browse mentors", included: true },
        { name: "Basic profile", included: true },
        { name: "1 mentor connection per month", included: true },
        { name: "Community forums", included: true },
        { name: "Basic messaging", included: true },
        { name: "Video sessions", included: false },
        { name: "Priority support", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Group mentorship", included: false }
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Premium",
      price: "₹599",
      period: "per month",
      description: "Best for active learners and professionals",
      badge: "Most Popular",
      features: [
        { name: "Everything in Freemium", included: true },
        { name: "Unlimited mentor connections", included: true },
        { name: "Video sessions (up to 4 hours/month)", included: true },
        { name: "Advanced profile customization", included: true },
        { name: "Priority messaging", included: true },
        { name: "Session recordings", included: true },
        { name: "Calendar integration", included: true },
        { name: "Basic analytics", included: true },
        { name: "Email support", included: true }
      ],
      cta: "Start Premium",
      popular: true
    },
    {
      name: "Premium Pro",
      price: "₹1,299",
      period: "per month",
      description: "For serious professionals and teams",
      badge: "Enterprise",
      features: [
        { name: "Everything in Premium", included: true },
        { name: "Unlimited video sessions", included: true },
        { name: "Group mentorship access", included: true },
        { name: "Advanced analytics & insights", included: true },
        { name: "Custom branding", included: true },
        { name: "Priority mentor matching", included: true },
        { name: "24/7 priority support", included: true },
        { name: "API access", included: true },
        { name: "Team management tools", included: true }
      ],
      cta: "Go Pro",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "What happens to my unused sessions?",
      answer: "Unused sessions roll over to the next month for Premium and Premium Pro plans."
    },
    {
      question: "Is there a free trial?",
      answer: "We offer a generous freemium plan that you can use forever. You can upgrade to paid plans anytime."
    },
    {
      question: "How do refunds work?",
      answer: "We offer a 14-day money-back guarantee for all paid plans. No questions asked."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Choose the plan that fits your mentorship goals. Start free and upgrade as you grow.
            </p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative border-0 shadow-sm ${plan.popular ? 'ring-2 ring-primary glow-primary' : ''}`}
                >
                  {plan.badge && (
                    <Badge 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">/{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-success flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={`text-sm ${!feature.included ? 'text-muted-foreground line-through' : ''}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "hero" : "outline"}
                      size="lg"
                      asChild
                    >
                      <a href="/auth">{plan.cta}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are accelerating their careers with MentorConnect.
            </p>
            <Button variant="secondary" size="xl" asChild>
              <a href="/auth">Get Started Today</a>
            </Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing;