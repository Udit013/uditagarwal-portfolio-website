import { Briefcase, Calendar, MapPin } from "lucide-react";

const Journey = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Global Health Impact Project",
      location: "Bloomington, Indiana, United States · Hybrid",
      period: "Feb 2026 – Present",
      type: "Part-Time",
      description: [
        "Developing a data-driven global health platform using Python, React, and SQL to analyze pharmaceutical impact",
        "Contributing to a forecasting tool modeling how treatment coverage, efficacy, and disease trends affect health outcomes",
        "Building scalable full-stack features to improve performance, usability, and data accessibility",
        "Working with real-world datasets to generate insights for healthcare and policy decision-making",
        "Collaborating with cross-functional teams to translate research needs into technical solutions",
        "Contributing in a volunteer capacity alongside academic coursework",
      ],
      skills: ["Full-Stack Development", "Python", "React", "SQL", "Data Analysis"],
      color: "hsl(200, 80%, 55%)",
      logo: "https://www.global-health-impact.org/static/img/logo.png",
    },
    {
      title: "Consultant",
      company: "University Information Technology Services (UITS) · Indiana University Bloomington",
      location: "Bloomington, Indiana, United States · On-site",
      period: "Aug 2025 – Present",
      type: "Part-Time",
      description: [
        "Provided technical and operational support across desktop, mobile, and enterprise systems for a large user base",
        "Resolved 100+ issues weekly using structured troubleshooting and root-cause analysis to improve system reliability",
        "Supported identity and access systems, ensuring secure and seamless user access",
        "Assisted with network connectivity and system access across campus environments",
        "Communicated technical solutions to non-technical users, improving usability and satisfaction",
        "Documented support interactions to enhance workflows and operational efficiency",
      ],
      skills: ["Cross-platform Troubleshooting", "Enterprise IT Systems", "Identity & Access Management", "Data Analysis", "Problem Solving"],
      color: "hsl(270, 80%, 60%)",
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_nQ3jMAn93zLu9M_0cm6d2WMdiuLcjYbpVVgymS7XUQQw=s900-c-k-c0x00ffffff-no-rj",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/30 pointer-events-none"></div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            My path in technology and continuous learning
          </p>
        </div>

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
                {/* Logo */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110 overflow-hidden p-2"
                  style={{
                    backgroundColor: `${exp.color}15`,
                    border: `2px solid ${exp.color}40`,
                  }}
                >
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-full h-full object-contain"
                  />
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

                    <span className="inline-flex items-center px-3 sm:px-4 py-1 bg-green-500/20 text-green-500 rounded-full text-xs sm:text-sm font-semibold border border-green-500/30 self-start">
                      {exp.type}
                    </span>
                  </div>

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
      </div>
    </section>
  );
};

export default Journey;