export interface KnowledgeItem {
  id: string;
  title: string;
  description?: string;
  keywords: string[];
  response: string;
  suggestions?: string[];
  relatedTopics?: string[];
  metadata?: Record<string, string | string[]>;
}

const knowledgeBase: Record<string, KnowledgeItem> = {
  skills: {
    id: "skills",
    title: "Technical Skills",
    keywords: [
      "skill", "skills", "tech", "technology", "stack", "programming",
      "language", "framework", "proficient", "tools", "coding", "abilities"
    ],
    response: `💻 Technical Skillset

• Languages: Python, JavaScript, TypeScript, C, C++, SQL  
• Frontend: React, Next.js, HTML5, CSS3, Tailwind  
• Backend: Node.js, Express.js, REST APIs  
• Databases: MongoDB, PostgreSQL, Redis, Firebase  
• AI/ML: TensorFlow, Keras, Scikit-learn, CNN, LSTM, NLP, Computer Vision  
• Cloud & DevOps: AWS, Docker, Git, CI/CD, Postman, Unix CLI  
• Core: Data Structures & Algorithms, OOP, System Design, Security, Cloud Deployment`,
    suggestions: [
      "Tell me about his projects",
      "What's his strongest skill?",
      "What cloud experience does he have?",
      "What AI frameworks does he use?"
    ],
    relatedTopics: ["projects", "experience", "certifications"],
    metadata: {
      Languages: ["Python", "JavaScript", "TypeScript", "C", "C++", "SQL"],
      Frontend: ["React", "Next.js", "HTML5", "CSS3", "Tailwind"],
      Backend: ["Node.js", "Express.js", "REST APIs"],
      Databases: ["MongoDB", "PostgreSQL", "Redis", "Firebase"],
      AI: ["TensorFlow", "Keras", "Scikit-learn", "CNN", "LSTM", "NLP", "Computer Vision"],
      Cloud: ["AWS", "Docker", "Git", "CI/CD", "Postman", "Unix CLI"]
    }
  },

  projects: {
    id: "projects",
    title: "Major Projects",
    keywords: ["project", "projects", "portfolio", "build", "app", "application", "developed", "created", "made"],
    response: `🚀 Highlighted Projects

🧠 AI Mock Interview Platform  
• Built with Next.js, Firebase, Vapi AI, and Google Gemini.  
• Realistic AI interviews with instant feedback.

📹 Video Sharing Platform  
• Next.js + Bunny.net CDN + Better Auth + Xata + Drizzle + Arcjet.  
• Secure video sharing with AI transcripts.

🧬 Brain Tumor Classification  
• 99.84% accuracy on 7,023 MRI scans.  
• CNN, VGG16, InceptionV3, EfficientNetB3. Published at IEEE 2024.

📝 LLM Text Detector  
• BERT model with 95.25% accuracy detecting AI-generated text.`,
    suggestions: [
      "Tell me more about the AI interview platform",
      "What was the brain tumor project?",
      "How did he build the video platform?",
      "Explain the LLM Text Detector"
    ],
    relatedTopics: ["skills", "publications", "experience"]
  },

  project_ai_interview: {
    id: "project_ai_interview",
    title: "AI Mock Interview Platform",
    keywords: ["interview", "mock interview", "ai interview", "gemini", "vapi", "voice agent"],
    response: `🧠 AI Mock Interview Platform

Tech Stack: Next.js, Firebase, Tailwind CSS, Vapi AI, Google Gemini API

Features:
• Conducts realistic mock interviews using AI voice agents
• Real-time scoring and feedback
• Firebase handles authentication and session storage
• Responsive design with Tailwind CSS

This project demonstrates full-stack development and AI integration for a practical real-world use case.`,
    suggestions: [
      "What other AI projects has he done?",
      "Tell me about his ML skills",
      "Show me more projects"
    ],
    relatedTopics: ["skills", "projects"],
    metadata: {
      TechStack: ["Next.js", "Firebase", "Tailwind", "Vapi AI", "Google Gemini"]
    }
  },

  project_video_platform: {
    id: "project_video_platform",
    title: "Video Sharing Platform",
    keywords: ["video", "screen recording", "screen record", "video platform", "bunny", "better auth", "arcjet"],
    response: `📹 Video Sharing Platform

Tech Stack: Next.js, TypeScript, Bunny.net, Better Auth, Xata, Arcjet, Drizzle ORM

Features:
• Screen recording and secure upload
• Global CDN delivery with Bunny.net
• AI-generated transcripts for accessibility
• Arcjet-powered advanced security

A cloud-native, production-ready platform showcasing serverless architecture.`,
    suggestions: [
      "How does the AI transcript work?",
      "What other full-stack projects?",
      "Tell me about his cloud skills"
    ],
    relatedTopics: ["skills", "projects", "experience"]
  },

  project_brain_tumor: {
    id: "project_brain_tumor",
    title: "Brain Tumor Classification",
    keywords: ["brain tumor", "tumor classification", "medical ai", "mri", "efficientnet", "cnn"],
    response: `🧬 Brain Tumor Classification

• Achieved 99.84% accuracy on 7,023 MRI scans
• Benchmarked CNN, VGG16, InceptionV3, EfficientNetB3
• Optimized EfficientNetB3 model for real-world clinical use
• Published at IEEE 2024 International Conference on Cognitive Robotics and Intelligent Systems

Demonstrates AI for healthcare, model optimization, and applied research.`,
    suggestions: [
      "What's his research background?",
      "Tell me about other AI projects",
      "What ML skills does he have?"
    ],
    relatedTopics: ["skills", "publications"]
  },

  project_llm_detector: {
    id: "project_llm_detector",
    title: "LLM Text Detector",
    keywords: ["llm", "text detect", "ai detect", "bert", "gpt", "nlp"],
    response: `📝 LLM Text Detector

• Developed using BERT
• 95.25% accuracy on detecting AI-generated content
• Fine-tuned transformer model for linguistic pattern analysis
• Applications in academic integrity and content moderation.`,
    suggestions: [
      "What other NLP work has he done?",
      "Tell me about his AI skills",
      "What are his research interests?"
    ],
    relatedTopics: ["skills", "projects"]
  },

  experience: {
    id: "experience",
    title: "Professional Experience",
    keywords: ["experience", "job", "work", "role", "position", "consultant", "employment", "career"],
    response: `💼 IT Consultant — Indiana University UITS  
Aug 2025 – Present | Bloomington, IN

• Troubleshot across Windows, macOS, and mobile platforms
• Optimized enterprise authentication, cloud storage, and learning systems
• Performed root-cause analysis and created documentation
• Improved resolution times and user experience

Skills Applied: Cross-platform support, Identity Management, Cloud Systems, Communication, Debugging`,
    suggestions: [
      "What kind of role is he seeking?",
      "Tell me about his education",
      "Can I contact him?"
    ],
    relatedTopics: ["skills", "education", "contact"]
  },

  education: {
    id: "education",
    title: "Education",
    keywords: ["education", "degree", "university", "college", "study", "academic", "school", "masters", "bachelor"],
    response: `🎓 Master of Science in Computer Science  
Indiana University Bloomington | Aug 2024 – May 2026  
CGPA: 3.73 / 4.0

Relevant Courses: Applied Algorithms, Software Engineering, Advanced Database Concepts, Applied ML, Computer Networks, Engineering Cloud Computing, Fundamentals & Applications of LLMs

🎓 Bachelor of Technology in CSE  
KIIT University, India | Aug 2020 – May 2024  
CGPA: 3.54 / 4.0

Achievement: Built a UAV with KIIT Robotics Society demonstrating practical engineering skills.`,
    suggestions: [
      "Tell me about his projects",
      "What certifications does he have?",
      "What LLM courses is he taking?"
    ],
    relatedTopics: ["projects", "certifications", "skills"]
  },

  certifications: {
    id: "certifications",
    title: "Certifications",
    keywords: ["certification", "certified", "certificate", "credential", "course", "training"],
    response: `🏆 Certifications

• AWS Academy Graduate — Introduction to Cloud (Semester 1)  
• DeepLearning.AI — Neural Networks & Deep Learning, Improving Deep Neural Networks  
• UAV Workshop — Built UAV with KIIT Robotics Society (hands-on engineering)`,
    suggestions: [
      "What cloud experience does he have?",
      "Tell me about his AI skills",
      "What courses has he completed?"
    ],
    relatedTopics: ["skills", "education"]
  },

  publications: {
    id: "publications",
    title: "Publications & Research",
    keywords: ["publication", "paper", "research", "ieee", "conference", "article"],
    response: `📄 Research Publication

"Identifying Various Types of Brain Tumors using Deep Neural Network based Image Features"  
Published at IEEE International Conference on Cognitive Robotics and Intelligent Systems (2024)

• 99.84% accuracy achieved using CNN and EfficientNetB3
• Research focused on medical AI and computational efficiency`,
    suggestions: [
      "Tell me about the brain tumor project",
      "What other AI projects has he done?"
    ],
    relatedTopics: ["projects", "skills"]
  },

  contact: {
    id: "contact",
    title: "Contact Information",
    keywords: ["contact", "email", "phone", "linkedin", "github", "reach", "connect", "hire", "portfolio", "website"],
    response: `📬 Let's Connect

Email: agarwaludit13@gmail.com  
Phone: +1 (930) 904-4901  
LinkedIn: linkedin.com/in/udit013  
GitHub: github.com/Udit013  
Portfolio: udit-portfolio-website.vercel.app

Actively seeking full-time roles starting May 2026.`,
    suggestions: [
      "Tell me about his experience",
      "What are his skills?",
      "What roles is he seeking?"
    ],
    relatedTopics: ["experience", "projects", "skills"]
  }
};

export default knowledgeBase;
