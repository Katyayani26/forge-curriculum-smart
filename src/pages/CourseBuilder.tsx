import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CurriculumForm, { type FormData } from "@/components/CurriculumForm";
import CurriculumResult from "@/components/CurriculumResult";
import { type Curriculum, generateMockCurriculum } from "@/lib/mockCurriculum";
import { toast } from "sonner";

const CourseBuilder = () => {
    const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [subject, setSubject] = useState("");
    const resultRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async (data: FormData) => {
        setIsLoading(true);
        setSubject(data.subject);
        try {
            // Simulate AI delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            const result = generateMockCurriculum(data.subject, data.level, data.duration, data.goals, data.domain);
            setCurriculum(result);

            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
            toast.success("Curriculum generated successfully!");
        } catch (e: any) {
            console.error(e);
            toast.error("Failed to generate curriculum. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setCurriculum(null);
        setSubject("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-heading text-foreground mb-4">
                            AI Course Builder
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Design comprehensive courses with detailed syllabi, Bloom's taxonomy analysis, and industry alignment scores in seconds.
                        </p>
                    </motion.div>
                </div>

                {!curriculum ? (
                    <CurriculumForm onGenerate={handleGenerate} isLoading={isLoading} />
                ) : (
                    <div ref={resultRef}>
                        <CurriculumResult curriculum={curriculum} subject={subject} />
                        <div className="text-center mt-8">
                            <Button variant="outline" onClick={handleReset}>
                                Generate Another Course
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseBuilder;
