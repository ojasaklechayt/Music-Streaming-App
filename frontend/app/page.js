'use client'
import { useState } from 'react';
import Image from 'next/image';
import Groovewave from '../public/groovewave.svg';
import { FaBars } from 'react-icons/fa';
import Disk from '../public/disk.svg';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="bg-gradient-to-b from-[#181616] to-[#052A4D] flex min-h-screen flex-col items-center">
      <div className='flex flex-row justify-between items-center min-w-full px-5'>
        <Image src={Groovewave} alt='Navbar' />
        <div>
          <button className='hidden md:block bg-[#F5F5F5] text-black font-bold hover:bg-[#253643] hover:text-white py-2 px-5 mt-2 md:mt-0 rounded-xl'>Login</button>
          <div className="md:hidden relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <FaBars className={`-mr-1 h-5 w-5 text-gray-400 transform ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                  <button className="text-black text-center font-bold py-2 px-5 mt-2 md:mt-0 rounded-xl" role="menuitem" id="menu-item-3">Sign out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex md:flex-row justify-center md:gap-x-40 lg:gap-x-60 items-center min-w-full overflow-hidden min-h-full'>
        <div className='text-center pt-40 md:pt-0 w-[100%] md:w-[50%] mb-10'>
          <h1 className='font-inria text-[3rem] md:text-[4rem] lg:text-[5.5rem]'>
            Groove<span className='text-[#1D60A0]'>wave</span>
          </h1>
          <p className='font-koulen text-[1rem] md:text-[1.1rem] lg:text-[1.4rem]'>
          &quot;Ride the GrooveWave: Your Sound, Your Vibe, Your Way!&quot;
          </p>
          <p className='font-poppins text-[0.9rem] md:text-[0.9rem] lg:text-[1rem] px-[10%]'>Are you ready to dive into a world of limitless music possibilities? GrooveWave is your passport to a universe of sounds, rhythms, and melodies. Whether you&apos;re a passionate music lover, an avid collector, or just looking for your next favorite song, GrooveWave has you covered</p>
        </div>
        <div className='hidden md:block md:mr-[-45%] lg:mr-[-35%] animate-spin animate-spin-slow'>
          <Image src={Disk} alt='Disk' />
        </div>
      </div>
    </main>
  );
}
