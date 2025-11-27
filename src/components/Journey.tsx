import { Briefcase, Calendar, MapPin } from "lucide-react";

const Journey = () => {
  const experiences = [
    {
      title: "Consultant",
      company: "University Information Technology Services (UITS)",
      location: "Indiana University - Bloomington, IN",
      period: "August 2025 – Present",
      type: "Part-Time",
      description: [
        "Resolved software, hardware, and network issues across Windows, macOS, and mobile platforms, applying systematic debugging to enhance enterprise services including authentication, cloud storage, and learning systems",
        "Delivered technical support to students and faculty, performed root-cause analysis, authored and maintained documentation",
        "Optimized workflows to reduce resolution time and improve user experience",
      ],
      skills: ["Cross-platform troubleshooting", "Enterprise IT systems", "Identity & access management", "Technical communication"],
      color: "hsl(270, 80%, 60%)",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Subtle gradient overlay - now semi-transparent to show particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/30 pointer-events-none"></div>
      
      {/* Decorative blurred circles - reduced opacity */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            My path in technology and continuous learning
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 hover-lift group relative overflow-hidden transition-all duration-300"
            >
              {/* Colored accent bar */}
              <div
                className="absolute top-0 left-0 w-1 sm:w-2 h-full transition-all duration-300 group-hover:w-2 sm:group-hover:w-3"
                style={{ backgroundColor: exp.color }}
              ></div>
              
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                {/* Icon */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${exp.color}20`,
                    border: `2px solid ${exp.color}40`,
                  }}
                >
                  💼
                </div>

                {/* Title and Meta Info */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <p className="text-base sm:text-lg text-primary font-semibold mt-1">
                        {exp.company}
                      </p>
                    </div>
                    
                    {/* Type Badge */}
                    <span className="inline-flex items-center px-3 sm:px-4 py-1 bg-green-500/20 text-green-500 rounded-full text-xs sm:text-sm font-semibold border border-green-500/30 self-start">
                      {exp.type}
                    </span>
                  </div>
                  
                  {/* Date and Location */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Points */}
              <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <span className="text-primary mr-2 sm:mr-3 text-base sm:text-lg flex-shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full text-xs sm:text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Add more experiences prompt */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm text-muted-foreground">
            More experiences coming soon as I continue my journey...
          </p>
        </div>
      </div>
    </section>
  );
};

export default Journey;