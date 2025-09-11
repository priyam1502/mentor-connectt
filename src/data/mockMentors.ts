export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  expertise: string[];
  languages: string[];
  yearsExperience: number;
  bio: string;
  available: boolean;
  timezone: string;
  nextAvailable: string;
}

export const mockMentors: Mentor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c639749c?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 150,
    expertise: ["Product Strategy", "User Research", "Agile", "Leadership"],
    languages: ["English", "Spanish"],
    yearsExperience: 8,
    bio: "Experienced Product Manager with a passion for building user-centric products. I've led cross-functional teams at scale and love mentoring the next generation of product leaders.",
    available: true,
    timezone: "PST",
    nextAvailable: "Today, 3:00 PM"
  },
  {
    id: "2",
    name: "Mike Chen",
    title: "Principal Software Engineer",
    company: "Meta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 175,
    expertise: ["React", "TypeScript", "System Design", "Architecture"],
    languages: ["English", "Mandarin"],
    yearsExperience: 12,
    bio: "Full-stack engineer with expertise in modern web technologies. I enjoy helping developers level up their technical skills and advance their careers in tech.",
    available: true,
    timezone: "PST",
    nextAvailable: "Tomorrow, 10:00 AM"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "VP of Engineering",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    reviewCount: 203,
    hourlyRate: 200,
    expertise: ["Engineering Leadership", "Team Management", "Career Growth", "Technical Strategy"],
    languages: ["English", "Portuguese"],
    yearsExperience: 15,
    bio: "Engineering leader with a track record of building and scaling high-performing teams. I'm passionate about helping engineers transition into leadership roles.",
    available: false,
    timezone: "EST",
    nextAvailable: "Dec 15, 2:00 PM"
  },
  {
    id: "4",
    name: "David Kim",
    title: "Design Director",
    company: "Airbnb",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 140,
    expertise: ["UX Design", "Design Systems", "User Research", "Prototyping"],
    languages: ["English", "Korean"],
    yearsExperience: 10,
    bio: "Design leader focused on creating intuitive user experiences. I love mentoring designers who want to make a meaningful impact through thoughtful design.",
    available: true,
    timezone: "PST",
    nextAvailable: "Today, 6:00 PM"
  },
  {
    id: "5",
    name: "Rachel Thompson",
    title: "Marketing Director",
    company: "HubSpot",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 92,
    hourlyRate: 120,
    expertise: ["Digital Marketing", "Growth Strategy", "Content Marketing", "Analytics"],
    languages: ["English", "French"],
    yearsExperience: 9,
    bio: "Growth-focused marketer with experience in B2B and B2C. I help marketing professionals develop data-driven strategies and advance their careers.",
    available: true,
    timezone: "EST",
    nextAvailable: "Tomorrow, 1:00 PM"
  },
  {
    id: "6",
    name: "Alex Turner",
    title: "Data Science Manager",
    company: "Netflix",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 134,
    hourlyRate: 160,
    expertise: ["Machine Learning", "Data Analysis", "Python", "SQL"],
    languages: ["English"],
    yearsExperience: 11,
    bio: "Data scientist turned manager with a passion for turning data into actionable insights. I mentor aspiring data scientists and help them navigate their career paths.",
    available: true,
    timezone: "PST",
    nextAvailable: "Today, 4:30 PM"
  },
  {
    id: "7",
    name: "Lisa Wang",
    title: "Sales Director",
    company: "Salesforce",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    reviewCount: 78,
    hourlyRate: 130,
    expertise: ["Enterprise Sales", "Negotiation", "Customer Success", "Team Leadership"],
    languages: ["English", "Mandarin"],
    yearsExperience: 13,
    bio: "Enterprise sales leader with a proven track record of building high-performing sales teams. I mentor sales professionals looking to advance into leadership roles.",
    available: false,
    timezone: "PST",
    nextAvailable: "Dec 12, 11:00 AM"
  },
  {
    id: "8",
    name: "James Wilson",
    title: "DevOps Architect",
    company: "AWS",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 167,
    hourlyRate: 170,
    expertise: ["AWS", "Kubernetes", "CI/CD", "Infrastructure", "Security"],
    languages: ["English"],
    yearsExperience: 14,
    bio: "Cloud infrastructure expert helping companies scale their operations. I enjoy mentoring engineers who want to specialize in DevOps and cloud technologies.",
    available: true,
    timezone: "EST",
    nextAvailable: "Tomorrow, 9:00 AM"
  }
];