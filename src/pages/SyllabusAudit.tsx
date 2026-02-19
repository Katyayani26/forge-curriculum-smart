import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, UploadCloud, FileText, CheckCircle2, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface AuditResult {
    freshnessScore: number;
    missingTopics: string[];
    outdatedContent: string[];
    modernTools: string[];
    strongAreas: string[];
}

const SyllabusAudit = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyze, setIsAnalyze] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = () => {
        if (!file) {
            toast.error("Please upload a syllabus PDF first.");
            return;
        }
        setIsAnalyze(true);
        // Simulate AI Analysis
        setTimeout(() => {
            setResult({
                freshnessScore: 68,
                missingTopics: ["DevOps & CI/CD Pipelines", "Ethical AI & Bias Mitigation", "Serverless Architecture"],
                outdatedContent: ["Legacy ASP.NET WebForms", "SVN Version Control", "jQuery Heavy Manipulation"],
                modernTools: ["Docker & Kubernetes", "React/Next.js", "GitHub Actions", "TensorFlow/PyTorch"],
                strongAreas: ["Core Data Structures", "Database Fundamentals", "Object-Oriented Design Principles"]
            });
            setIsAnalyze(false);
            toast.success("Syllabus audit complete!");
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-heading text-foreground mb-4">
                            Syllabus Auditor
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Upload your existing syllabus to detect outdated content, freshness gaps, and opportunities for modernization.
                        </p>
                    </motion.div>
                </div>

                {!result ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-muted-foreground/25 rounded-xl bg-card hover:bg-accent/5 transition-colors"
                    >
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                            <UploadCloud className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Upload Syllabus PDF</h3>
                        <p className="text-muted-foreground mb-6 text-center max-w-sm">
                            Drag and drop your syllabus file here, or click to browse. Supported formats: .pdf, .docx
                        </p>
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Button variant="secondary" className="pointer-events-none">
                                {file ? file.name : "Select File"}
                            </Button>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>

                        {file && (
                            <Button
                                onClick={handleAnalyze}
                                className="mt-8 w-full max-w-xs"
                                size="lg"
                                disabled={isAnalyze}
                            >
                                {isAnalyze ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Syllabus...
                                    </>
                                ) : (
                                    <>
                                        Analyze Freshness <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Score Section */}
                        <div className="bg-card border rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-2">Audit Results</h2>
                                <p className="text-muted-foreground">
                                    We analyzed <strong>{file?.name}</strong> and found several areas for improvement to meet industry standards.
                                </p>
                            </div>
                            <div className="flex flex-col items-center flex-shrink-0">
                                <div className="relative h-32 w-32 flex items-center justify-center">
                                    <svg className="h-full w-full" viewBox="0 0 100 100">
                                        <circle className="text-muted stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
                                        <circle
                                            className={`stroke-current ${result.freshnessScore > 75 ? "text-green-500" : result.freshnessScore > 50 ? "text-yellow-500" : "text-red-500"}`}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="transparent"
                                            strokeDasharray={`${result.freshnessScore * 2.51} 251.2`}
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-3xl font-bold">{result.freshnessScore}%</span>
                                        <span className="text-xs uppercase font-semibold text-muted-foreground">Freshness</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border-l-4 border-l-red-500">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-red-500" />
                                        Critical Gaps
                                    </CardTitle>
                                    <CardDescription>Topics missing from the curriculum.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {result.missingTopics.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <XCircle className="h-4 w-4 mt-1 text-red-500 flex-shrink-0" />
                                                <span className="text-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-orange-500">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Loader2 className="h-5 w-5 text-orange-500" />
                                        Outdated Content
                                    </CardTitle>
                                    <CardDescription>Modules that need retirement or updates.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {result.outdatedContent.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <AlertTriangle className="h-4 w-4 mt-1 text-orange-500 flex-shrink-0" />
                                                <span className="text-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-green-500">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        Strong Areas
                                    </CardTitle>
                                    <CardDescription>Core strengths of the current syllabus.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {result.strongAreas.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <CheckCircle2 className="h-4 w-4 mt-1 text-green-500 flex-shrink-0" />
                                                <span className="text-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-blue-500">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <UploadCloud className="h-5 w-5 text-blue-500" />
                                        Recommended Tools
                                    </CardTitle>
                                    <CardDescription>Modern tools to integrate.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {result.modernTools.map((tool, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button variant="outline" onClick={() => setResult(null)}>Audit Another Syllabus</Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default SyllabusAudit;
