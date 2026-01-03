import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScoreDashboard } from "@/components/ScoreDashboard";
import { ResultsTable } from "@/components/ResultsTable";
import { verifyContent } from "@/lib/verification";
import { demoContent, demoDescription } from "@/lib/demoData";
import { VerificationResult } from "@/types/verification";
import { Search, Loader2, Sparkles, AlertCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Verify = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to verify", {
        description: "The input field cannot be empty"
      });
      return;
    }

    if (inputText.trim().length < 50) {
      toast.error("Text too short", {
        description: "Please provide at least 50 characters for meaningful analysis"
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate processing delay for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const verificationResult = await verifyContent(inputText);
      setResult(verificationResult);
      
      toast.success("Verification complete", {
        description: `Found ${verificationResult.claims.length} claims to analyze`
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Verification failed", {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoContent = () => {
    setInputText(demoContent);
    setResult(null);
    setError(null);
    toast.info("Demo content loaded", {
      description: demoDescription
    });
  };

  const handleReset = () => {
    setInputText("");
    setResult(null);
    setError(null);
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Verify Content
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Paste AI-generated text below to verify factual claims and citations
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            <div className="relative">
              <Textarea
                placeholder="Paste AI-generated content here for verification..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[250px] bg-card border-border text-foreground placeholder:text-muted-foreground resize-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
                aria-label="Content to verify"
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {inputText.length} characters
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="flex gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleVerify}
                  disabled={isLoading || !inputText.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      Verify Content
                    </>
                  )}
                </Button>

                {(inputText || result) && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleDemoContent}
                disabled={isLoading}
              >
                <Sparkles className="h-4 w-4" />
                Try Demo Content
              </Button>
            </div>
          </motion.div>

          {/* Error State */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">Verification Error</p>
                  <p className="text-sm text-destructive/80">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Score Dashboard */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Verification Summary
                  </h2>
                  <ScoreDashboard result={result} />
                </div>

                {/* Results Table */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Claim Analysis
                  </h2>
                  {result.claims.length > 0 ? (
                    <ResultsTable claims={result.claims} />
                  ) : (
                    <div className="text-center py-12 bg-card border border-border rounded-lg">
                      <p className="text-muted-foreground">
                        No verifiable claims found in the provided text
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Verify;
