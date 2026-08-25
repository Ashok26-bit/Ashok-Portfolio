export const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Ashok K",
    title: "Software Developer | Full Stack & App Development",
    subtitle: "Computer Science Engineering Student & Creative Artist",
    email: "ashokk.profile.in@gmail.com",
    adminEmail: "ashokk.profile.in@gmail.com",
    phone: "+91 93421 12189",
    location: "Tamil Nadu, India",
    education: "B.E. Computer Science and Engineering (2023 - 2027)",
    college: "M.A.M College of Engineering and Technology",
    cgpa: "7.53 CGPA",
    github: "https://github.com/Ashok26-bit",
    linkedin: "https://www.linkedin.com/in/ashok-k-ashok/",
    bio: "Passionate Java Full Stack Developer and Computer Science Engineering student skilled in architecting scalable web applications, RESTful microservices, and reactive user interfaces. Proficient in Java, Spring Boot, React, and MongoDB, with hands-on internship experience in full-stack e-commerce engineering and independent platform architecture. Dedicated to clean code, robust database design, and blending analytical precision with creative traditional artistry.",
    status: "Available for Full-Stack Roles & Internships",
    defaultAvatar: "/ashok.png",
    avatarUrl: ""
  },

  about: {
    description: "Passionate Java Full Stack Developer and Computer Science Engineering student skilled in architecting scalable web applications, RESTful microservices, and reactive user interfaces. Proficient in Java, Spring Boot, React, and MongoDB, with hands-on internship experience in full-stack e-commerce engineering and independent platform architecture. Dedicated to clean code, robust database design, and blending analytical precision with creative traditional artistry.",
    highlights: [
      "Enterprise Full Stack Architectures with Java & Spring Boot",
      "Traditional Indian Sketching & Fine Art Craftsmanship",
      "Database Modeling with MongoDB & Relational SQL",
      "Agile & Responsive Client UI with React & Flutter"
    ]
  },
  
  projects: [],

  skillCategories: [
    {
      title: "Programming Languages",
      skills: [
        { id: "s-1", name: "Java", level: "Core & Advanced", primary: true },
        { id: "s-2", name: "SQL", level: "Relational Queries", primary: true }
      ]
    },
    {
      title: "Frameworks & Development",
      skills: [
        { id: "s-3", name: "Spring Boot", level: "Enterprise Backend", primary: true },
        { id: "s-4", name: "React", level: "Frontend UI", primary: true },
        { id: "s-5", name: "Android Studio", level: "Native Development", primary: true },
        { id: "s-6", name: "Flutter / Dart", level: "Cross-Platform", primary: false }
      ]
    },
    {
      title: "Web Technologies",
      skills: [
        { id: "s-7", name: "REST APIs", level: "API Architecture", primary: true },
        { id: "s-8", name: "HTML5", level: "Semantic Markup", primary: false },
        { id: "s-9", name: "CSS3", level: "Modern Styling", primary: false }
      ]
    },
    {
      title: "Database & Cloud",
      skills: [
        { id: "s-10", name: "MongoDB", level: "NoSQL Document DB", primary: true },
        { id: "s-11", name: "Cloudinary", level: "Cloud Media Storage", primary: false }
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { id: "s-12", name: "Git", level: "Version Control", primary: true },
        { id: "s-13", name: "GitHub", level: "Collaboration", primary: true },
        { id: "s-14", name: "Postman", level: "API Testing", primary: true },
        { id: "s-15", name: "Maven", level: "Build Automation", primary: false },
        { id: "s-16", name: "Linux", level: "Environment & CLI", primary: false }
      ]
    },
    {
      title: "Core Concepts",
      skills: [
        { id: "s-17", name: "OOPs", level: "Design Principles", primary: true },
        { id: "s-18", name: "Data Structures & Algorithms", level: "Problem Solving", primary: true },
        { id: "s-19", name: "DBMS", level: "Database Management", primary: true }
      ]
    }
  ],

  experiences: [
    {
      id: "exp-1",
      title: "Web Development Intern",
      organization: "Corizo",
      period: "October 2025 – January 2026",
      roleType: "Internship",
      credentialId: "Corizo Dice ID: CRZ136399",
      technologies: ["Java", "Spring Boot", "React", "REST APIs", "SQL", "Git"],
      bullets: [
        "Developed a full-stack E-commerce website utilizing modern software engineering practices.",
        "Built responsive, interactive frontend user interfaces using React.",
        "Engineered robust enterprise backend microservices and controllers using Spring Boot.",
        "Implemented end-to-end CRUD operations for comprehensive product and inventory management.",
        "Implemented secure user authentication and access control mechanisms.",
        "Collaborated with team members on responsive UI components and API integration."
      ]
    },
    {
      id: "exp-2",
      title: "Solo Full-Stack Developer",
      organization: "ArtIn – Professional Network for Artists & Artisans",
      period: "Project Experience",
      roleType: "Independent Development",
      credentialId: "Independent Full-Stack Initiative",
      technologies: ["Java", "Spring Boot", "Flutter", "Dart", "MongoDB", "Cloudinary"],
      bullets: [
        "Built a professional networking platform dedicated to connecting artists, artisans, and clients.",
        "Directly addressed digital visibility and market outreach challenges faced by local traditional artisans.",
        "Designed and implemented backend services for detailed artist profiles, portfolios, and artwork showcases.",
        "Supported real-time connectivity and interaction between artisans and prospective patrons.",
        "Architected a scalable, high-performance media-upload and delivery pipeline using cloud media storage."
      ]
    }
  ],

  certifications: [
    {
      id: "cert-1",
      title: "Java Programming",
      issuer: "Great Learning Academy",
      issueDate: "November 2024",
      credentialId: "ZMQBBOET",
      verificationUrl: "https://www.mygreatlearning.com/certificate/ZMQBBOET",
      skillsCovered: ["Core Java", "OOPs", "Exception Handling", "Collections Framework"]
    },
    {
      id: "cert-2",
      title: "Web Development Internship & Training",
      issuer: "Corizo (in association with IIT Bombay Mood Indigo)",
      issueDate: "Nov – Dec 2025",
      credentialId: "CRZ136399",
      verificationUrl: "",
      skillsCovered: ["Full-Stack Web Dev", "Spring Boot", "React", "REST APIs"]
    },
    {
      id: "cert-3",
      title: "Cybersecurity Analyst Job Simulation",
      issuer: "Tata & Forage",
      issueDate: "December 19, 2025",
      credentialId: "6944d281d7a9b049d8ee1a94",
      verificationUrl: "",
      skillsCovered: ["IAM Fundamentals", "Strategy Assessment", "Custom IAM Solutions", "Platform Integration"]
    },
    {
      id: "cert-4",
      title: "Big Data",
      issuer: "Infosys Springboard",
      issueDate: "Verified Credential",
      credentialId: "INF-SP-BD-2025",
      verificationUrl: "",
      skillsCovered: ["Big Data Concepts", "Data Processing", "Distributed Analytics"]
    },
    {
      id: "cert-5",
      title: "Introduction to Cybersecurity Awareness",
      issuer: "HP LIFE & HP Foundation",
      issueDate: "Verified Credential",
      credentialId: "HP-LIFE-SEC-2025",
      verificationUrl: "",
      skillsCovered: ["Cybersecurity Fundamentals", "Threat Awareness", "Digital Safety"]
    }
  ],

  education: {
    degree: "B.E. Computer Science and Engineering",
    institution: "M.A.M College of Engineering and Technology",
    location: "Tamil Nadu, India",
    period: "2023 – 2027",
    grade: "CGPA: 7.53",
    highlights: [
      "Focused on Core Software Engineering, Full-Stack Architecture, and Systems Design.",
      "Active participation in coding contests, technical symposiums, and software workshops.",
      "Strong academic foundation in Object Oriented Programming, Data Structures, Algorithms, and DBMS."
    ]
  },

  artworks: []
};
