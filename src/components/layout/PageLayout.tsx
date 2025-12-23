import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showNav?: boolean;
}

export const PageLayout = ({
  children,
  showHeader = true,
  showNav = true,
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen pb-20">
      {showHeader && <Header />}
      <main className={showHeader ? "pt-14" : ""}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  );
};
