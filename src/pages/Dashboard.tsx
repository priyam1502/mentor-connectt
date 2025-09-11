import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, BookOpen, TrendingUp, Clock, Star } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const stats = [
    {
      title: "Upcoming Sessions",
      value: "3",
      description: "Next session in 2 hours",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Mentors Connected",
      value: "8",
      description: "Across 5 different areas",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Learning Hours",
      value: "24",
      description: "This month",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Progress Score",
      value: "85%",
      description: "+12% from last month",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const recentSessions = [
    {
      mentor: "Sarah Johnson",
      topic: "Product Management Strategy",
      date: "Today, 3:00 PM",
      status: "upcoming",
    },
    {
      mentor: "Mike Chen",
      topic: "React Best Practices",
      date: "Yesterday, 2:00 PM",
      status: "completed",
    },
    {
      mentor: "Emily Rodriguez",
      topic: "Career Growth Planning",
      date: "Dec 8, 4:00 PM",
      status: "completed",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-white/80 text-lg">
            Ready to continue your learning journey? You have 3 upcoming sessions this week.
          </p>
          <Button variant="hero-outline" className="mt-4">
            Book New Session
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Sessions
              </CardTitle>
              <CardDescription>
                Your latest mentorship sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {session.mentor.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{session.mentor}</p>
                      <p className="text-sm text-muted-foreground">{session.topic}</p>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    session.status === 'upcoming' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {session.status}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Learning Progress
              </CardTitle>
              <CardDescription>
                Your skill development this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Product Management</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>React Development</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-secondary h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Leadership</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;