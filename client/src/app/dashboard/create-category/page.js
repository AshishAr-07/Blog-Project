"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiTag } from "react-icons/fi";

export default function page() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [edit,setEdit] = useState(false);
  const [category,setCategory] = useState("");
  const [selected,setSelected] = useState(null);
  
  // handle Submit to create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8001/blog/auth/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} created successfully`);
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8001/blog/auth/category/delete-category/${pId}`
      );
      console.log(data);
      if (data?.success) {
        toast.success("Category deleted successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // get all categories
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

  useEffect(() => {
    getAllCategories();
  }, [categories]); 

// handle update category
const handleUpdate = async (e) =>{
  e.preventDefault();
  try {
    const {data} = await axios.put(`http://localhost:8001/blog/auth/category/update-category/${selected}`,{
      name:category
    });
    if(data?.success){
      toast.success(`${category} updated successfully`);
      setEdit(false);
      setCategory("");
      setSelected(null);
      getAllCategories();
    }
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Category Management
      </h1>

      <div className="grid grid-cols-1 w-full h-full place-content-center gap-8">
        {/* Form Section */}
        <div className="bg-white max-w-2xl p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">
            Create New Category
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>

        {/* Categories Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-xl font-semibold text-gray-700">
              Existing Categories
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {categories.length} {categories.length === 1 ? 'Category' : 'Categories'}
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
            {categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                  <FiTag className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">
                  No categories found
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Create your first category using the form above
                </p>
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category._id}
                  className="px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center group"
                >
                  <h3 className="font-medium text-gray-800">
                    {category.name}
                  </h3>
                  <div className="flex gap-2">
                    <button
                    onClick={()=>{
                      setEdit(true);
                      setSelected(category._id)
                      setCategory(category.name)
                    }}
                      className="p-2 flex gap-2 items-center rounded-full text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      title="Edit category"
                    >
                      <FiEdit2 className="h-4 w-4" />
                     <span className="text-sm"> Edit</span>
                    </button>
                    <button
                      className="p-2 flex gap-2 items-center rounded-full text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                      onClick={() => {
                        if(window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
                          handleDelete(category._id);
                        }
                      }}
                      title="Delete category"
                    >
                      <FiTrash2 className="h-4 w-4" />
                      <span className="text-sm"> Delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Update Modal */}
      {edit && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative border border-gray-300">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-semibold">Edit Category</h2>
            <button 
              onClick={() => {
                setEdit(false);
                setCategory("");
                setSelected(null);
              }} 
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Update Category
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </div>
    
   
  );
}
