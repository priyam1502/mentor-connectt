import React, { useState } from 'react';
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
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';

const achievements = [
  { title: "Top Mentor", description: "Rated 4.9+ stars", icon: Award },
  { title: "Session Expert", description: "50+ sessions completed", icon: Calendar },
  { title: "Knowledge Sharer", description: "Helped 100+ mentees", icon: Award }
];

export default function Profile() {
  const { profile, mentorProfile, loading, updateProfile, uploadAvatar, isMentor } = useUserProfile();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  React.useEffect(() => {
    if (profile) {
      setEditedProfile(profile);
    }
  }, [profile]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">Profile not found</h2>
          <p className="text-muted-foreground">Unable to load your profile information.</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleSave = async () => {
    if (!editedProfile) return;
    
    const { error } = await updateProfile(editedProfile);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const { error } = await uploadAvatar(file);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to upload profile photo. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile photo updated successfully!",
      });
    }
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
                      <AvatarImage src={profile.avatar_url || undefined} />
                      <AvatarFallback className="text-2xl">
                        {profile.full_name?.split(' ').map(n => n[0]).join('') || profile.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2">
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <Button
                        size="sm"
                        className="rounded-full w-10 h-10 p-0"
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                        variant="outline"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {isEditing ? (
                      <Input
                        value={editedProfile?.full_name || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? ({ ...prev, full_name: e.target.value }) : null)}
                        className="text-center font-semibold"
                        placeholder="Full Name"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold">{profile.full_name || 'User'}</h2>
                    )}
                    
                    {isMentor && mentorProfile && (
                      <>
                        <p className="text-muted-foreground">{mentorProfile.title}</p>
                        <p className="text-sm text-muted-foreground">{mentorProfile.company}</p>
                      </>
                    )}
                    
                    <p className="text-sm text-muted-foreground capitalize">
                      {profile.user_type} • {profile.email}
                    </p>
                  </div>

                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Joined January 2024</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Stats for Mentors */}
                {isMentor && (
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">47</p>
                      <p className="text-sm text-muted-foreground">Sessions</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">4.9</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">32</p>
                      <p className="text-sm text-muted-foreground">Reviews</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">156h</p>
                      <p className="text-sm text-muted-foreground">Total Hours</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements for Mentors */}
            {isMentor && (
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
            )}
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
                        value={editedProfile?.bio || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? ({ ...prev, bio: e.target.value }) : null)}
                        rows={6}
                        placeholder="Write about yourself..."
                      />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.bio || 'No bio added yet.'}
                      </p>
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
                      {mentorProfile?.expertise_areas?.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                          {skill}
                        </Badge>
                      )) || (
                        <p className="text-muted-foreground">No skills added yet.</p>
                      )}
                    </div>
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
                      <p className="text-muted-foreground mt-1">{profile.email}</p>
                    </div>
                    
                    {isMentor && mentorProfile?.timezone && (
                      <div>
                        <label className="text-sm font-medium">Timezone</label>
                        <p className="text-muted-foreground mt-1">{mentorProfile.timezone}</p>
                      </div>
                    )}
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