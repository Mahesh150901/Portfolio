export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  color: string;
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  logo?: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  icon: string; // lucide icon name
}

export interface SkillCategory {
  category: string;
  description: string;
  items: SkillItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  color: string;
  image?: string;
  documentUrl?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
