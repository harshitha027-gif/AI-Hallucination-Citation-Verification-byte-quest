import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge, ConfidenceBadge } from "./StatusBadge";
import { ClaimModal } from "./ClaimModal";
import { Claim } from "@/types/verification";
import { ChevronRight, Link2, FileText, BookOpen, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsTableProps {
  claims: Claim[];
}

export const ResultsTable = ({ claims }: ResultsTableProps) => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  const citationTypeIcon = {
    url: Link2,
    academic: FileText,
    book: BookOpen,
    unknown: HelpCircle
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="text-muted-foreground font-semibold w-[40%]">Claim</TableHead>
              <TableHead className="text-muted-foreground font-semibold w-[25%]">Citation</TableHead>
              <TableHead className="text-muted-foreground font-semibold w-[12%]">Status</TableHead>
              <TableHead className="text-muted-foreground font-semibold w-[18%]">Reason</TableHead>
              <TableHead className="text-muted-foreground font-semibold w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim, index) => {
              const CitationIcon = claim.citation 
                ? citationTypeIcon[claim.citation.type] 
                : HelpCircle;

              return (
                <TableRow 
                  key={claim.id}
                  className={cn(
                    "cursor-pointer transition-colors duration-200",
                    "hover:bg-secondary/30",
                    index % 2 === 0 ? "bg-card" : "bg-card/50"
                  )}
                  onClick={() => setSelectedClaim(claim)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedClaim(claim);
                    }
                  }}
                  aria-label={`View details for claim: ${truncateText(claim.text, 50)}`}
                >
                  <TableCell className="font-medium text-foreground">
                    {truncateText(claim.text)}
                  </TableCell>
                  <TableCell>
                    {claim.citation ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CitationIcon className="h-4 w-4 shrink-0" />
                        <span className="text-sm truncate max-w-[200px]">
                          {truncateText(claim.citation.text, 40)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground/50 italic text-sm">
                        No citation found
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={claim.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {truncateText(claim.reason, 40)}
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ClaimModal 
        claim={selectedClaim} 
        open={!!selectedClaim} 
        onClose={() => setSelectedClaim(null)} 
      />
    </>
  );
};
