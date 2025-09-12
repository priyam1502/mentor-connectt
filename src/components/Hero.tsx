import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mentorship.jpg";
import floatingIcons from "@/assets/floating-icons.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-white/10 rounded-full animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Connect.
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Learn.
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                Grow.
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Join thousands of professionals who've accelerated their careers through meaningful mentorship connections.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="hero" className="group" asChild>
                <a href="/mentors">
                  Find a Mentor
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="hero-outline" size="hero" asChild>
                <a href="/auth">Become a Mentor</a>
              </Button>
            </div>

          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Mentor and mentee collaboration"
                className="w-full h-auto rounded-3xl shadow-2xl animate-float"
              />
            </div>
            
            {/* Floating elements around the image */}
            <div className="absolute -top-8 -right-8 w-24 h-24 opacity-70 animate-float-delayed">
              <img 
                src={floatingIcons} 
                alt="Mentorship icons"
                className="w-full h-full rounded-2xl"
              />
            </div>
            
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;