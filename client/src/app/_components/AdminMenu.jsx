import React, { useState } from 'react'
import { FaTags, FaEdit, FaNewspaper, FaBars } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function AdminMenu() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <div className="bg-white relative">
            {/* Mobile Menu Button */}
            <button 
                onClick={toggleMenu}
                className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-white"
                aria-label="Toggle menu"
            >
                <FaBars />
            </button>
            
            {/* Sidebar Content */}
            <div className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static left-0 top-0 h-full z-10 w-64 bg-white shadow-lg md:shadow-none`}>
                <h4 className="bg-gray-800 text-white py-3 px-4 font-bold text-lg">
                    Admin Panel
                </h4>
                <ul className="divide-y divide-gray-200">
                    <li>
                        <Link href="/dashboard/create-blog" 
                              className={`flex items-center px-4 py-3 hover:bg-gray-200 ${pathname === '/dashboard/create-blog' ? 'bg-gray-200' : ''}`}>
                            <FaEdit className="mr-3" />
                            <span>Create Blog</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/create-category"
                              className={`flex items-center px-4 py-3 hover:bg-gray-200 ${pathname === '/dashboard/admin/create-product' ? 'bg-gray-200' : ''}`}>
                            <FaTags className="mr-3" />
                            <span>Create Category</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard"
                              className={`flex items-center px-4 py-3 hover:bg-gray-200 ${pathname === '/dashboard' ? 'bg-gray-200' : ''}`}>
                            <FaNewspaper className="mr-3" />
                            <span>All Blogs</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
