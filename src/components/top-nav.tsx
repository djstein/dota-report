"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function TopNav() {
  return (
    <div className="flex justify-center m-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <h1 className="font-extrabold p-2">DOTA Reports</h1>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/teams" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Teams
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="https://github.com/djstein/dota-report"
              legacyBehavior
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                View GitHub Repo
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
