import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { 
  Shield, 
  Search, 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Link2,
  FileText,
  BookOpen,
  Lightbulb,
  Target,
  Clock
} from "lucide-react";

interface ContentBlock {
  type: "paragraph" | "heading" | "list";
  text?: string;
  items?: string[];
}

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: ContentBlock[];
}

const sections: Section[] = [
  {
    id: "problem",
    title: "The Problem",
    icon: AlertTriangle,
    content: [
      { 
        type: "paragraph", 
        text: "Large Language Models (LLMs) like GPT-4, Claude, and others can generate highly convincing text that may contain factual inaccuracies, fabricated citations, or hallucinations. These AI systems can:" 
      },
      { 
        type: "list", 
        items: [
          "Invent citations that don't exist",
          "Misattribute quotes to wrong sources",
          "Generate plausible-sounding but false statistics",
          "Create fictional academic papers, books, or URLs"
        ] 
      },
      { 
        type: "paragraph", 
        text: "This poses a significant risk for researchers, journalists, students, and anyone relying on AI-generated content for accurate information." 
      }
    ]
  },
  {
    id: "solution",
    title: "How Citefence Works",
    icon: Shield,
    content: [
      { type: "paragraph", text: "Citefence uses a multi-layered verification approach:" },
      { type: "heading", text: "1. Claim Extraction" },
      { type: "paragraph", text: "We parse the input text to identify statements that make factual claims—especially those citing sources, statistics, or attributing information to specific entities." },
      { type: "heading", text: "2. Citation Detection" },
      { type: "paragraph", text: "The system recognizes different citation types:" },
      { type: "list", items: ["URLs and web links", "Academic citations (Author et al., Year)", "Book references", "Statistical claims"] },
      { type: "heading", text: "3. Verification Methods" },
      { type: "paragraph", text: "Each citation is verified using appropriate methods:" },
      { type: "list", items: ["HTTP Validation — Checks if URLs are accessible", "Academic Databases — Cross-references with CrossRef/Semantic Scholar", "Pattern Analysis — Identifies suspicious patterns in claims"] },
      { type: "heading", text: "4. Status Classification" },
      { type: "paragraph", text: "Each claim receives a status:" },
      { type: "list", items: ["Verified — Source confirmed and accessible", "Suspicious — Citation exists but may be misused", "Unverified — Source cannot be confirmed"] }
    ]
  },
  {
    id: "limitations",
    title: "Current Limitations",
    icon: Clock,
    content: [
      { type: "paragraph", text: "As a prototype, Citefence has several limitations:" },
      { type: "heading", text: "Technical Constraints" },
      { type: "list", items: ["Cannot verify paywalled academic content", "Limited to English language sources", "URL checking may not detect content changes", "Cannot verify physical book existence"] },
      { type: "heading", text: "Verification Scope" },
      { type: "list", items: ["Does not fact-check the actual claims themselves", "Cannot detect subtle misinterpretations", "Relies on source availability at verification time"] },
      { type: "heading", text: "API Dependencies" },
      { type: "list", items: ["Academic database queries may be rate-limited", "Some verification methods use simulated responses", "Real-time web search is not available in all cases"] }
    ]
  },
  {
    id: "future",
    title: "Future Development",
    icon: Lightbulb,
    content: [
      { type: "paragraph", text: "Planned improvements for Citefence:" },
      { type: "heading", text: "Enhanced Verification" },
      { type: "list", items: ["Integration with Google Scholar API", "DOI resolution and verification", "ISBN validation for books", "Wayback Machine integration for dead links"] },
      { type: "heading", text: "Advanced Analysis" },
      { type: "list", items: ["Semantic claim matching", "Context-aware verification", "Multi-language support", "Real-time monitoring"] },
      { type: "heading", text: "User Features" },
      { type: "list", items: ["Verification history", "Export reports", "Browser extension", "API access for developers"] }
    ]
  }
];

const statusGuide = [
  {
    status: "Verified",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    description: "The citation has been confirmed through one or more verification methods. The source exists and is accessible."
  },
  {
    status: "Suspicious",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    description: "The citation could not be fully verified. It may exist but shows signs of potential issues or inconsistencies."
  },
  {
    status: "Unverified",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    description: "The citation could not be verified. The URL returns 404, or the academic source was not found in databases."
  }
];

const citationTypes = [
  { type: "URL", icon: Link2, description: "Web links and URLs are verified by checking HTTP status" },
  { type: "Academic", icon: FileText, description: "Academic citations are cross-referenced with scholarly databases" },
  { type: "Book", icon: BookOpen, description: "Book references are checked against known publication databases" }
];

const RenderContent = ({ content }: { content: ContentBlock[] }) => {
  return (
    <div className="space-y-4">
      {content.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {block.text}
            </p>
          );
        }
        if (block.type === "heading") {
          return (
            <h4 key={index} className="text-foreground font-semibold mt-6 mb-2">
              {block.text}
            </h4>
          );
        }
        if (block.type === "list" && block.items) {
          return (
            <ul key={index} className="space-y-2 ml-4">
              {block.items.map((item, i) => (
                <li key={i} className="text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
};

const Documentation = () => {
  return (
    <Layout>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Documentation
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Understanding how Citefence verifies AI-generated content
            </p>
          </motion.div>

          {/* Main Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-8 shadow-card"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <RenderContent content={section.content} />
                </motion.section>
              );
            })}

            {/* Status Guide */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-lg p-8 shadow-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Status Guide
                </h2>
              </div>
              <div className="grid gap-4">
                {statusGuide.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.status}
                      className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg"
                    >
                      <div className={`p-2 rounded-lg ${item.bgColor}`}>
                        <Icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${item.color}`}>
                          {item.status}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Citation Types */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-lg p-8 shadow-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Citation Types
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {citationTypes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.type}
                      className="p-4 bg-secondary/30 rounded-lg text-center"
                    >
                      <div className="inline-flex p-2 bg-primary/10 rounded-lg mb-3">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.type}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-12 text-center text-muted-foreground text-sm"
          >
            <p>
              Citefence is a prototype demonstration. 
              Results should be used as guidance, not definitive verification.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
