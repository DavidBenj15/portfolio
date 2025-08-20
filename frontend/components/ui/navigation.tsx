"use client";
import { Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/navbar";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "Projects",
    link: "/projects"
  },
  {
    name: "Experience",
    link: "/experience"
  },
  {
    name: "Education",
    link: "/education"
  },

  // {
  //   name: "Timeline",
  //   link: "/timeline"
  // }
]

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          navItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link color="foreground" href={item.link}
              >
                {item.name.toUpperCase()}
              </Link>
            </NavbarItem>
          ))
        }
      </NavbarContent>
      
      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link color="foreground" href={item.link}
            >
              {item.name.toUpperCase()}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Navigation; 