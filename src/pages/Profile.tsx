import { useState } from 'react';
import { Camera, MapPin, Calendar, Award, Edit2, Save, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';

const userProfile = {
  name: "Alex Thompson",
  title: "Senior Product Manager",
  company: "Tech Innovators Inc.",
  location: "San Francisco, CA",
  joinDate: "January 2024",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "Passionate product manager with 8+ years of experience in building user-centric products. I love mentoring aspiring PMs and sharing insights about product strategy, user research, and team leadership.",
  email: "alex.thompson@email.com",
  phone: "+1 (555) 123-4567",
  website: "https://alexthompson.dev",
  skills: ["Product Strategy", "User Research", "Agile", "Leadership", "Data Analysis", "A/B Testing"],
  stats: {
    sessions: 47,
    rating: 4.9,
    reviews: 32,
    hours: 156
  }
};

const achievements = [
  { title: "Top Mentor", description: "Rated 4.9+ stars", icon: Award },
  { title: "Session Expert", description: "50+ sessions completed", icon: Calendar },
  { title: "Knowledge Sharer", description: "Helped 100+ mentees", icon: Award }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving profile:", editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your profile information and preferences
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={editedProfile.avatar} />
                      <AvatarFallback className="text-2xl">
                        {editedProfile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {isEditing ? (
                      <Input
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="text-center font-semibold"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold">{editedProfile.name}</h2>
                    )}
                    
                    {isEditing ? (
                      <Input
                        value={editedProfile.title}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, title: e.target.value }))}
                        className="text-center"
                      />
                    ) : (
                      <p className="text-muted-foreground">{editedProfile.title}</p>
                    )}
                    
                    {isEditing ? (
                      <Input
                        value={editedProfile.company}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, company: e.target.value }))}
                        className="text-center"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{editedProfile.company}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {isEditing ? (
                      <Input
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="text-center text-sm"
                      />
                    ) : (
                      <span>{editedProfile.location}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Joined {editedProfile.joinDate}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{userProfile.stats.sessions}</p>
                    <p className="text-sm text-muted-foreground">Sessions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{userProfile.stats.rating}</p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{userProfile.stats.reviews}</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{userProfile.stats.hours}h</p>
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <achievement.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Bio</CardTitle>
                    <CardDescription>Tell others about yourself and your expertise</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                        rows={6}
                        placeholder="Write about yourself..."
                      />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">{editedProfile.bio}</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                    <CardDescription>Your areas of expertise and skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {editedProfile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="mt-4">
                        <Input placeholder="Add a new skill and press Enter" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>How others can reach you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                          type="email"
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-muted-foreground mt-1">{editedProfile.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                          type="tel"
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-muted-foreground mt-1">{editedProfile.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Website</label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.website}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, website: e.target.value }))}
                          type="url"
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-muted-foreground mt-1">
                          <a href={editedProfile.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            {editedProfile.website}
                          </a>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}