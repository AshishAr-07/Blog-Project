"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState(null);
  const params = useParams();
  const router = useRouter();

  // get All Category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8001/blog/auth/category/getcategory"
      );

      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Call getAllCategories when component mounts
  useEffect(() => {
    getAllCategories();
  }, []);

  // Single Category
  const getSingleBlog = async () => {
    const { data } = await axios.get(
      `http://localhost:8001/blog/auth/blog/singleblog/${params.slug}`
    );
    console.log(data)
    if (data?.success) {
      setId(data?.blog?._id);
      setTitle(data?.blog?.title);
      setShortDescription(data?.blog?.shortdescription);
      setDescription(data?.blog?.description);
      setSelectedCategory(data?.blog?.category?._id);
      setImage(data?.blog?.image);
    } else {
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, []);

  //Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const blogdata = new FormData();
      blogdata.append("title", title);
      blogdata.append("shortdescription", shortDescription);
      blogdata.append("description", description);
      blogdata.append("category", selectedCategory);
      image && blogdata.append("image", image);
      const { data } = await axios.put(
        `http://localhost:8001/blog/auth/blog/updateblog/${id}`,
        blogdata
      );
      if (data?.success) {
        toast.success(data?.message);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating blog");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <form
        encType="multipart/form-data"
        onSubmit={handleUpdate}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a brief description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        {/* Full Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Description
          </label>
          <textarea
            id="description"
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your blog content here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Featured Image
          </label>
          <div className="mt-1 flex items-center">
            <label className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <p className="pl-1">Click to upload image</p>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </label>
          </div>
          {image && (
            <p className="mt-2 text-sm text-gray-500">
              Selected file: {image.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
}
