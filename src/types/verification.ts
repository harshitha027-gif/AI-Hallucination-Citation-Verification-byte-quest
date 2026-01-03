export type VerificationStatus = "verified" | "unverified" | "suspicious";
export type ConfidenceLevel = "high" | "medium" | "low";

export interface Citation {
  id: string;
  text: string;
  type: "url" | "academic" | "book" | "unknown";
  url?: string;
}

export interface Claim {
  id: string;
  text: string;
  citation: Citation | null;
  status: VerificationStatus;
  confidence: ConfidenceLevel;
  reason: string;
  verificationMethod: string;
}

export interface VerificationResult {
  id: string;
  inputText: string;
  claims: Claim[];
  timestamp: Date;
  overallScore: number;
}

export interface VerificationRequest {
  text: string;
}

export interface VerificationResponse {
  success: boolean;
  result?: VerificationResult;
  error?: string;
}
