import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import MentorCard from "@/components/MentorCard";
import { mockMentors, Mentor } from "@/data/mockMentors";
import { useToast } from "@/hooks/use-toast";

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState("all");
  const [availability, setAvailability] = useState("all");
  const { toast } = useToast();

  // Get all unique expertise areas
  const allExpertise = [...new Set(mockMentors.flatMap(mentor => mentor.expertise))];

  const handleExpertiseToggle = (expertise: string) => {
    setSelectedExpertise(prev => 
      prev.includes(expertise)
        ? prev.filter(e => e !== expertise)
        : [...prev, expertise]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedExpertise([]);
    setPriceRange("all");
    setAvailability("all");
  };

  const handleBookMentor = (mentor: Mentor) => {
    toast({
      title: "Booking Session",
      description: `Redirecting to book a session with ${mentor.name}...`,
    });
    // In a real app, this would open a booking modal or redirect to booking page
  };

  // Filter mentors based on search and filters
  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesExpertise = selectedExpertise.length === 0 || 
                            selectedExpertise.some(skill => mentor.expertise.includes(skill));

    const matchesPrice = priceRange === "all" ||
                        (priceRange === "under-100" && mentor.hourlyRate < 100) ||
                        (priceRange === "100-150" && mentor.hourlyRate >= 100 && mentor.hourlyRate <= 150) ||
                        (priceRange === "over-150" && mentor.hourlyRate > 150);

    const matchesAvailability = availability === "all" ||
                               (availability === "available" && mentor.available) ||
                               (availability === "unavailable" && !mentor.available);

    return matchesSearch && matchesExpertise && matchesPrice && matchesAvailability;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Mentor</h1>
          <p className="text-muted-foreground">
            Connect with industry experts who can accelerate your career growth
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Mentors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, title, company, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Filter Dropdowns */}
              <div className="flex gap-2">
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-100">Under $100</SelectItem>
                    <SelectItem value="100-150">$100 - $150</SelectItem>
                    <SelectItem value="over-150">Over $150</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Mentors</SelectItem>
                    <SelectItem value="available">Available Now</SelectItem>
                    <SelectItem value="unavailable">Not Available</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Expertise Filter */}
            <div>
              <p className="text-sm font-medium mb-3">Filter by Expertise:</p>
              <div className="flex flex-wrap gap-2">
                {allExpertise.slice(0, 12).map((expertise) => (
                  <Badge
                    key={expertise}
                    variant={selectedExpertise.includes(expertise) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => handleExpertiseToggle(expertise)}
                  >
                    {expertise}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground">
              Found {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onBook={handleBookMentor}
              />
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-muted-foreground">
                  <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No mentors found</h3>
                  <p>Try adjusting your search criteria or clearing your filters.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Mentors;