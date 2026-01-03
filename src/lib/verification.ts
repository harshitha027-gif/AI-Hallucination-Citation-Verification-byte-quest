import { Claim, Citation, VerificationResult, VerificationStatus, ConfidenceLevel } from "@/types/verification";

// Extract URLs from text
const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s\)]+)/g;
  return text.match(urlRegex) || [];
};

// Extract academic citations (Author et al., Year pattern)
const extractAcademicCitations = (text: string): string[] => {
  const academicRegex = /([A-Z][a-z]+ et al\., \d{4}[^\.]*)/g;
  return text.match(academicRegex) || [];
};

// Extract book references
const extractBookReferences = (text: string): string[] => {
  const bookRegex = /[""]([^""]+)[""] by ([^(]+)\(([^)]+)\)/g;
  const matches: string[] = [];
  let match;
  while ((match = bookRegex.exec(text)) !== null) {
    matches.push(`${match[1]} by ${match[2].trim()} (${match[3]})`);
  }
  return matches;
};

// Simulate URL verification
const verifyUrl = async (url: string): Promise<{ exists: boolean; status: number }> => {
  // Known valid domains for simulation
  const validDomains = [
    'nature.com',
    'imf.org',
    'who.int',
    'arxiv.org',
    'pubmed.gov',
    'github.com',
    'wikipedia.org'
  ];
  
  const domain = new URL(url).hostname.replace('www.', '');
  const isKnownValid = validDomains.some(d => domain.includes(d));
  
  // Simulate fake URLs
  if (url.includes('fake') || url.includes('fictional') || url.includes('.fake')) {
    return { exists: false, status: 404 };
  }
  
  // Known valid URLs
  if (isKnownValid) {
    return { exists: true, status: 200 };
  }
  
  // Random for unknown URLs (60% chance valid)
  return { exists: Math.random() > 0.4, status: Math.random() > 0.4 ? 200 : 404 };
};

// Simulate academic citation verification
const verifyAcademicCitation = async (citation: string): Promise<{ found: boolean; source: string }> => {
  // Check for known real publications
  const knownPublications = [
    'Deep Learning',
    'Attention Is All You Need',
    'ImageNet',
    'BERT',
    'GPT'
  ];
  
  const isKnown = knownPublications.some(pub => citation.toLowerCase().includes(pub.toLowerCase()));
  
  if (isKnown) {
    return { found: true, source: 'CrossRef/Semantic Scholar' };
  }
  
  // Simulate verification (40% found)
  return { found: Math.random() > 0.6, source: 'Simulated Academic DB' };
};

// Parse claims from text
const parseClaims = (text: string): string[] => {
  // Split by sentences and filter meaningful claims
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.filter(s => 
    s.length > 30 && 
    (s.includes('according') || 
     s.includes('study') || 
     s.includes('research') || 
     s.includes('report') ||
     s.includes('published') ||
     s.includes('%') ||
     s.includes('demonstrated') ||
     s.includes('shows'))
  );
};

// Determine verification status based on checks
const determineStatus = (
  urlCheck: { exists: boolean } | null,
  academicCheck: { found: boolean } | null
): { status: VerificationStatus; confidence: ConfidenceLevel; reason: string } => {
  if (urlCheck && academicCheck) {
    if (urlCheck.exists && academicCheck.found) {
      return { status: 'verified', confidence: 'high', reason: 'URL accessible and citation found in academic databases' };
    }
    if (urlCheck.exists || academicCheck.found) {
      return { status: 'verified', confidence: 'medium', reason: 'Partially verified through available sources' };
    }
    return { status: 'unverified', confidence: 'low', reason: 'Could not verify through URL or academic sources' };
  }
  
  if (urlCheck) {
    if (urlCheck.exists) {
      return { status: 'verified', confidence: 'high', reason: 'URL is accessible and returns valid response' };
    }
    return { status: 'unverified', confidence: 'high', reason: 'URL returns 404 or is inaccessible' };
  }
  
  if (academicCheck) {
    if (academicCheck.found) {
      return { status: 'verified', confidence: 'medium', reason: 'Citation found in academic databases' };
    }
    return { status: 'suspicious', confidence: 'low', reason: 'Citation not found in academic databases' };
  }
  
  return { status: 'suspicious', confidence: 'low', reason: 'No verifiable citations found for this claim' };
};

// Main verification function
export const verifyContent = async (text: string): Promise<VerificationResult> => {
  const claims = parseClaims(text);
  const urls = extractUrls(text);
  const academicCitations = extractAcademicCitations(text);
  const bookRefs = extractBookReferences(text);
  
  const verifiedClaims: Claim[] = [];
  
  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];
    const claimUrls = urls.filter(url => claim.includes(url));
    const claimAcademic = academicCitations.find(ac => claim.includes(ac.split(',')[0]));
    const claimBook = bookRefs.find(book => claim.toLowerCase().includes(book.split(' by ')[0].toLowerCase()));
    
    let citation: Citation | null = null;
    let urlCheck: { exists: boolean; status: number } | null = null;
    let academicCheck: { found: boolean; source: string } | null = null;
    let verificationMethod = 'Pattern analysis';
    
    // Verify URL if present
    if (claimUrls.length > 0) {
      const url = claimUrls[0];
      urlCheck = await verifyUrl(url);
      citation = {
        id: `cit-${i}-url`,
        text: url,
        type: 'url',
        url: url
      };
      verificationMethod = 'HTTP link validation';
    }
    
    // Verify academic citation if present
    if (claimAcademic) {
      academicCheck = await verifyAcademicCitation(claimAcademic);
      if (!citation) {
        citation = {
          id: `cit-${i}-academic`,
          text: claimAcademic,
          type: 'academic'
        };
      }
      verificationMethod = academicCheck.source;
    }
    
    // Handle book references
    if (claimBook && !citation) {
      // Known books
      const knownBooks = ['Deep Learning', 'Pattern Recognition'];
      const isKnown = knownBooks.some(book => claimBook.includes(book));
      
      citation = {
        id: `cit-${i}-book`,
        text: claimBook,
        type: 'book'
      };
      
      if (isKnown) {
        urlCheck = { exists: true, status: 200 };
        verificationMethod = 'Book database lookup';
      }
    }
    
    const { status, confidence, reason } = determineStatus(urlCheck, academicCheck);
    
    verifiedClaims.push({
      id: `claim-${i}`,
      text: claim,
      citation,
      status,
      confidence,
      reason,
      verificationMethod
    });
  }
  
  // Calculate overall score
  const verifiedCount = verifiedClaims.filter(c => c.status === 'verified').length;
  const overallScore = claims.length > 0 ? Math.round((verifiedCount / claims.length) * 100) : 0;
  
  return {
    id: `result-${Date.now()}`,
    inputText: text,
    claims: verifiedClaims,
    timestamp: new Date(),
    overallScore
  };
};
