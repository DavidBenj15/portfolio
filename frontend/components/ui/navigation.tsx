"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";

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

  {
    name: "Timeline",
    link: "/timeline"
  }
]

const Navigation = () => {
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          navItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link color="foreground" href={item.link}>
                {item.name.toUpperCase()}
              </Link>
            </NavbarItem>
          ))
        }
      </NavbarContent>
    </Navbar>
  )
}

export default Navigation; 