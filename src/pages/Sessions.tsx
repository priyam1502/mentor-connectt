import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MessageSquare, User, MapPin } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Sessions = () => {
  const upcomingSessions = [
    {
      id: "1",
      mentor: "Sarah Johnson",
      mentorAvatar: "https://images.unsplash.com/photo-1494790108755-2616c639749c?w=60&h=60&fit=crop&crop=face",
      title: "Product Strategy Deep Dive",
      date: "Today",
      time: "3:00 PM - 4:00 PM",
      timezone: "PST",
      status: "upcoming",
      type: "Video Call",
    },
    {
      id: "2", 
      mentor: "Mike Chen",
      mentorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      title: "React Best Practices Workshop",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      timezone: "PST",
      status: "upcoming",
      type: "Video Call",
    },
    {
      id: "3",
      mentor: "David Kim",
      mentorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      title: "UX Design Critique Session",
      date: "Dec 15",
      time: "2:00 PM - 3:00 PM",
      timezone: "PST",
      status: "upcoming",
      type: "Video Call",
    },
  ];

  const pastSessions = [
    {
      id: "4",
      mentor: "Emily Rodriguez",
      mentorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      title: "Career Growth Planning",
      date: "Dec 8",
      time: "4:00 PM - 5:00 PM",
      timezone: "EST",
      status: "completed",
      type: "Video Call",
      rating: 5,
    },
    {
      id: "5",
      mentor: "Alex Turner",
      mentorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
      title: "Data Science Career Path",
      date: "Dec 5",
      time: "1:00 PM - 2:00 PM",
      timezone: "PST",
      status: "completed",
      type: "Video Call",
      rating: 5,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Sessions</h1>
            <p className="text-muted-foreground">
              Manage your upcoming and past mentorship sessions
            </p>
          </div>
          <Button variant="hero">
            <Calendar className="h-4 w-4 mr-2" />
            Book New Session
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Total Mentors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Hours This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>
              Your scheduled mentorship sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border">
                <div className="flex items-center gap-4">
                  <img
                    src={session.mentorAvatar}
                    alt={session.mentor}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">with {session.mentor}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{session.timezone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(session.status)}>
                    {session.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="default" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Past Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Past Sessions
            </CardTitle>
            <CardDescription>
              Your completed mentorship sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pastSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-muted">
                <div className="flex items-center gap-4">
                  <img
                    src={session.mentorAvatar}
                    alt={session.mentor}
                    className="w-12 h-12 rounded-full object-cover opacity-80"
                  />
                  <div>
                    <h3 className="font-semibold">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">with {session.mentor}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(session.status)}>
                    {session.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      View Notes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;