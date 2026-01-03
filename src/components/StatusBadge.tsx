import { cn } from "@/lib/utils";
import { VerificationStatus, ConfidenceLevel } from "@/types/verification";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface StatusBadgeProps {
  status: VerificationStatus;
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge = ({ status, showIcon = true, className }: StatusBadgeProps) => {
  const config = {
    verified: {
      label: "Verified",
      icon: CheckCircle,
      className: "bg-success/10 text-success border-success/20"
    },
    unverified: {
      label: "Unverified",
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/20"
    },
    suspicious: {
      label: "Suspicious",
      icon: AlertTriangle,
      className: "bg-warning/10 text-warning border-warning/20"
    }
  };

  const { label, icon: Icon, className: statusClassName } = config[status];

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
      statusClassName,
      className
    )}>
      {showIcon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
};

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  className?: string;
}

export const ConfidenceBadge = ({ level, className }: ConfidenceBadgeProps) => {
  const config = {
    high: "bg-success/5 text-success border-success/10",
    medium: "bg-warning/5 text-warning border-warning/10",
    low: "bg-muted text-muted-foreground border-muted"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border capitalize",
      config[level],
      className
    )}>
      {level}
    </span>
  );
};
