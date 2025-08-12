'use client'

import { Button } from "@heroui/button";
import { Mail, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/david-benjamin-9b342b290/",
      icon: Linkedin,
      color: "primary" as const,
    },
    {
      name: "GitHub",
      href: "https://github.com/DavidBenj15",
      icon: Github,
      color: "primary" as const,
    },
  ];

  return (
    <footer id="footer" className="w-full py-8 mt-auto border-t border-border">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
        {/* 1. "Let's get in touch" text */}
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            Let's get in touch!
          </p>
        </div>
        
        {/* 2. Social icons (LinkedIn, GitHub) */}
        <div className="flex justify-center items-center space-x-4">
          {socialLinks.map((link) => (
            <Button
              key={link.name}
              as="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              isIconOnly
              radius="full"
              variant="solid"
              color={link.color}
              className="bg-muted text-foreground hover:bg-accent transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
              size="lg"
            >
              <link.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
        
        {/* 3. Email address as text with hover glow */}
        <div className="text-center">
          <a
            href="mailto:davidnbenjamin15@gmail.com"
            className="text-muted-foreground underline hover:text-accent transition-all duration-200 px-4 py-2"
          >
            davidnbenjamin15@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 