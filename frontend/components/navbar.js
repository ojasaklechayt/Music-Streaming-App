'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import Groovewave from '../public/groovewave.svg';
import { FaBars } from 'react-icons/fa';
import { useAuthValues } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [authToken, setAuthToken] = useAuthValues()

    const logout = () => {
        setAuthToken(null)
        router.push('/home')
    }
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className='flex flex-row justify-between items-center min-w-full px-5 bg-transparent py-2'>
            <Image src={Groovewave} alt='Navbar' />
            <div>
                {authToken ? (
                    <button className='hidden md:block bg-[#F5F5F5] text-black font-bold hover:bg-[#253646] hover:text-white py-2 px-5 mt-2 md:mt-0 rounded-xl' onClick={logout}>Logout</button>
                ) : (
                    <div className='hidden gap-4 md:flex'>
                        <button className='block bg-[#F5F5F5] text-black font-bold hover:bg-[#253646] hover:text-white py-2 px-5 mt-2 md:mt-0 rounded-xl'><a href='/register'>Register</a></button>
                        <button className='block bg-[#F5F5F5] text-black font-bold hover:bg-[#253646] hover:text-white py-2 px-5 mt-2 md:mt-0 rounded-xl'><a href='/login'>Login</a></button>
                    </div>
                )}
                <div className="md:hidden relative inline-block text-left">
                    <div>
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50"
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
                            {authToken ? (
                                <button className="text-black text-center font-bold py-2 px-5 mt-2 md:mt-0 rounded-xl" role="menuitem" id="menu-item-3" onClick={logout}>Logout</button>
                            ) : (
                                <>
                                    <button className="text-black text-center font-bold py-2 px-5 mt-2 md:mt-0 rounded-xl" role="menuitem" id="menu-item-3"><a href='/register'>Register</a></button>
                                    <button className="text-black text-center font-bold py-2 px-5 mt-2 md:mt-0 rounded-xl" role="menuitem" id="menu-item-3"><a href='/login'>Login</a></button>
                                </>
                            )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
