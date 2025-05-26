"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [blog, setBlog] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8001/blog/auth/blog/allblog"
      );
      if (data?.error) {
        toast.error(data?.message);
      } else {
        setBlog(data?.blogs);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  // delete blog
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8001/blog/auth/blog/deleteblog/${id}`
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllBlogs();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleting blog");
    }
  };

  return (
    <div className="py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-4">
        All Blogs
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {blog?.map((b) => (
          <div
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            key={b._id}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  {b.category.name}
                </span>
                <div className="flex space-x-2 items-center">
                  <Link href={`/dashboard/update-blog/${b.slug}`}>
                    <button
                      className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                      aria-label="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete "${b.title}"?`
                        )
                      ) {
                        handleDelete(b._id);
                      }
                    }}
                    className="text-gray-500 hover:text-red-600 transition-colors p-1"
                    aria-label="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                {b.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {b.shortdescription}
              </p>
              <div className="border-t pt-4 mt-2">
                <p className="text-sm text-gray-500 line-clamp-3">
                  {b.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
