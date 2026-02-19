import { motion } from "framer-motion";
import { BookOpen, Sparkles, FileDown, Zap, Layout, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Sparkles, title: "AI-Powered Generation", desc: "Create complete curricula and syllabi in seconds using advanced AI models." },
  { icon: Layout, title: "Visual Roadmaps", desc: "Get week-by-week visual timelines and structure for your courses." },
  { icon: GraduationCap, title: "Program Builder", desc: "Design full degree programs with semester-wise credits and prerequisites." },
  { icon: ShieldCheck, title: "Syllabus Audit", desc: "Analyze existing documents for freshness, gaps, and industry relevance." },
  { icon: FileDown, title: "Instant Export", desc: "Download professional PDF reports and curriculum documents instantly." },
  { icon: Zap, title: "Industry Alignment", desc: "Ensure your content matches current job market demands and skills." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex-1 flex flex-col justify-center min-h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="relative z-10 px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-6 inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground text-sm font-semibold">
              🚀 The Future of Curriculum Design
            </div>
            <h1 className="text-4xl md:text-7xl font-heading text-primary-foreground mb-6 leading-tight">
              CurricuForge
            </h1>
            <p className="text-lg md:text-2xl text-primary-foreground/80 mb-10 font-body max-w-2xl mx-auto">
              Empowering educators to build world-class courses and academic programs with the speed and intelligence of AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/generate">
                <Button
                  size="xl"
                  className="w-full sm:w-auto text-lg px-8 py-6 h-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-none shadow-lg hover:shadow-xl transition-all"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Build a Course
                </Button>
              </Link>
              <Link to="/program-builder">
                <Button
                  variant="secondary"
                  size="xl"
                  className="w-full sm:w-auto text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Build a Program
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              Everything You Need to Design Learning
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From single courses to entire degree programs, CurricuForge provides the tools to structure education effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="bg-card rounded-xl p-8 shadow-card border border-border hover:shadow-lg transition-shadow group"
              >
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Audit CTA */}
      <section className="py-20 px-4 bg-card border-t border-border">
        <div className="max-w-5xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-heading text-foreground mb-3">Already have a syllabus?</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Upload your existing curriculum PDF and let our AI analyze it for gaps, outdated content, and freshness.
            </p>
          </div>
          <Link to="/syllabus-audit">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors">
              Audit Syllabus <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CurricuForge — AI Curriculum Design Platform
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

