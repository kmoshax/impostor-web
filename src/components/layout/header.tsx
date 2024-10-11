import Link from "next/link";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <Navbar isBordered isBlurred shouldHideOnScroll>
      <NavbarContent>
        <NavbarItem>
          <Button as={Link} href="/test-connection" variant="faded">
            test connection
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarBrand>
          <p className="font-bold text-3xl text-inherit">Imposter</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ModeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
