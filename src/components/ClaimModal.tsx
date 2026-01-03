import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge, ConfidenceBadge } from "./StatusBadge";
import { Claim } from "@/types/verification";
import { ExternalLink, FileText, BookOpen, Link2, ArrowLeft } from "lucide-react";

interface ClaimModalProps {
  claim: Claim | null;
  open: boolean;
  onClose: () => void;
}

export const ClaimModal = ({ claim, open, onClose }: ClaimModalProps) => {
  if (!claim) return null;

  const citationTypeIcon = {
    url: Link2,
    academic: FileText,
    book: BookOpen,
    unknown: FileText
  };

  const CitationIcon = claim.citation ? citationTypeIcon[claim.citation.type] : FileText;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Claim Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Overview */}
          <div className="flex items-center gap-3">
            <StatusBadge status={claim.status} />
            <ConfidenceBadge level={claim.confidence} />
          </div>

          {/* Claim Text */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Claim</h4>
            <p className="text-foreground bg-secondary/50 p-4 rounded-lg border border-border">
              {claim.text}
            </p>
          </div>

          {/* Citation */}
          {claim.citation && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CitationIcon className="h-4 w-4" />
                Citation ({claim.citation.type})
              </h4>
              <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                <p className="text-foreground font-mono text-sm break-all">
                  {claim.citation.text}
                </p>
                {claim.citation.url && (
                  <a 
                    href={claim.citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-primary hover:underline text-sm"
                  >
                    Open link <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Verification Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Verification Method</h4>
              <p className="text-foreground bg-secondary/50 p-3 rounded-lg border border-border text-sm">
                {claim.verificationMethod}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Confidence Level</h4>
              <p className="text-foreground bg-secondary/50 p-3 rounded-lg border border-border text-sm capitalize">
                {claim.confidence}
              </p>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Verification Result</h4>
            <p className="text-foreground bg-secondary/50 p-4 rounded-lg border border-border">
              {claim.reason}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
