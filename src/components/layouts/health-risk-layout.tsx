
import { MedConnectLogo } from "@/components/med-connect-logo";
import { Link } from "react-router-dom";
import { MobileNavigation } from "@/components/mobile-navigation";

// Navigation items for both desktop and mobile
const navigationItems = [
  { title: "Dashboard", href: "/" },
  { title: "Health Risk Assessment", href: "/risk-assessment" }
];

interface HealthRiskLayoutProps {
  children: React.ReactNode;
}

export function HealthRiskLayout({ children }: HealthRiskLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/">
            <MedConnectLogo size="medium" />
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navigationItems.map((item) => (
              <Link 
                key={item.href} 
                to={item.href} 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="md:hidden">
            <MobileNavigation items={navigationItems} />
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
