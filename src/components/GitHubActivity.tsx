import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const GitHubActivity = () => {

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 border-2 border-primary/30 hover-lift">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl animate-float">
              <Github className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              GitHub <span className="gradient-text">Activity</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 text-center max-w-2xl mx-auto">
              Explore my open-source contributions and projects on GitHub
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => window.open("https://github.com/Udit013", "_blank")}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl smooth-transition w-full sm:w-auto"
              >
                <Github className="w-6 h-6 mr-2" />
                View GitHub Profile
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                onClick={() => window.open("https://github.com/Udit013", "_blank")}
                variant="outline"
                size="lg"
                className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6 rounded-xl w-full sm:w-auto"
              >
                <Github className="w-6 h-6 mr-2" />
                View All Projects
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
