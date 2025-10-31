import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Download, ExternalLink, Mail, Github, Linkedin, Award, Code, Briefcase, GraduationCap, Sparkles } from "lucide-react";

interface OutputLine {
  type: "command" | "output" | "error" | "success" | "info";
  content: string;
  timestamp?: Date;
}

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([
    {
      type: "info",
      content: "╔═══════════════════════════════════════════════════════════╗\n  Welcome to Udit's Interactive Terminal                   \n  Type 'help' for commands • 'intro' for quick start       \n╚═══════════════════════════════════════════════════════════╝",
      timestamp: new Date()
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [tabComplete, setTabComplete] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Typing animation
  const typeOutput = (text: string, type: "output" | "success" | "info" = "output") => {
    setIsTyping(true);
    const lines = text.split('\n');
    let currentLine = 0;

    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setOutput(prev => [...prev, {
          type,
          content: lines[currentLine],
          timestamp: new Date()
        }]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  const addOutput = (content: string, type: OutputLine["type"] = "output") => {
    setOutput(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

  const commands: Record<string, { description: string; execute: () => void }> = {
    help: {
      description: "Display all available commands",
      execute: () => {
        const helpText = `
╭─────────────────── AVAILABLE COMMANDS ───────────────────╮
                                                          
  📋 INFORMATION                                          
    whoami      - Display personal information            
    intro       - Interactive introduction sequence       
    about       - Detailed background summary             
                                                           
  💻 TECHNICAL                                             
    skills      - Technical skills & expertise            
    skills-tree - Visual skills breakdown                 
    tech-stack  - Complete technology stack               
                                                           
  🚀 PORTFOLIO                                             
    projects    - Featured projects overview              
    project <n> - Details on specific project (1-4)       
    publications- Research & publications                  
                                                           
  🎓 BACKGROUND                                            
    education   - Academic credentials                    
    experience  - Professional experience                 
    achievements- Awards & certifications                 
                                                           
  📬 CONNECT                                               
    contact     - Contact information                     
    social      - Social media profiles                   
    resume      - Download resume                         
    email       - Send email                              
                                                           
  🛠️  UTILITIES                                            
    quote       - Random tech quote                       
    stats       - Profile statistics                                    
    clear       - Clear terminal                          
    history     - Show command history                                    
                                                           
╰───────────────────────────────────────────────────────────╯

💡 TIP: Use TAB for auto-completion • UP/DOWN for history`;
        typeOutput(helpText, "info");
      }
    },
    whoami: {
      description: "Display personal information",
      execute: () => {
        const text = `
╔═══════════════════════════════════════════════════════════╗
║                    UDIT AGARWAL                           ║
╠═══════════════════════════════════════════════════════════╣
                                                                
  🎯 AI Engineer & Full-Stack Developer                    
  🎓 MS Computer Science @ Indiana University              
  📊 CGPA: 3.73/4.0                                        
  📍 Bloomington, Indiana, USA                             
                                                           
  🔬 Specialization:                                        
     • Artificial Intelligence & Machine Learning          
     • Full-Stack Web Development                          
     • Cloud Computing & DevOps                            
                                                           
  🎯 Currently seeking full-time opportunities            
     Starting: May 2026                                   
                                                           
╚═══════════════════════════════════════════════════════════╝`;
        typeOutput(text, "success");
      }
    },
    intro: {
      description: "Interactive introduction sequence",
      execute: () => {
        const intro = `
🚀 Initializing profile data...

> Loading: Udit Agarwal
> Status: Graduate Student @ Indiana University
> Specialization: AI/ML + Full-Stack Development

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 QUICK HIGHLIGHTS:

   ✓ 99.84% accuracy on Brain Tumor Classification (IEEE Published)
   ✓ 95.25% accuracy on LLM Text Detection
   ✓ Built AI Mock Interview Platform with Gemini API
   ✓ Developed Full-Stack Video Sharing Platform
   ✓ AWS Certified Cloud Practitioner
   ✓ Current: IT Consultant @ Indiana University UITS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Try these commands:
   • 'projects' - View detailed project portfolio
   • 'skills-tree' - Interactive skills breakdown
   • 'contact' - Get in touch`;
        typeOutput(intro, "success");
      }
    },
    about: {
      description: "Detailed background summary",
      execute: () => {
        const about = `
📖 ABOUT UDIT AGARWAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I'm a passionate AI Engineer and Full-Stack Developer currently pursuing
my Master's in Computer Science at Indiana University Bloomington with a
3.73 GPA. My journey in tech is driven by a deep fascination with
building intelligent systems that solve real-world problems.

🎯 WHAT I DO:
   • Design and deploy machine learning models for production
   • Build scalable full-stack applications with modern frameworks
   • Integrate AI capabilities into web platforms
   • Optimize cloud infrastructure and DevOps workflows

🏆 NOTABLE ACHIEVEMENTS:
   • Published IEEE research paper on medical AI
   • Achieved 99.84% accuracy in brain tumor classification
   • Built AI-powered interview platform used by job seekers
   • AWS certified with hands-on cloud deployment experience

🔬 CURRENT FOCUS:
   • Large Language Models and their applications
   • Advanced database systems and optimization
   • Cloud-native architectures
   • AI/ML in production environments

💼 SEEKING:
Full-time opportunities in AI/ML Engineering or Full-Stack Development
starting May 2026. Eager to contribute to innovative teams building
the future of technology.`;
        typeOutput(about, "info");
      }
    },
    skills: {
      description: "Technical skills & expertise",
      execute: () => {
        const skills = `
💻 TECHNICAL SKILLS & EXPERTISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔤 PROGRAMMING LANGUAGES
   Python │ Primary AI/ML language
   JavaScript │ Full-stack development
   TypeScript │ Type-safe applications
   C/C++ │ Systems programming
   SQL │ Database management

⚛️  FRONTEND TECHNOLOGIES
   • React & Next.js - Modern web applications
   • HTML5 & CSS3 - Semantic markup & styling
   • Tailwind CSS - Utility-first styling
   • Responsive Design - Mobile-first approach

🔧 BACKEND & DATABASES
   • Node.js & Express.js - Server-side JavaScript
   • REST APIs - RESTful service design
   • Firebase - Real-time database & auth
   • MongoDB - NoSQL databases
   • PostgreSQL - Relational databases
   • Redis - Caching & session management

🤖 AI/ML STACK
   • TensorFlow & Keras - Deep learning frameworks
   • Scikit-learn - Classical ML algorithms
   • CNNs & LSTM - Neural architectures
   • NLP - Natural Language Processing
   • Computer Vision - Image analysis
   • Time Series Analysis - Temporal data

☁️  CLOUD & DEVOPS
   • AWS (Certified) - Cloud infrastructure
   • Docker - Containerization
   • Git & GitHub - Version control
   • CI/CD - Automated pipelines
   • Unix/Linux CLI - System administration
   • Postman - API testing

🎯 CORE COMPETENCIES
   • Data Structures & Algorithms
   • Object-Oriented Programming
   • System Design & Architecture
   • Security Best Practices
   • Agile Development Methodologies`;
        typeOutput(skills, "output");
      }
    },
    "skills-tree": {
      description: "Visual skills breakdown",
      execute: () => {
        const tree = `
🌳 SKILLS TREE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    🎯 UDIT AGARWAL
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    🤖 AI/ML        💻 FULL-STACK      ☁️  CLOUD
        │                 │                 │
    ┌───┴───┐         ┌───┴───┐         ┌───┴───┐
    │       │         │       │         │       │
   DL     NLP    Frontend Backend     AWS   Docker
    │       │         │       │         │       │
  ┌─┴─┐   ┌─┴─┐     ┌─┴─┐   ┌─┴─┐     ┌─┴─┐   ┌─┴─┐
  │   │   │   │     │   │   │   │     │   │   │   │
 CNN LSTM BERT GPT React Next Node API  EC2  ECS  CI/CD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type 'skills' for detailed breakdown`;
        typeOutput(tree, "info");
      }
    },
    "tech-stack": {
      description: "Complete technology stack",
      execute: () => {
        const stack = `
🔧 COMPLETE TECHNOLOGY STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LAYER              TECHNOLOGIES
──────────────────────────────────────────────────────────
Frontend           React • Next.js • TypeScript • Tailwind
UI/UX              Responsive Design • Accessibility • PWA
State Management   React Hooks • Context API • Redux
──────────────────────────────────────────────────────────
Backend            Node.js • Express.js • REST APIs
Authentication     Firebase Auth • Better Auth • JWT
Real-time          WebSockets • Firebase Realtime DB
──────────────────────────────────────────────────────────
Databases          MongoDB • PostgreSQL • Redis • Xata
ORM/ODM            Drizzle • Mongoose • Prisma
Caching            Redis • In-Memory Storage
──────────────────────────────────────────────────────────
AI/ML              TensorFlow • Keras • Scikit-learn
NLP                BERT • Transformers • Gemini API
Computer Vision    CNNs • Image Classification
Voice AI           Vapi AI • Speech Recognition
──────────────────────────────────────────────────────────
Cloud/DevOps       AWS • Docker • Git • GitHub Actions
CDN                Bunny.net • Cloudflare
Monitoring         CloudWatch • Logging • Analytics
Security           Arcjet • OWASP • Input Validation
──────────────────────────────────────────────────────────
Tools              VS Code • Postman • Figma • Unix CLI
Testing            Jest • React Testing Library
Documentation      Markdown • JSDoc • OpenAPI`;
        typeOutput(stack, "output");
      }
    },
    projects: {
      description: "Featured projects overview",
      execute: () => {
        const projects = `
🚀 FEATURED PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] 🎤 AI MOCK INTERVIEW PLATFORM
    Tech: Next.js, Firebase, Vapi AI, Google Gemini, Tailwind
    
    A full-stack platform that simulates realistic job interviews
    using AI voice agents and provides instant performance feedback.
    
    ✓ Real-time voice interaction with Vapi AI
    ✓ AI-powered feedback using Google Gemini API
    ✓ Secure authentication with Firebase
    ✓ Responsive UI with Tailwind CSS
    ✓ Helps users prepare for actual interviews

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[2] 🎥 VIDEO SHARING PLATFORM
    Tech: Next.js, TypeScript, Bunny.net, Better Auth, Xata
    
    Modern serverless video platform with screen recording,
    AI transcripts, and global CDN delivery.
    
    ✓ Screen recording and video upload capabilities
    ✓ Global video delivery via Bunny.net CDN
    ✓ AI-generated transcripts for accessibility
    ✓ Advanced security with Arcjet
    ✓ Scalable database with Xata + Drizzle ORM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[3] 🧠 BRAIN TUMOR CLASSIFICATION
    Tech: Python, TensorFlow, Deep Learning, CNNs
    
    Medical AI system achieving 99.84% accuracy on 7,023 MRI
    scans. Published at IEEE 2024 Conference.
    
    ✓ Benchmarked multiple architectures (CNN, VGG16, etc.)
    ✓ 99.84% accuracy with EfficientNetB3
    ✓ Optimized for clinical deployment (11.7M parameters)
    ✓ IEEE published research paper
    ✓ Real-world diagnostic application

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[4] 🔍 LLM TEXT DETECTOR
    Tech: Python, BERT, NLP, Deep Learning
    
    Detects AI-generated content with 95.25% accuracy to
    combat disinformation and maintain academic integrity.
    
    ✓ Fine-tuned BERT model for text classification
    ✓ 95.25% accuracy on curated dataset
    ✓ Analyzes linguistic patterns and context
    ✓ Applications in content moderation
    ✓ Helps maintain digital content authenticity

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Type 'project 1' through 'project 4' for detailed information
📚 Type 'publications' to see research papers`;
        typeOutput(projects, "output");
      }
    },
    project: {
      description: "Details on specific project (1-4)",
      execute: () => {
        addOutput("Usage: project <1-4>", "error");
        addOutput("Example: project 1", "info");
      }
    },
    publications: {
      description: "Research & publications",
      execute: () => {
        const pubs = `
📚 PUBLICATIONS & RESEARCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] "Identifying Various Types of Brain Tumors using Deep 
     Neural Network based Image Features"
     
     Published: 2024 IEEE International Conference on 
                Cognitive Robotics and Intelligent Systems
     
     Authors: Udit Agarwal et al.
     DOI: 10.1109/ICC-ROBINS60238.2024.10533941
     
     Abstract: This paper presents a comprehensive approach to
     classifying brain tumors from MRI scans using deep neural
     networks. We achieved 99.84% accuracy by benchmarking
     multiple architectures and selecting EfficientNetB3 for
     optimal performance and efficiency.
     
     Key Contributions:
     • Novel approach to medical image classification
     • Comparative analysis of multiple DNN architectures
     • Clinical deployment optimization
     • High accuracy with computational efficiency
     
     Impact: Potential to assist radiologists in rapid and
     accurate brain tumor diagnosis, improving patient outcomes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 Research Interests:
   • Medical AI and Computer Vision
   • Natural Language Processing
   • Large Language Models
   • Deep Learning Optimization
   • AI Ethics and Safety`;
        typeOutput(pubs, "output");
      }
    },
    education: {
      description: "Academic credentials",
      execute: () => {
        const edu = `
🎓 ACADEMIC BACKGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

╔═══════════════════════════════════════════════════════════╗
║  MASTER OF SCIENCE IN COMPUTER SCIENCE                    ║
╠═══════════════════════════════════════════════════════════╣
  🏛️  Indiana University Bloomington                       
  📅 August 2024 - May 2026 (Expected)                     
  📊 CGPA: 3.73/4.0                                        
                                                           
  📚 Relevant Coursework:                                  
     • Applied Algorithms                                  
     • Software Engineering                                
     • Advanced Database Concepts                          
     • Applied Machine Learning                            
     • Computer Networks                                   
     • Engineering Cloud Computing                         
     • Fundamentals & Applications of LLMs                 
╚═══════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════╗
║  BACHELOR OF TECHNOLOGY                                   ║
║  Computer Science & Engineering                           ║
╠═══════════════════════════════════════════════════════════╣
  🏛️  Kalinga Institute of Industrial Technology (KIIT)    
  📍 Bhubaneswar, India                                    
  📅 August 2020 - May 2024                                
  📊 CGPA: 3.54/4.0                                                                                                  
  🏆 Notable Achievement:                                   
     Built a UAV with KIIT Robotics Society                
     Hands-on engineering workshop                         
╚═══════════════════════════════════════════════════════════╝`;
        typeOutput(edu, "success");
      }
    },
    experience: {
      description: "Professional experience",
      execute: () => {
        const exp = `
💼 PROFESSIONAL EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

╭───────────────────────────────────────────────────────────╮
│ IT CONSULTANT                                             │
│ University Information Technology Services (UITS)         │
│ Indiana University - Bloomington, IN                      │
│ August 2025 - Present (Part-Time)                         │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ Responsibilities:                                         │
│ • Enterprise system troubleshooting (Windows, macOS)      │
│ • Identity & access management support                    │
│ • Network diagnostics and resolution                      │
│ • Technical documentation authoring                       │
│ • Workflow optimization and automation                    │
│                                                           │
│ Key Achievements:                                         │
│ • Reduced average resolution time through systematic      │
│   debugging and root-cause analysis                       │
│ • Enhanced user experience across authentication and      │
│   cloud storage systems                                   │
│ • Created comprehensive documentation for common issues   │
│                                                           │
│ Skills Applied:                                           │
│ Cross-platform troubleshooting • Enterprise IT systems    │
│ Identity management • Technical communication             │
╰───────────────────────────────────────────────────────────╯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 CAREER GOALS:
   Seeking full-time opportunities in:
   • AI/ML Engineering
   • Full-Stack Development
   • Cloud Engineering
   
   Available: May 2026
   
💡 Passionate about building intelligent systems that solve
   real-world problems and create meaningful impact.`;
        typeOutput(exp, "output");
      }
    },
    achievements: {
      description: "Awards & certifications",
      execute: () => {
        const achieve = `
🏆 ACHIEVEMENTS & CERTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📜 CERTIFICATIONS

✓ AWS Academy Graduate
  → Introduction to Cloud, Semester 1
  → Cloud architecture and deployment fundamentals
  → EC2, S3, RDS, Lambda, CloudFormation

✓ DeepLearning.AI Specialization
  → Neural Networks and Deep Learning
  → Improving Deep Neural Networks
  → Hyperparameter tuning and optimization
  → Regularization and batch normalization

✓ Hands-on Engineering Workshop
  → Built UAV with KIIT Robotics Society
  → Applied engineering and problem-solving skills
  → Collaborative hardware-software integration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 KEY ACHIEVEMENTS

⭐ IEEE Publication
   Published research on brain tumor classification at
   international conference (2024)

⭐ 99.84% Model Accuracy
   Achieved exceptional accuracy in medical image
   classification on 7,023 MRI scans

⭐ 95.25% Detection Rate
   Built LLM text detector for AI-generated content
   with high precision

⭐ Production Applications
   Deployed multiple full-stack applications used by
   real users in production environments

⭐ Academic Excellence
   Maintained 3.73/4.0 GPA in competitive MS program`;
        typeOutput(achieve, "success");
      }
    },
    contact: {
      description: "Contact information",
      execute: () => {
        const contact = `
📬 CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

╔═══════════════════════════════════════════════════════════╗
                     GET IN TOUCH                          
╠═══════════════════════════════════════════════════════════╣
                                                           
  📧 Email:    agarwaludit13@gmail.com                     
  📱 Phone:    +1 (930) 904-4901                           
  📍 Location: Bloomington, Indiana, USA                   
                                                           
  🔗 LinkedIn: linkedin.com/in/udit013                     
  💻 GitHub:   github.com/Udit013                          
  🌐 Portfolio: udit-portfolio-website.vercel.app          
                                                           
╚═══════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💼 AVAILABILITY:
   Open to full-time opportunities starting May 2026
   
🤝 LOOKING FOR:
   • AI/ML Engineering roles
   • Full-Stack Development positions
   • Cloud Engineering opportunities
   
💡 INTEREST AREAS:
   • Building intelligent systems
   • Scalable web applications
   • Medical AI and healthcare tech
   • Developer tools and infrastructure

Feel free to reach out for collaborations, opportunities,
or just to chat about technology!

Type 'email' to open email client
Type 'social' to view all social profiles`;
        typeOutput(contact, "success");
      }
    },
    social: {
      description: "Social media profiles",
      execute: () => {
        const social = `
🌐 SOCIAL PROFILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LinkedIn → linkedin.com/in/udit013
   Professional network, experience, and endorsements

GitHub → github.com/Udit013
   Open source projects, code repositories, contributions

Portfolio → udit-portfolio-website.vercel.app
   Projects showcase, blog, and interactive resume

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Opening social profiles...`;
        typeOutput(social, "output");
        setTimeout(() => {
          window.open("https://linkedin.com/in/udit013", "_blank");
          window.open("https://github.com/Udit013", "_blank");
          window.open("https://udit-portfolio-website.vercel.app", "_blank");
        }, 1000);
      }
    },
    resume: {
      description: "Download resume",
      execute: () => {
        addOutput("📄 Preparing resume download...", "success");
        addOutput("Opening resume in new tab...", "info");
        setTimeout(() => {
          window.open("/resume.docx", "_blank");
        }, 500);
      }
    },
    email: {
      description: "Send email",
      execute: () => {
        addOutput("📧 Opening email client...", "success");
        window.location.href = "mailto:agarwaludit13@gmail.com?subject=Hello%20Udit!";
      }
    },
    quote: {
      description: "Random tech quote",
      execute: () => {
        const quotes = [
          '"First, solve the problem. Then, write the code."\n— John Johnson',
          '"Code is like humor. When you have to explain it, it\'s bad."\n— Cory House',
          '"Make it work, make it right, make it fast."\n— Kent Beck',
          '"The best error message is the one that never shows up."\n— Thomas Fuchs',
          '"Simplicity is the soul of efficiency."\n— Austin Freeman',
          '"Any fool can write code that a computer can understand.\nGood programmers write code that humans can understand."\n— Martin Fowler',
          '"The only way to learn a new programming language is by writing programs in it."\n— Dennis Ritchie',
          '"Programs must be written for people to read, and only incidentally for machines to execute."\n— Harold Abelson',
          '"Talk is cheap. Show me the code."\n— Linus Torvalds',
          '"The function of good software is to make the complex appear to be simple."\n— Grady Booch'
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteOutput = `
╔═══════════════════════════════════════════════════════════╗
                    💭 TECH WISDOM                          
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
${randomQuote.split('\n').map(line => `║  ${line.padEnd(57)}║`).join('\n')}
║                                                           ║
╚═══════════════════════════════════════════════════════════╝`;
        typeOutput(quoteOutput, "info");
      }
    },
    stats: {
      description: "Profile statistics",
      execute: () => {
        const stats = `
📊 PROFILE STATISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

╭─────────────────── OVERVIEW ─────────────────────╮
                                                  
  🎓 Years of Education:        6+ years          
  💼 Professional Experience:   2+ years          
  🚀 Projects Completed:        15+               
  📚 Publications:              1 (IEEE)          
  🏆 Certifications:            3                 
                                                  │
╰──────────────────────────────────────────────────╯

╭─────────────────── TECHNICAL ────────────────────╮
                                                   
  💻 Programming Languages:     6                 
  🔧 Frameworks & Libraries:    20+               
  ☁️  Cloud Platforms:          AWS (Certified)   
  🤖 ML Models Deployed:        4                 
  📦 Open Source Repos:         25+               
                                                   
╰───────────────────────────────────────────────────╯

╭─────────────────── ACHIEVEMENTS ─────────────────╮
                                                   
  🎯 Best Model Accuracy:       99.84%             
  📄 Research Citations:        Growing            
  👥 Projects Impact:           100+ users         
  ⭐ GitHub Stars:              Growing            
  🌍 Global Reach:              Multi-continent    
                                                   
╰───────────────────────────────────────────────────╯`;
        typeOutput(stats, "info");
      }
    },
    history: {
      description: "Show command history",
      execute: () => {
        if (history.length === 0) {
          addOutput("No commands in history yet.", "info");
        } else {
          addOutput("\n📜 COMMAND HISTORY:", "info");
          history.forEach((cmd, idx) => {
            addOutput(`  ${idx + 1}. ${cmd}`, "output");
          });
          addOutput(`\nTotal commands: ${history.length}`, "info");
        }
      }
    },
    clear: {
      description: "Clear terminal",
      execute: () => {
        setOutput([{
          type: "info",
          content: "Terminal cleared. Type 'help' for available commands.",
          timestamp: new Date()
        }]);
      }
    },
    exit: {
      description: "Exit terminal",
      execute: () => {
        addOutput("Thanks for visiting! Terminal session ending...", "success");
        setTimeout(() => {
          addOutput("👋 Goodbye! Feel free to come back anytime.", "info");
        }, 500);
      }
    }
  };

  // Handle project subcommands
  const handleProjectCommand = (projectNum: string) => {
    const projects: Record<string, string> = {
      "1": `
🎤 AI MOCK INTERVIEW PLATFORM - DETAILED VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PROJECT OVERVIEW:
A comprehensive full-stack platform designed to help job seekers
practice and improve their interview skills using cutting-edge AI
technology.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠️  TECHNOLOGY STACK:

Frontend:
• Next.js - React framework for server-side rendering
• Tailwind CSS - Utility-first styling
• TypeScript - Type-safe development

Backend:
• Firebase - Authentication & real-time database
• Next.js API Routes - Serverless functions

AI Integration:
• Vapi AI - Voice agent for natural conversation
• Google Gemini API - Intelligent response generation
• Real-time speech-to-text and text-to-speech

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ KEY FEATURES:

1. Realistic Mock Interviews
   → AI-powered voice conversations
   → Industry-specific question sets
   → Adaptive difficulty levels

2. Instant Feedback
   → Performance analysis using Gemini API
   → Strengths and areas for improvement
   → Detailed response evaluation

3. User Management
   → Secure Firebase authentication
   → Progress tracking dashboard
   → Historical interview sessions

4. Responsive Design
   → Mobile-first approach
   → Works across all devices
   → Accessible interface

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 IMPACT:
Helps job seekers gain confidence and improve their interview
performance through realistic practice sessions with AI feedback.

💡 TECHNICAL HIGHLIGHTS:
• Real-time voice processing with low latency
• Secure user data handling with Firebase
• Scalable serverless architecture
• Natural conversation flow with AI agents`,

      "2": `
🎥 VIDEO SHARING PLATFORM - DETAILED VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PROJECT OVERVIEW:
A modern, full-stack video sharing platform with screen recording
capabilities, AI-powered transcripts, and global CDN delivery.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠️  TECHNOLOGY STACK:

Frontend:
• Next.js - Full-stack React framework
• TypeScript - Type-safe development
• Tailwind CSS - Modern UI styling

Backend & Infrastructure:
• Next.js API Routes - Serverless backend
• Bunny.net - Global CDN for video delivery
• Better Auth - Secure authentication system
• Xata - Serverless PostgreSQL database
• Drizzle ORM - Type-safe database queries

Security:
• Arcjet - Advanced security protocols
• Input validation and sanitization
• Rate limiting and DDoS protection

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ KEY FEATURES:

1. Screen Recording
   → Browser-based screen capture
   → Audio recording support
   → Real-time preview

2. Video Management
   → Upload and encoding pipeline
   → Thumbnail generation
   → Video metadata management

3. AI Transcription
   → Automatic speech-to-text
   → Multi-language support
   → Searchable transcripts

4. Global Delivery
   → Bunny.net CDN integration
   → Optimized video streaming
   → Low latency worldwide

5. Privacy Controls
   → Public/private videos
   → Sharing permissions
   → Access control lists

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 ARCHITECTURE:
Serverless, scalable architecture with separation of concerns:
• Database layer with Xata + Drizzle
• CDN layer with Bunny.net for global reach
• Security layer with Arcjet
• Authentication layer with Better Auth

💡 TECHNICAL HIGHLIGHTS:
• Type-safe end-to-end development
• Production-ready security measures
• Optimized for performance and scale
• Modern developer experience`,

      "3": `
🧠 BRAIN TUMOR CLASSIFICATION - DETAILED VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PROJECT OVERVIEW:
A deep learning system for classifying brain tumors from MRI scans
with 99.84% accuracy, published at IEEE 2024 Conference.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠️  TECHNOLOGY STACK:

Core:
• Python - Primary development language
• TensorFlow - Deep learning framework
• Keras - High-level neural network API

Data Processing:
• NumPy - Numerical computations
• Pandas - Data manipulation
• OpenCV - Image preprocessing

Models Benchmarked:
• Custom CNN - Baseline architecture
• VGG16 - Transfer learning approach
• InceptionV3 - Multi-scale feature extraction
• EfficientNetB3 - Final selected model

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 DATASET:
• 7,023 brain MRI scans
• Multiple tumor types
• High-resolution medical images
• Professionally labeled dataset

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 RESULTS:

Model Performance:
• EfficientNetB3: 99.84% accuracy
• Parameters: 11.7M (optimized for deployment)
• Inference time: <100ms per image
• Clinical-grade reliability

Key Metrics:
• Precision: 99.82%
• Recall: 99.86%
• F1-Score: 99.84%
• AUC-ROC: 99.9%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 PUBLICATION:
Title: "Identifying Various Types of Brain Tumors using Deep
       Neural Network based Image Features"
Conference: 2024 IEEE International Conference on Cognitive
            Robotics and Intelligent Systems
DOI: 10.1109/ICC-ROBINS60238.2024.10533941

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 TECHNICAL HIGHLIGHTS:
• Comprehensive model comparison and benchmarking
• Balanced accuracy with computational efficiency
• Production-ready for clinical deployment
• Peer-reviewed and published research`,

      "4": `
🔍 LLM TEXT DETECTOR - DETAILED VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PROJECT OVERVIEW:
An NLP system using BERT to detect AI-generated content with 95.25%
accuracy, helping combat disinformation and maintain integrity.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠️  TECHNOLOGY STACK:

Core Framework:
• Python - Primary language
• BERT - Transformer-based model
• PyTorch - Deep learning framework
• Hugging Face Transformers - Pre-trained models

NLP Tools:
• NLTK - Text preprocessing
• SpaCy - Advanced NLP features
• Tokenizers - Efficient tokenization
• scikit-learn - Model evaluation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 METHODOLOGY:

1. Data Preparation:
   → Curated dataset of human and AI text
   → Diverse text sources and styles
   → Balanced training/validation/test split

2. Model Architecture:
   → BERT-base as foundation
   → Fine-tuned classification head
   → Attention mechanisms for context

3. Training Process:
   → Transfer learning approach
   → Hyperparameter optimization
   → Cross-validation for reliability

4. Evaluation:
   → Multiple performance metrics
   → Confusion matrix analysis
   → Error analysis and refinement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 PERFORMANCE:

Accuracy: 95.25%
Precision: 94.8%
Recall: 95.7%
F1-Score: 95.2%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💼 APPLICATIONS:

1. Academic Integrity
   → Detect AI-written essays and papers
   → Maintain educational standards
   → Support academic institutions

2. Content Moderation
   → Identify synthetic content
   → Combat misinformation
   → Verify content authenticity

3. Digital Publishing
   → Ensure human authorship
   → Quality control
   → Editorial guidelines compliance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 TECHNICAL HIGHLIGHTS:
• State-of-art transformer architecture
• Contextual understanding through BERT
• Fine-tuned for optimal performance
• Real-world applicability in content verification`
    };

    if (projects[projectNum]) {
      typeOutput(projects[projectNum], "output");
    } else {
      addOutput(`Invalid project number. Use 'project 1-4'`, "error");
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    addOutput(`$ ${cmd}`, "command");

    // Handle project subcommands
    if (trimmedCmd.toLowerCase().startsWith("project ")) {
      const projectNum = trimmedCmd.split(" ")[1];
      handleProjectCommand(projectNum);
      return;
    }

    const commandLower = trimmedCmd.toLowerCase();
    if (commands[commandLower]) {
      commands[commandLower].execute();
    } else {
      addOutput(`Command not found: ${trimmedCmd}`, "error");
      addOutput("Type 'help' for available commands", "info");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      handleCommand(input);
      setInput("");
      setTabComplete([]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(commands).filter(cmd => 
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
        setTabComplete([]);
      } else if (matches.length > 1) {
        setTabComplete(matches);
      }
    }
  };

  const quickCommands = ["help", "intro", "skills", "projects", "contact", "resume", "clear"];

  const getLineColor = (type: OutputLine["type"]) => {
    switch (type) {
      case "command": return "text-cyan-400 font-semibold";
      case "error": return "text-red-400";
      case "success": return "text-green-400";
      case "info": return "text-blue-400";
      default: return "text-gray-300";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition" />
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-gray-300">udit@portfolio:~</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <span className="hidden sm:flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
             Terminal 
          </span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="h-[500px] overflow-y-auto p-6 font-mono text-sm space-y-1 bg-slate-950/50 backdrop-blur-sm custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        {output.map((line, index) => (
          <div
            key={index}
            className={`${getLineColor(line.type)} whitespace-pre-wrap leading-relaxed animate-in fade-in duration-100`}
          >
            {line.content}
          </div>
        ))}
        
        {/* Tab Complete Suggestions */}
        {tabComplete.length > 1 && (
          <div className="text-yellow-400 text-xs mt-2">
            Suggestions: {tabComplete.join(", ")}
          </div>
        )}
        
        {/* Input Line */}
        <div className="flex items-center space-x-2 pt-2">
          <span className="text-green-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-600 disabled:opacity-50"
            placeholder={isTyping ? "Processing..." : "Type a command..."}
            autoFocus
          />
          <span className="animate-pulse text-green-400 font-bold">▊</span>
        </div>
      </div>

      {/* Quick Commands Bar */}
      <div className="px-5 py-3 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-mono">Quick Access:</span>
          <span className="text-xs text-gray-500">TAB: autocomplete • ↑↓: history</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                inputRef.current?.focus();
              }}
              disabled={isTyping}
              className="px-3 py-1.5 text-xs font-mono bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 text-gray-300 hover:text-white rounded border border-slate-700 hover:border-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-in {
          animation: fade-in 0.1s ease-in;
        }
      `}</style>
    </div>
  );
};

export default Terminal;