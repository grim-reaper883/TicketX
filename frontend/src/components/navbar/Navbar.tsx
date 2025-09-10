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
import { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const signedIn = status === "authenticated";
  const role = (session?.user as { role?: string } | undefined)?.role;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex justify-between bg-gradient-to-r from-cyan-700 to-slate-900 p-3 px-6 items-center rounded-full my-4 relative">
      {/* LEFT: Hamburger + Logo */}
      <div className="flex flex-1 items-center space-x-2">
        {/* Hamburger - only visible on small screens */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href={"/"}>
          <h1 className="text-xl font-bold">TicketX</h1>
        </Link>
      </div>

      {/* CENTER: Nav items (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="flex space-x-1 text-sm cursor-pointer whitespace-nowrap">
          <Link href={"/"}>
            <li className="relative px-3 py-2 transition-all duration-300 ease-in-out hover:text-cyan-200 hover:scale-105 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-cyan-400 before:to-slate-300 before:transition-all before:duration-300 hover:before:w-full">
              HOME
            </li>
          </Link>
          <Link href={"/event"}>
            <li className="relative px-3 py-2 transition-all duration-300 ease-in-out hover:text-cyan-200 hover:scale-105 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-cyan-400 before:to-slate-300 before:transition-all before:duration-300 hover:before:w-full">
              EVENT
            </li>
          </Link>
          <Link href={"/aboutUs"}>
            <li className="relative px-3 py-2 transition-all duration-300 ease-in-out hover:text-cyan-200 hover:scale-105 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-cyan-400 before:to-slate-300 before:transition-all before:duration-300 hover:before:w-full">
              ABOUT US
            </li>
          </Link>
          <Link href={"/blog"}>
            <li className="relative px-3 py-2 transition-all duration-300 ease-in-out hover:text-cyan-200 hover:scale-105 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-cyan-400 before:to-slate-300 before:transition-all before:duration-300 hover:before:w-full">
              BLOG
            </li>
          </Link>
          {role === "admin" && (
            <Link href={"/manageEvent"}>
              <li className="relative px-3 py-2 transition-all duration-300 ease-in-out hover:text-cyan-200 hover:scale-105 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-cyan-400 before:to-slate-300 before:transition-all before:duration-300 hover:before:w-full">
                MANAGE EVENT
              </li>
            </Link>
          )}
        </ul>
      </div>

      {/* RIGHT: Auth buttons / User menu */}
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

      {/* Mobile Menu (slide-out) */}
      {mobileOpen && (
        <div className="absolute top-full left-0  bg-gray-900 text-white rounded-lg mt-2 shadow-lg lg:hidden z-50">
          <ul className="flex flex-col text-sm">
            <Link href={"/"}>
              <li className="px-4 py-2  active:bg-gray-700 transition-colors">
                HOME
              </li>
            </Link>
            <Link href={"/event"}>
              <li className="px-4 py-2  active:bg-gray-700 transition-colors">
                EVENT
              </li>
            </Link>
            <Link href={"/aboutUs"}>
              <li className="px-4 py-2  active:bg-gray-700 transition-colors">
                ABOUT US
              </li>
            </Link>
            <Link href={"/blog"}>
              <li className="px-4 py-2  active:bg-gray-700 transition-colors">
                BLOG
              </li>
            </Link>
            {role === "admin" && (
              <Link href={"/manageEvent"}>
                <li className="px-4 py-2  active:bg-gray-700 transition-colors">
                  MANAGE EVENT
                </li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
