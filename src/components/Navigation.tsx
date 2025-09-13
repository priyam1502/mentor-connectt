import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
              MentorConnect
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/features" className="text-foreground/80 hover:text-foreground transition-colors">
              Features
            </a>
            <a href="/find-mentors" className="text-foreground/80 hover:text-foreground transition-colors">
              Find Mentors
            </a>
            <a href="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </a>
            <a href="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <a href="/auth">Sign In</a>
            </Button>
            <Button variant="default" asChild>
              <a href="/auth">Get Started</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <a href="/features" className="text-foreground/80 hover:text-foreground transition-colors">
                Features
              </a>
              <a href="/find-mentors" className="text-foreground/80 hover:text-foreground transition-colors">
                Find Mentors
              </a>
              <a href="/about" className="text-foreground/80 hover:text-foreground transition-colors">
                About
              </a>
              <a href="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <ThemeToggle />
                </div>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/auth">Sign In</a>
                </Button>
                <Button variant="default" className="justify-start" asChild>
                  <a href="/auth">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;