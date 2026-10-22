export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: readonly string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  grade?: string;
  period?: string;
}

export const experiences: readonly ExperienceItem[] = [
  {
    role: "Backend Developer",
    company: "Dropty",
    period: "April 2026 to present",
    description: [
      "Developed backend features for a production baggage handling and logistics platform serving airline passengers, using Node.js, Express and PostgreSQL/Sequelize.",
      "Built an end-to-end PDF invoice generation system using pdfkit with a modular, reusable document architecture and cloud storage integration.",
      "Built an AI-powered document extraction pipeline using Google Gemini Vision API for automated form processing across multiple airline partners, achieving 90%+ field accuracy and reducing manual form-filling time by 80%.",
      "Integrated a third-party SOAP/XML airline booking system into the Node.js backend for real-time booking data retrieval.",
    ],
  },
] as const;

export const education: readonly EducationItem[] = [
  {
    degree: "Master of Computer Application",
    institution: "Awadhesh Pratap Singh University, Rewa",
    grade: "CGPA 8.2",
  },
  {
    degree: "Bachelor of Computer Application",
    institution: "Awadhesh Pratap Singh University, Rewa",
    grade: "65.5%",
  },
  {
    degree: "MERN Stack Training",
    institution: "DUCAT Training Center",
    period: "Sept 2025 to June 2026",
  },
] as const;
