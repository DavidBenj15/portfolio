"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Experience", href: "#experience" },
  // { name: "Projects",   href: "#projects"   },
  { name: "Education",  href: "#education"  },
  { name: "Skills",     href: "#skills"     },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const NAV_HEIGHT = 72;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = "";
      for (const { href } of navItems) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el && el.offsetTop - NAV_HEIGHT <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="border-b border-border/40 bg-background/80 backdrop-blur-md"
      maxWidth="xl"
    >
      {/* Mobile: hamburger */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      {/* Brand — always visible, scrolls to top */}
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand>
          <a
            href="#"
            className="font-bold text-primary text-xl tracking-widest"
            onClick={closeMenu}
          >
            DB
          </a>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop nav */}
      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <a href="#" className="font-bold text-primary text-xl tracking-widest">
            DB
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {navItems.map(({ name, href }) => {
          const id = href.slice(1);
          const isActive = activeSection === id;
          return (
            <NavbarItem key={name}>
              <a
                href={href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1
                  ${isActive
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {name.toUpperCase()}
              </a>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem>
          <a
            href="#footer"
            className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            CONTACT
          </a>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="pt-6 gap-4 bg-background/95 backdrop-blur-md">
        {navItems.map(({ name, href }) => {
          const id = href.slice(1);
          const isActive = activeSection === id;
          return (
            <NavbarMenuItem key={name}>
              <a
                href={href}
                onClick={closeMenu}
                className={`text-lg font-medium tracking-wide transition-colors duration-200
                  ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {name.toUpperCase()}
              </a>
            </NavbarMenuItem>
          );
        })}
        <NavbarMenuItem>
          <a
            href="#footer"
            onClick={closeMenu}
            className="text-lg font-medium tracking-wide text-muted-foreground"
          >
            CONTACT
          </a>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Navigation;
