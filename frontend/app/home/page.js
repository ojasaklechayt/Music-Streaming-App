import React from 'react'
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Abstract from '../../public/abstract_figures.png';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-gradient-to-b from-[#181616] to-[#052A4D] flex min-h-screen flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col md:flex-row justify-center items-center w-screen h-screen gap-x-[10%] px-10 z-1">
                    <div className="hidden md:block">
                        <Image src={Abstract} className="LOGO" id="LOGO" alt="Logo" />
                    </div>

                    {/* Homepage */}

                    <section className="font-poppins rounded-lg w-[450px] z-10">
                        <div className="flex flex-col items-center justify-center px-6 py-8  mx-auto md:h-[50%] rounded-lg lg:py-0">
                            <div className="w-full md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
                                        Welcome, this is the homepage
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Home
