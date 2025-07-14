"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

const navItems = [
  {
    name: "Home"
  },
  {
    name: "About"
  },
  {
    name: "Experience"
  },
  {
    name: "Projects"
  }
]

const Navigation = () => {
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          navItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link color="foreground" href="#">
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