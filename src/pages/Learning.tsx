import { useState } from 'react';
import { BookOpen, Clock, Award, ChevronRight, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';

const learningPaths = [
  {
    id: 1,
    title: "Product Management Fundamentals",
    description: "Learn the core principles of product management from strategy to execution",
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    duration: "6 weeks",
    level: "Beginner",
    category: "Product"
  },
  {
    id: 2,
    title: "Advanced React & TypeScript",
    description: "Master modern React patterns and TypeScript for scalable applications",
    progress: 40,
    totalLessons: 15,
    completedLessons: 6,
    duration: "8 weeks",
    level: "Advanced",
    category: "Development"
  },
  {
    id: 3,
    title: "UX Design Principles",
    description: "Create user-centered designs that solve real problems",
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    duration: "4 weeks",
    level: "Intermediate",
    category: "Design"
  }
];

const recentLessons = [
  {
    id: 1,
    title: "User Story Mapping Workshop",
    course: "Product Management Fundamentals",
    duration: "45 min",
    completed: true,
    watchedOn: "2 days ago"
  },
  {
    id: 2,
    title: "Advanced React Hooks",
    course: "Advanced React & TypeScript",
    duration: "35 min",
    completed: true,
    watchedOn: "1 week ago"
  },
  {
    id: 3,
    title: "Component Testing Strategies",
    course: "Advanced React & TypeScript",
    duration: "50 min",
    completed: false,
    watchedOn: "In Progress"
  }
];

const achievements = [
  { title: "First Course Complete", description: "Completed your first learning path", icon: Award },
  { title: "Streak Master", description: "7 days learning streak", icon: CheckCircle },
  { title: "Knowledge Seeker", description: "Watched 25+ lessons", icon: BookOpen }
];

export default function Learning() {
  const [activeTab, setActiveTab] = useState("courses");

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Learning Center</h1>
            <p className="text-muted-foreground mt-2">
              Enhance your skills with curated learning paths and expert-led courses
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <BookOpen className="w-4 h-4 mr-2" />
            Browse All Courses
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Learning Hours</p>
                  <p className="text-2xl font-bold">47.5</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold">12 days</p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{path.title}</CardTitle>
                        <CardDescription>{path.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {path.duration}
                          </span>
                          <Badge className={getLevelColor(path.level)}>
                            {path.level}
                          </Badge>
                          <Badge variant="outline">{path.category}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{path.completedLessons} of {path.totalLessons} lessons completed</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <Card key={lesson.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">{lesson.course}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lesson.duration}
                          </span>
                          <span>{lesson.watchedOn}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {lesson.completed && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-0 shadow-sm bg-gradient-card">
                  <CardContent className="p-6 text-center space-y-4">
                    <achievement.icon className="w-12 h-12 text-primary mx-auto" />
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}