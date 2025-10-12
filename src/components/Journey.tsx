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
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My path in technology and continuous learning
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover-lift group relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-2 h-full"
                style={{ backgroundColor: exp.color }}
              ></div>
              
              <div className="flex items-start space-x-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0"
                  style={{
                    backgroundColor: `${exp.color}20`,
                    border: `2px solid ${exp.color}40`,
                  }}
                >
                  💼
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary smooth-transition">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-primary font-semibold">{exp.company}</p>
                    </div>
                    <span className="px-4 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-semibold">
                      {exp.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start text-muted-foreground">
                    <span className="text-primary mr-3 text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
