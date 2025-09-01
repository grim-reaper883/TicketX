import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero01 = () => {
  return (
    <div className=" mt-35 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className=" text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          <span className=" bg-gradient-to-r from-cyan-700 to-cyan-300 bg-clip-text text-transparent tracking-wide font-extrabold">
            Welcome to TicketX
          </span>{" "}
          Where you find your next event.
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Explore a collection of events, ready to buy and book. What are you
          waiting for? book your ticket now!
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href={'/event'}>
            <Button size="lg" className="rounded-full text-base cursor-pointer">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero01;
