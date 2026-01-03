import { VerificationResult } from "@/types/verification";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreDashboardProps {
  result: VerificationResult;
}

export const ScoreDashboard = ({ result }: ScoreDashboardProps) => {
  const verifiedCount = result.claims.filter(c => c.status === 'verified').length;
  const unverifiedCount = result.claims.filter(c => c.status === 'unverified').length;
  const suspiciousCount = result.claims.filter(c => c.status === 'suspicious').length;
  const totalClaims = result.claims.length;

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getScoreRingColor = (score: number) => {
    if (score >= 70) return "stroke-success";
    if (score >= 40) return "stroke-warning";
    return "stroke-destructive";
  };

  const stats = [
    { 
      label: "Verified", 
      value: verifiedCount, 
      icon: CheckCircle, 
      color: "text-success",
      bgColor: "bg-success/10"
    },
    { 
      label: "Unverified", 
      value: unverifiedCount, 
      icon: XCircle, 
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    { 
      label: "Suspicious", 
      value: suspiciousCount, 
      icon: AlertTriangle, 
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    { 
      label: "Total Claims", 
      value: totalClaims, 
      icon: Clock, 
      color: "text-muted-foreground",
      bgColor: "bg-muted"
    },
  ];

  // Calculate the stroke dash for the circular progress
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (result.overallScore / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Score Circle */}
      <div className="lg:col-span-1 flex flex-col items-center justify-center p-6 bg-card rounded-lg border border-border shadow-card">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              className="stroke-secondary"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className={cn("transition-all duration-1000 ease-out", getScoreRingColor(result.overallScore))}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-3xl font-bold", getScoreColor(result.overallScore))}>
              {result.overallScore}%
            </span>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground text-center">Verification Score</p>
      </div>

      {/* Stats Cards */}
      <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label}
              className="flex flex-col items-center justify-center p-4 bg-card rounded-lg border border-border shadow-card"
            >
              <div className={cn("p-2 rounded-lg mb-2", stat.bgColor)}>
                <Icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
