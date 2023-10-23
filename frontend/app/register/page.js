'use client'
import { useState } from 'react';
import Navbar from '@/components/navbar';
import Abstract from '../../public/abstract_figures.png';
import Link from 'next/link'; // Make sure to import Link
import Image from 'next/image';
import axios from 'axios';

import { useRouter } from 'next/navigation';


export default function Register() {

    const router = useRouter()

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            // Send a POST request using Axios
            const response = await axios.post('https://music-streaming-app.onrender.com/users/register', formData);
            console.log('Login successful:', response);
            if (response.status === 201) {
                router.push('/login')
            }



        } catch (error) {
            console.log(error)

        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });


    return (
        <div>
            <Navbar />
            <div className="bg-gradient-to-b from-[#181616] to-[#052A4D] flex min-h-screen flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col md:flex-row justify-center items-center w-screen h-screen gap-x-[10%] px-10 z-1">
                    <div className="hidden md:block">
                        <Image src={Abstract} className="LOGO" id="LOGO" alt="Logo" />
                    </div>

                    {/* Register form */}

                    <section className="font-poppins rounded-lg w-[450px] z-10">
                        <div className="flex flex-col items-center justify-center px-6 py-8  mx-auto md:h-[50%] rounded-lg lg:py-0">
                            <div className="w-full md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
                                        REGISTER
                                    </h1>
                                    <form className="space-y-4 md:space-y-6">
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-bold text-white">Username</label>
                                            <input type="text" onChange={handleInputChange} name="username" id="username" className="bg-[#3A6A70] text-white placeholder-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your username" required />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-bold text-white">Email</label>
                                            <input type="email" onChange={handleInputChange} name="email" id="email" className="bg-[#3A6A70] text-white placeholder-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your email" required />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-bold text-white">Password</label>
                                            <input type="password" onChange={handleInputChange} name="password" id="password" placeholder="Enter your password" className="bg-[#3A6A70] text-white placeholder-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                        </div>

                                        <button type="submit" onClick={handleRegister} className="w-[50%] bg-white text-black font-bold rounded-md py-2 mt-7 px-3 sm:px-4 duration-50 text-sm sm:text-base font-poppins hover:bg-gray-300 hover:cursor-pointer transition duration-300 ease-in-out">Register</button>
                                    </form>
                                    <p className="font-poppins text-center mt-2 pt-5">
                                        Already have an account?{" "}
                                    </p>
                                    <Link href="/login">
                                        <p className="font-poppins text-center z-10">
                                            <span className="text-[#3AE7FF] hover:cursor-pointer hover:underline" style={{ zIndex: 10 }}>
                                                Login Now!
                                            </span>
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
