import { Link, useLocation } from "react-router-dom";
import { FileText, Home, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import citefenceLogo from "@/assets/citefence-logo.png";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/verify", label: "Verify", icon: Search },
  { path: "/documentation", label: "Documentation", icon: FileText },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <img src={citefenceLogo} alt="Citefence Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold tracking-tight">Citefence</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
