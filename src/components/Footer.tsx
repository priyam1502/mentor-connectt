import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-muted/50 to-muted/80 dark:from-background/50 dark:to-background/80 backdrop-blur-sm border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
              MentorConnect
            </div>
            <p className="text-muted-foreground max-w-sm">
              Connecting professionals with industry experts to accelerate career growth 
              through meaningful mentorship.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Find Mentors</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Become a Mentor</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Features</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest mentorship tips and platform updates.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="flex-1 bg-background/50 border-border/50 focus:border-primary" />
              <Button variant="gradient" className="shadow-lg">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} MentorConnect. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-all duration-300 hover:scale-105">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-all duration-300 hover:scale-105">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-all duration-300 hover:scale-105">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;