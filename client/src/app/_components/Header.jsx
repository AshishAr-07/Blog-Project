'use client'
import React, { useCallback, useState } from 'react'
import Wrapper from './Wrapper'
import Link from 'next/link'
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleClick = useCallback(() => setIsMenuOpen(prev => !prev), [])
    const menuClick = useCallback(() => {
        setIsMenuOpen(false)
    }, [])
    return (
        <header className='w-full bg-gray-200 text-black py-2 sticky top-0 left-0 right-0 z-50 '>
            <section className='max-w-screen-xl  mx-auto py-2 lg:px-0 px-8'>
                <div className='flex justify-between items-center'>
                    <Link href='/'>
                        <h1 className='text-3xl'>Blog</h1>
                    </Link>
                    <nav className='md:flex hidden'>
                        <ul className='flex  text-lg gap-5'>
                            <Link href="/"  ><li>Home </li></Link>
                            <Link href="/about"><li>About </li></Link>
                            <Link href="/product" ><li>Product </li></Link>
                            <Link href="/contact"><li>Contact </li></Link>
                        </ul>
                    </nav>

                    {/* Mobile navbar */}
                    <nav className='md:hidden'>
                        <button onClick={handleClick}>{isMenuOpen ? <RxCross2 size={35} /> : <RxHamburgerMenu size={35} />}</button>
                    </nav>
                </div>
            </section>
            {isMenuOpen && (
                <div className='absolute w-full text-black bg-white'>
                    <Wrapper className='pt-4 pb-4'>
                        <ul className='flex flex-col text-lg gap-2'>
                            <Link onClick={menuClick} href="/" ><li>Home </li></Link>
                            <Link onClick={menuClick} href="/about" ><li>About </li></Link>
                            <Link onClick={menuClick} href="/product" ><li>Product </li></Link>
                            <Link onClick={menuClick} href="/contact" ><li>Contact </li></Link>
                        </ul>
                    </Wrapper>
                </div>


            )
            }
        </header>
    )
}