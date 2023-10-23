"use client";
import Image from "next/image";
import Groovewave from "../public/groovewave.svg";
import { FaBars } from "react-icons/fa";
import Disk from "../public/disk.svg";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <main className=" bg-gradient-to-b from-[#181616] to-[#052A4D] flex min-h-screen flex-col items-center">
        <Navbar />
        <div className="flex md:flex-row justify-around md:gap-x-40 lg:gap-x-60 items-center min-w-full overflow-hidden min-h-full">
          <div className="relative   gap-y-5 bg-white/[.03] py-10 px-4 backdrop-blur-[3px]  pt-40 md:pt-0 w-[100%] md:w-[50%] mb-10 rounded-lg">
            <h1 className="text-[#00008B]font-inria text-[3rem] md:text-[4rem] lg:text-[5.5rem]">
              Groove<span className="text-[#1D60A0]">wave</span>
            </h1>
            <p className=" font-koulen text-[1rem] md:text-[1.1rem] lg:text-[1.6rem]">
              &quot;Ride the GrooveWave: Your Sound, Your Vibe, Your Way!&quot;
            </p>
            <p className=" font-poppins text-[0.9rem] md:text-[0.9rem] lg:text-[1rem] ">
              Are you ready to dive into a world of limitless music
              possibilities? GrooveWave is your passport to a universe of
              sounds, rhythms, and melodies. Whether you&apos;re a passionate
              music lover, an avid collector, or just looking for your next
              favorite song, GrooveWave has you covered
            </p>
          </div>
          <div className="hidden md:block md:mr-[-45%] lg:mr-[-35%] animate-spin animate-spin-slow">
            <Image src={Disk} alt="Disk" />
          </div>
        </div>
      </main>
    </>
  );
}
