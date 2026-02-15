import { Gamepad2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-6 h-6 text-primary" />
            <span className="font-heading text-lg font-bold tracking-wider text-foreground">
              <em>NAAMS <span className="neon-text">play</span></em>
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 NAAMS play. All rights reserved. One-time access, unlimited gaming.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
