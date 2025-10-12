"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { CircleCheck, CircleHelp, Home, BookOpen } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function NavigationPage() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <NavigationMenu className="relative bg-gray-900 text-white shadow-md">
      <NavigationMenuList className="flex items-center justify-between p-4 max-w-6xl mx-auto">

        {/* Logo */}
        <div className="text-2xl font-bold hover:text-gray-300 transition">
          MyApp
        </div>

        {/* Menu Items */}
        <div className="flex items-center space-x-6">

          {/* Home Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-1 hover:text-gray-300 transition">
              <Home className="w-5 h-5" /> Home
            </NavigationMenuTrigger>
            <NavigationMenuContent className="absolute mt-2 bg-gray-800 rounded-md shadow-lg p-4 w-48 z-10">
              <ul className="flex flex-col gap-2">
                <NavigationMenuLink asChild>
                  <Link to="/dashboards" className="hover:text-gray-200 transition">Dashboard</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/about" className="hover:text-gray-200 transition">About Us</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <LogoutButton />
                </NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Tasks Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-1 hover:text-gray-300 transition">
              Tasks
            </NavigationMenuTrigger>
            <NavigationMenuContent className="absolute mt-2 bg-gray-800 rounded-md shadow-lg p-4 w-48 z-10">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 hover:text-gray-200 transition">
                  <CircleHelp className="w-4 h-4" /> Backlog
                </li>
                <li className="flex items-center gap-2 hover:text-gray-200 transition">
                  <CircleCheck className="w-4 h-4" /> Done
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Docs Link */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/docs"
                className="flex items-center gap-1 hover:text-gray-300 transition"
              >
                <BookOpen className="w-5 h-5" /> Docs
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* User Profile */}
          {isAuthenticated && (
            <div className="flex items-center gap-3 ml-6">
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span>{user.name}</span>
                <span className="text-gray-400 text-xs">{user.email}</span>
              </div>
            </div>
          )}

          {/* Logout */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <LogoutButton />
            </NavigationMenuLink>
          </NavigationMenuItem>

        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
