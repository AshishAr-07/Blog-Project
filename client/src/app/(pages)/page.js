"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/auth";

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useAuth();

  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:8001/blog/auth/blog//allblog"
      );
      
      if (data?.success) {
        setBlogs(data?.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) { 
      console.log(error);
      toast.error("Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-xl">No blogs found. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {blog.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {typeof blog.category === "object"
                      ? blog.category?.name || "General"
                      : blog.category || "General"}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-3 line-clamp-3">
                  {blog.description}
                </p>
                <div className="flex items-center mt-4">
                  {blog.author && (
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        {blog.author.profile ? (
                          <img
                            src={blog.author.profile}
                            alt={blog.author.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium">
                            {blog.author?.name?.charAt(0) || ""}
                          </span>
                        )}
                      </div>
                      <span className="ml-2 text-sm text-gray-700">
                        {blog.author?.name || "Unknown Author"}
                      </span>
                    </div>
                  )}
                  <button className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
