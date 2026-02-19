import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, GraduationCap, Building2, BookCheck } from "lucide-react";
import { toast } from "sonner";

interface ProgramData {
    degree: string;
    specialization: string;
    years: string;
    semesters: string;
    industryFocus: string;
    universityPattern: string;
    totalCredits: string;
}

interface SemesterSubject {
    code: string;
    name: string;
    type: "Core" | "Elective" | "Lab";
    credits: number;
    prerequisite: string;
}

interface ProgramPlan {
    semesters: {
        id: number;
        subjects: SemesterSubject[];
    }[];
}

const ProgramBuilder = () => {
    const [formData, setFormData] = useState<ProgramData>({
        degree: "",
        specialization: "",
        years: "4",
        semesters: "8",
        industryFocus: "",
        universityPattern: "Semester",
        totalCredits: "160",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [programPlan, setProgramPlan] = useState<ProgramPlan | null>(null);

    const handleStart = () => {
        if (!formData.degree || !formData.specialization) {
            toast.error("Please fill in all required fields");
            return;
        }
        setIsLoading(true);
        // Simulate AI generation
        setTimeout(() => {
            const plan = generateMockProgram(formData);
            setProgramPlan(plan);
            setIsLoading(false);
            toast.success("Program structure generated successfully!");
        }, 2000);
    };

    const generateMockProgram = (data: ProgramData): ProgramPlan => {
        const numSemesters = parseInt(data.semesters) || 8;
        return {
            semesters: Array.from({ length: numSemesters }, (_, i) => ({
                id: i + 1,
                subjects: [
                    { code: `CS${100 + i * 10 + 1}`, name: i === 0 ? "Introduction to Programming" : `Advanced ${data.specialization} ${i}`, type: "Core", credits: 4, prerequisite: i > 0 ? `CS${100 + (i - 1) * 10 + 1}` : "-" },
                    { code: `CS${100 + i * 10 + 2}`, name: `Mathematics for ${data.degree} ${i + 1}`, type: "Core", credits: 3, prerequisite: "-" },
                    { code: `CS${100 + i * 10 + 3}`, name: `${data.industryFocus} Principles`, type: "Elective", credits: 3, prerequisite: "-" },
                    { code: `LB${100 + i * 10 + 1}`, name: `${data.specialization} Lab ${i + 1}`, type: "Lab", credits: 2, prerequisite: "-" },
                    { code: `HS${100 + i * 10 + 1}`, name: "Communication Skills", type: "Elective", credits: 2, prerequisite: "-" },
                ]
            }))
        };
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-heading text-foreground mb-4">
                            Academic Program Builder
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Design complete degree programs with semester-wise breakdown, credits, and prerequisites.
                        </p>
                    </motion.div>
                </div>

                {!programPlan ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid gap-8 max-w-3xl mx-auto"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Program Details</CardTitle>
                                <CardDescription>Define the structure of your academic program.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Degree Name</Label>
                                        <Input
                                            placeholder="e.g. B.Tech, B.Sc"
                                            value={formData.degree}
                                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Specialization</Label>
                                        <Input
                                            placeholder="e.g. Computer Science, AI"
                                            value={formData.specialization}
                                            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Duration (Years)</Label>
                                        <Select
                                            value={formData.years}
                                            onValueChange={(val) => setFormData({ ...formData, years: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select years" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 Year</SelectItem>
                                                <SelectItem value="2">2 Years</SelectItem>
                                                <SelectItem value="3">3 Years</SelectItem>
                                                <SelectItem value="4">4 Years</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Total Semesters</Label>
                                        <Select
                                            value={formData.semesters}
                                            onValueChange={(val) => setFormData({ ...formData, semesters: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select semesters" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2">2 Semesters</SelectItem>
                                                <SelectItem value="4">4 Semesters</SelectItem>
                                                <SelectItem value="6">6 Semesters</SelectItem>
                                                <SelectItem value="8">8 Semesters</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Industry Focus</Label>
                                    <Input
                                        placeholder="e.g. Cloud Computing, FinTech, Automotive"
                                        value={formData.industryFocus}
                                        onChange={(e) => setFormData({ ...formData, industryFocus: e.target.value })}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>University Pattern</Label>
                                        <Select
                                            value={formData.universityPattern}
                                            onValueChange={(val) => setFormData({ ...formData, universityPattern: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pattern" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Semester">Semester System</SelectItem>
                                                <SelectItem value="Trimester">Trimester System</SelectItem>
                                                <SelectItem value="Annual">Annual System</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Total Credits</Label>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 160"
                                            value={formData.totalCredits}
                                            onChange={(e) => setFormData({ ...formData, totalCredits: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={handleStart}
                                    className="w-full"
                                    size="lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Program...
                                        </>
                                    ) : (
                                        <>
                                            <Building2 className="mr-2 h-4 w-4" /> Build Program Structure
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm">
                            <div>
                                <h2 className="text-2xl font-bold">{formData.degree} in {formData.specialization}</h2>
                                <p className="text-muted-foreground">{formData.years} Years • {formData.semesters} Semesters • {formData.totalCredits} Credits</p>
                            </div>
                            <Button variant="outline" onClick={() => setProgramPlan(null)}>Create New</Button>
                        </div>

                        <Tabs defaultValue="sem-1" className="w-full">
                            <TabsList className="w-full justify-start h-auto flex-wrap p-2 bg-card border">
                                {programPlan.semesters.map((sem) => (
                                    <TabsTrigger
                                        key={sem.id}
                                        value={`sem-${sem.id}`}
                                        className="flex-1 min-w-[100px]"
                                    >
                                        Semester {sem.id}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {programPlan.semesters.map((sem) => (
                                <TabsContent key={sem.id} value={`sem-${sem.id}`} className="mt-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Semester {sem.id} Curriculum</CardTitle>
                                            <CardDescription>Detailed course breakdown for this semester</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Course Code</TableHead>
                                                        <TableHead>Subject Name</TableHead>
                                                        <TableHead>Type</TableHead>
                                                        <TableHead>Credits</TableHead>
                                                        <TableHead>Prerequisite</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {sem.subjects.map((subject, idx) => (
                                                        <TableRow key={idx}>
                                                            <TableCell className="font-medium">{subject.code}</TableCell>
                                                            <TableCell>{subject.name}</TableCell>
                                                            <TableCell>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${subject.type === 'Core' ? 'bg-primary/10 text-primary' :
                                                                        subject.type === 'Lab' ? 'bg-secondary/20 text-secondary' : 'bg-muted text-muted-foreground'
                                                                    }`}>
                                                                    {subject.type}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>{subject.credits}</TableCell>
                                                            <TableCell>{subject.prerequisite}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProgramBuilder;
