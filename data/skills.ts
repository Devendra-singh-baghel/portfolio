export interface SkillGroup {
  name: string;
  skills: readonly string[];
}

export const skillGroups: readonly SkillGroup[] = [
  {
    name: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React",
      "Redux Toolkit",
      "React Router",
      "React Hook Form",
      "Tailwind CSS",
    ],
  },
  {
    name: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST API design",
      "PostgreSQL",
      "Sequelize ORM",
      "MongoDB",
      "Mongoose",
      "JWT authentication",
      "Bcrypt",
    ],
  },
  {
    name: "Tools and platforms",
    skills: [
      "Git",
      "GitHub",
      "Cloudinary",
      "Vite",
      "Vercel",
      "VS Code",
      "Claude",
      "Antigravity",
    ],
  },
  {
    name: "Currently learning",
    skills: [
      "Python",
      "FastAPI",
      "AI agent architecture",
      "Next.js",
    ],
  },
] as const;
