import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, AlertTriangle, Search, ArrowRight, Zap, Database, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Search,
    title: "Claim Extraction",
    description: "Automatically identifies and extracts factual claims from AI-generated text"
  },
  {
    icon: Database,
    title: "Citation Verification",
    description: "Cross-references citations against academic databases and web sources"
  },
  {
    icon: CheckCircle,
    title: "Status Classification",
    description: "Categorizes claims as Verified, Unverified, or Suspicious with confidence levels"
  },
  {
    icon: Lock,
    title: "Trust Scoring",
    description: "Provides an overall reliability score for the analyzed content"
  }
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl shadow-glow">
              <Shield className="h-12 w-12 text-primary" />
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                CiteGuard
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Verify AI-generated facts and citations with confidence
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              An intelligent verification system that detects, flags, and validates 
              factual claims in AI-generated content. Distinguish reliable information 
              from potential hallucinations.
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate('/verify')}
                className="group"
              >
                Start Verification
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              CiteGuard uses multiple verification methods to ensure accuracy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-card rounded-lg border border-border shadow-card hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-12"
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <Zap className="h-5 w-5 text-primary" />
              <span>Real-time verification</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Database className="h-5 w-5 text-primary" />
              <span>Academic database cross-reference</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>Hallucination detection</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>CiteGuard — AI Citation Verification System</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
