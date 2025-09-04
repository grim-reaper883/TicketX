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
import { LogOut, Ticket, UserRound } from "lucide-react";

const signedIn = false;

const Navbar = () => {
  return (
    <div className="flex justify-between bg-gradient-to-r from-cyan-700 to-slate-900 p-3 px-6 items-center rounded-full  my-4">
      <div>
        <h1 className=" text-xl font-bold">TicketX</h1>
      </div>
      <div className="">
        <ul className=" flex space-x-6 font-semibold cursor-pointer ">
          <Link href={"/"}>
            <li>HOME</li>
          </Link>
          <Link href={"/event"}>
            <li>EVENT</li>
          </Link>
        </ul>
      </div>
      <div>
        {signedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className=" flex items-center cursor-pointer ">
                  <UserRound className=" bg-white text-black rounded-full h-10 w-10" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={18} align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <User className=" h-[1.2rem] w-[1.2rem] mr-2" />
                  Profile
                </DropdownMenuItem> */}
                <Link href={'/myTickets'}>
                  <DropdownMenuItem>
                    <Ticket className=" h-[1.2rem] w-[1.2rem] mr-2" />
                    My Tickets
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem variant="destructive">
                  <LogOut className=" h-[1.2rem] w-[1.2rem] mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href={'/signin'}>
            <Button className=" rounded-full font-bold">Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
