import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Globe, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Active Mentors", value: "10,000+", icon: Users },
    { label: "Success Stories", value: "50,000+", icon: Award },
    { label: "Countries", value: "150+", icon: Globe },
    { label: "Sessions Completed", value: "500,000+", icon: Heart },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616c639749c?w=300&h=300&fit=crop&crop=face",
      bio: "Former VP at Google with 15 years of experience building products that connect people."
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Engineering leader passionate about building scalable platforms for meaningful connections."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Community builder dedicated to creating safe, inclusive spaces for professional growth."
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
              About MentorConnect
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              We believe that everyone deserves access to meaningful mentorship. 
              Our mission is to democratize professional growth and create lasting connections.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    MentorConnect was born from a simple observation: the most successful people 
                    in any field had great mentors who guided them along the way. Yet finding 
                    the right mentor was often a matter of luck or privilege.
                  </p>
                  <p>
                    We set out to change that. Founded in 2020, MentorConnect has grown from 
                    a small startup to a global platform connecting millions of professionals 
                    across industries and continents.
                  </p>
                  <p>
                    Today, we're proud to be the world's largest mentorship platform, 
                    helping people at every stage of their career find the guidance they need to thrive.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're a passionate team of builders, dreamers, and mentorship advocates 
                working to make professional growth accessible to everyone.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="border-0 shadow-sm text-center">
                  <CardHeader>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <div className="text-primary font-medium">{member.role}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and shape the community we're building together.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Inclusivity",
                  description: "Everyone deserves access to mentorship, regardless of background or circumstances."
                },
                {
                  title: "Quality",
                  description: "We maintain high standards to ensure meaningful, valuable mentorship experiences."
                },
                {
                  title: "Growth",
                  description: "We believe in continuous learning and development for both mentors and mentees."
                },
                {
                  title: "Community",
                  description: "Building lasting relationships and supporting each other's success."
                }
              ].map((value, index) => (
                <Card key={index} className="border-0 shadow-sm text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;