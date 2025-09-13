import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MentorCard from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockMentors } from "@/data/mockMentors";
import { Search, Filter, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const FindMentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");

  // Get unique expertise areas for filter
  const expertiseAreas = [...new Set(mockMentors.flatMap(mentor => mentor.expertise))];
  const locations = [...new Set(mockMentors.map(mentor => mentor.timezone))];

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = selectedExpertise === "all" || 
                           mentor.expertise.includes(selectedExpertise);
    
    const matchesLocation = selectedLocation === "all" || 
                          mentor.timezone === selectedLocation;
    
    const matchesAvailability = selectedAvailability === "all" ||
                              (selectedAvailability === "available" && mentor.available) ||
                              (selectedAvailability === "unavailable" && !mentor.available);

    return matchesSearch && matchesExpertise && matchesLocation && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Find Your Perfect Mentor
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Connect with experienced professionals who can guide you to the next level of your career.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, title, company, or expertise..."
                  className="pl-12 h-14 text-lg bg-white/90 border-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Expertise Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expertise</SelectItem>
                  {expertiseAreas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Mentors</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
              
              {(selectedExpertise !== "all" || selectedLocation !== "all" || selectedAvailability !== "all") && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedExpertise("all");
                    setSelectedLocation("all");
                    setSelectedAvailability("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {filteredMentors.length} Mentor{filteredMentors.length !== 1 ? 's' : ''} Found
              </h2>
              <p className="text-muted-foreground">
                Discover experienced professionals ready to guide your career journey
              </p>
            </div>
            
            {filteredMentors.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMentors.map((mentor) => (
                  <MentorCard 
                    key={mentor.id} 
                    mentor={mentor} 
                    onBook={(mentor) => {
                      // Navigate to auth or booking page
                      window.location.href = "/auth";
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters to find more mentors.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedExpertise("all");
                      setSelectedLocation("all");
                      setSelectedAvailability("all");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Popular Expertise Areas */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Expertise Areas</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore mentors by their areas of expertise
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {expertiseAreas.slice(0, 12).map((area) => (
                <Badge 
                  key={area} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm"
                  onClick={() => setSelectedExpertise(area)}
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Connect?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have accelerated their careers through mentorship.
            </p>
            <Button variant="secondary" size="xl" asChild>
              <a href="/auth">Start Your Journey</a>
            </Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default FindMentors;