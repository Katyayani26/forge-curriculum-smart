import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, CheckCircle, FileText, Calendar, Activity, TrendingUp } from "lucide-react";
import jsPDF from "jspdf";
import type { Curriculum } from "@/lib/mockCurriculum";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CurriculumResultProps {
  curriculum: Curriculum;
  subject: string;
}

const CurriculumResult = ({ curriculum, subject }: CurriculumResultProps) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(curriculum.title, pageWidth / 2, y, { align: "center" });
    y += 12;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Level: ${curriculum.level} | Duration: ${curriculum.duration}`, pageWidth / 2, y, { align: "center" });
    y += 16;

    // Industry Alignment
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Industry Alignment Score: ${curriculum.industryAlignmentScore}%`, 14, y);
    y += 12;

    // Learning Outcomes
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Learning Outcomes", 14, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    curriculum.learningOutcomes.forEach((outcome) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`• ${outcome}`, 18, y);
      y += 6;
    });
    y += 8;

    // Weekly Syllabus
    curriculum.weeks.forEach((week) => {
      if (y > 240) { doc.addPage(); y = 20; }
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(`Week ${week.week}: ${week.title}`, 14, y);
      y += 7;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      week.topics.forEach((topic) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`  • ${topic}`, 18, y);
        y += 5;
      });
      y += 3;

      doc.setFont("helvetica", "italic");
      doc.text(`Assignment: ${week.assignment}`, 18, y);
      y += 10;
      doc.setFont("helvetica", "normal");
    });

    doc.save(`${subject.replace(/\s+/g, "_")}_Curriculum.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="bg-card rounded-lg p-6 md:p-8 shadow-card border border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading text-foreground">{curriculum.title}</h2>
            <p className="text-muted-foreground mt-1">
              {curriculum.level} · {curriculum.duration}
            </p>
          </div>
          <Button variant="hero" onClick={downloadPDF} className="shrink-0 bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Industry Alignment */}
        <div className="bg-card rounded-lg p-6 shadow-card border border-border">
          <h3 className="flex items-center gap-2 text-lg font-heading text-foreground mb-4">
            <TrendingUp className="h-5 w-5 text-secondary" />
            Industry Alignment
          </h3>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative h-32 w-32 flex items-center justify-center">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="8"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <circle
                  className="text-secondary stroke-current"
                  strokeWidth="8"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${curriculum.industryAlignmentScore * 2.51} 251.2`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="absolute text-2xl font-bold text-foreground">{curriculum.industryAlignmentScore}%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Matched against current job market trends
            </p>
          </div>
        </div>

        {/* Bloom's Taxonomy */}
        <div className="bg-card rounded-lg p-6 shadow-card border border-border">
          <h3 className="flex items-center gap-2 text-lg font-heading text-foreground mb-4">
            <Activity className="h-5 w-5 text-secondary" />
            Bloom's Taxonomy Breakdown
          </h3>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={curriculum.bloomsTaxonomy} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="level" type="category" width={100} tick={{ fontSize: 12 }} interval={0} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="percentage" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]}>
                  {curriculum.bloomsTaxonomy?.map((_, index) => (
                    <Cell key={`cell-${index}`} fill="hsl(var(--secondary))" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="bg-card rounded-lg p-6 md:p-8 shadow-card border border-border">
        <h3 className="flex items-center gap-2 text-lg font-heading text-foreground mb-4">
          <CheckCircle className="h-5 w-5 text-secondary" />
          Learning Outcomes
        </h3>
        <ul className="space-y-2">
          {curriculum.learningOutcomes.map((outcome, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 text-foreground"
            >
              <span className="mt-1.5 h-2 w-2 rounded-full bg-secondary shrink-0" />
              {outcome}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Visual Roadmap */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-heading text-foreground">
          <Calendar className="h-5 w-5 text-secondary" />
          Curriculum Roadmap
        </h3>
        <div className="relative border-l-2 border-secondary/30 ml-3 space-y-8 py-2">
          {curriculum.weeks.map((week, i) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative pl-8"
            >
              <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-secondary border-4 border-background" />
              <div className="bg-card rounded-lg p-5 shadow-sm border border-border/50 hover:border-secondary/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                    Week {week.week}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">{week.title}</h4>

                <div className="space-y-3">
                  <div>
                    <ul className="space-y-1.5">
                      {week.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <BookOpen className="h-3.5 w-3.5 mt-0.5 text-secondary/70 shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-sm text-foreground flex items-start gap-2 font-medium">
                      <FileText className="h-3.5 w-3.5 mt-0.5 text-secondary shrink-0" />
                      Assignment: <span className="font-normal text-muted-foreground">{week.assignment}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CurriculumResult;
