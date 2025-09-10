"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { LogOut, Ticket, UserRound, Menu } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const signedIn = status === "authenticated";
  const role = (session?.user as { role?: string } | undefined)?.role;

  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/event", label: "EVENT" },
    { path: "/aboutUs", label: "ABOUT US" },
    { path: "/blog", label: "BLOG" },
  ];

  return (
    <div className="relative flex justify-between bg-gradient-to-r from-cyan-700 to-slate-900 p-3 px-6 items-center rounded-full my-4">
      {/* LEFT: Hamburger + Logo */}
      <div className="flex flex-1 items-center space-x-2">
        <button
          ref={menuButtonRef}
          className="lg:hidden text-white"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link href={"/"}>
          <h1 className="text-xl font-bold">TicketX</h1>
        </Link>
      </div>

      {/* CENTER: Desktop nav */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="flex space-x-1 text-sm cursor-pointer whitespace-nowrap">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <li
                className="relative px-3 py-2 transition-all duration-300 ease-in-out hover:text-cyan-200 hover:scale-105
                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5
                before:bg-gradient-to-r before:from-cyan-400 before:to-slate-300
                before:transition-all before:duration-300 hover:before:w-full"
              >
                {link.label}
              </li>
            </Link>
          ))}
          {role === "admin" && (
            <Link href={"/manageEvent"}>
              <li
                className="relative px-3 py-2 transition-all duration-300 ease-in-out hover:text-cyan-200 hover:scale-105
                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5
                before:bg-gradient-to-r before:from-cyan-400 before:to-slate-300
                before:transition-all before:duration-300 hover:before:w-full"
              >
                MANAGE EVENT
              </li>
            </Link>
          )}
        </ul>
      </div>

      {/* RIGHT: Auth buttons */}
      <div className="flex flex-1 justify-end">
        {signedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="flex items-center cursor-pointer">
                <UserRound className="bg-white text-black rounded-full w-8 h-6" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-44 h-36 p-4"
              sideOffset={18}
              align="end"
            >
              <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/myTickets"}>
                <DropdownMenuItem className="text-sm">
                  <Ticket className="h-[1.2rem] w-[1.2rem] mr-2" />
                  My Tickets
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="text-sm"
                onClick={() => signOut()}
                variant="destructive"
              >
                <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/signin"}>
            <Button
              onClick={() => signIn()}
              className="cursor-pointer rounded-full font-bold"
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`absolute top-full transform  bg-gray-900 text-white rounded-lg shadow-lg lg:hidden z-50
          overflow-hidden transition-all duration-300 ease-out origin-top
          ${mobileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
        style={{ width: "90%", maxWidth: "10rem" }}
      >
        <ul className="flex flex-col text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileOpen(false)}
            >
              <li className="px-4 py-2 hover:bg-gray-800 active:bg-gray-700 transition-colors">
                {link.label}
              </li>
            </Link>
          ))}
          {role === "admin" && (
            <Link href={"/manageEvent"} onClick={() => setMobileOpen(false)}>
              <li className="px-4 py-2 hover:bg-gray-800 active:bg-gray-700 transition-colors">
                MANAGE EVENT
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
