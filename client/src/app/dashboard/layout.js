"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  FaHome,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { ImBlogger } from "react-icons/im";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth";
import axios from "axios";

const Layout = ({ children }) => {
  const [authorized, setAuthorized] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const router = useRouter();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:8001/blog/auth/dashboard");
      console.log(res)
      if (res.data.ok) {
        setAuthorized(true);
  
      } else {
        setAuthorized(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  const navigation = [
    { name: "Blogs", href: "/dashboard", icon: FaHome },
    { name: "Create Blogs", href: "/dashboard/create-blog", icon: ImBlogger },
    {
      name: "Create Category",
      href: "/dashboard/create-category",
      icon: BiSolidCategoryAlt,
    },
    { name: "Create Roles", href: "/dashboard/create-roles", icon: FaUserPlus },
    { name: "Users", href: "/dashboard/users", icon: FaUser },
  ];

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter((item) => {
    // Show these items only for admin
    if (
      (item.name === "Create Roles" || item.name === "Users") &&
      auth?.user?.role !== "admin"
    ) {
      return false;
    }
    return true;
  });

  return authorized ? (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Mobile Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-white  flex justify-between items-center px-4 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-500 focus:outline-none"
        >
          {sidebarOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>

        <h1 className="text-lg font-bold">Admin Dashboard</h1>

        <button className="p-2 rounded-md text-red-700 focus:outline-none">
          <FaSignOutAlt className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-gray-600 opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="fixed inset-y-0 pt-14 left-0 flex flex-col w-64 max-w-sm bg-white shadow-xl">
          <SidebarContent
            navigation={filteredNavigation}
            setAuthorized={setAuthorized}
            router={router}
          />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-full border-r border-gray-200 bg-white">
            <SidebarContent
              navigation={filteredNavigation}
              setAuthorized={setAuthorized}
              router={router}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6 md:p-6 pt-20 md:pt-6">
          {children}
        </main>
      </div>
    </div>
  ) : null;
};

// Sidebar content component (used for both mobile and desktop)
const SidebarContent = ({ navigation, setAuthorized, router }) => {
  const [auth, setAuth] = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    router.push("/login");
    setAuthorized(false);
  };
  return (
    <>
      {/* Brand/logo */}
      <div className="flex items-center justify-center py-4 flex-shrink-0 px-4 bg-gray-900">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
      </div>

      {/* Navigation */}
      <div className=" flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1">
          {navigation.map((item) => {
            // Special case for dashboard home to avoid it being active for all routes
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-4 text-sm font-medium  ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                } transition-all duration-200`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-500 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <div className="px-4 py-2 border-t border-gray-200">
        <button
          onClick={handleLogout}
          fdprocessedid="c6izr"
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
        >
          <FaSignOutAlt className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  );
};

export default Layout;
