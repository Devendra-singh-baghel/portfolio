export interface ProjectLink {
  label: string;
  url: string;
  ariaLabel: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  stack: readonly string[];
  note?: string;
  description: readonly string[];
  image: {
    src: string;
    alt: string;
  };
  links: readonly ProjectLink[];
}

export const projects: readonly Project[] = [
  {
    id: "nexcart",
    title: "NexCart",
    subtitle: "E-Commerce Store",
    period: "March 2026 to present",
    stack: [
      "MERN",
      "Redux Toolkit",
      "JWT",
      "Bcrypt",
      "Cloudinary",
      "Multer",
      "Vite",
    ],
    note: "Razorpay: in progress",
    description: [
      "Full-stack e-commerce platform with RESTful APIs for product management, user authentication, cart and order processing using Express.js and MongoDB with Mongoose schemas.",
      "JWT authentication with bcrypt password hashing and role-based access control (admin / user) for protected API routes.",
      "Admin dashboard with CRUD for products and orders, including inventory and order status tracking.",
    ],
    image: {
      src: "/images/nexcart.png",
      alt: "Screenshot of NexCart E-Commerce platform",
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Devendra-singh-baghel/mern-e-commerce",
        ariaLabel: "NexCart on GitHub",
      },
    ],
  },
  {
    id: "studysync",
    title: "StudySync",
    subtitle: "Collaborative E-Learning Platform",
    period: "April 2025 to July 2025",
    stack: [
      "MERN",
      "Redux Toolkit",
      "Tailwind CSS",
      "Axios",
      "JWT",
      "Bcrypt",
      "Cloudinary",
      "Multer",
    ],
    description: [
      "Full-stack e-learning platform for notes sharing, doubt discussions, quizzes and user profiles.",
      "RESTful APIs with Express.js, MongoDB schemas with Mongoose, custom middleware for authentication guards and centralized error handling.",
      "15+ reusable React components with Redux Toolkit for global state.",
    ],
    image: {
      src: "/images/studysync.png",
      alt: "Screenshot of StudySync Collaborative E-Learning platform",
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Devendra-singh-baghel/studysync",
        ariaLabel: "StudySync on GitHub",
      },
    ],
  },
  {
    id: "mealmate",
    title: "MealMate",
    subtitle: "Recipe Finder",
    period: "Aug 2025 to Sept 2025",
    stack: [
      "React.js",
      "React Router",
      "Tailwind CSS",
      "TheMealDB API",
      "EmailJS",
      "Vite",
      "Vercel",
    ],
    description: [
      "Responsive, mobile-first recipe discovery app with ingredient or meal-name search, localStorage favorites and category filtering.",
    ],
    image: {
      src: "/images/mealmate.png",
      alt: "Screenshot of MealMate Recipe Finder application",
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Devendra-singh-baghel/MealMate-RecipeFinder",
        ariaLabel: "MealMate on GitHub",
      },
      {
        label: "Live",
        url: "https://mealmate-recipe-finder.vercel.app/",
        ariaLabel: "MealMate live website",
      },
    ],
  },
] as const;
