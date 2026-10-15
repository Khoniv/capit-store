'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {

  const { getToken } = useAppContext()

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('offerPrice', offerPrice)
    formData.append('stock', stock)


    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }
    try {
      const token = await getToken()
      const { data } = await axios.post('/api/product/add', formData, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setFiles([]);
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setOfferPrice('');
        setStock('');
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">Add New Sandal</h1>
        <p className="text-xs text-neutral-500 mt-1">Upload and list a new handcrafted sandal product to your store catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-6 sm:p-8 border border-black/[0.05] shadow-xs space-y-6 max-w-2xl">
        {/* Product Images */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
            Product Images (Max 4)
          </label>
          <div className="flex flex-wrap items-center gap-3">
            {[...Array(4)].map((_, index) => (
              <label
                key={index}
                htmlFor={`image${index}`}
                className="w-24 h-24 rounded-2xl border-2 border-dashed border-neutral-200 hover:border-neutral-400 bg-[#FAF8F5] flex items-center justify-center cursor-pointer overflow-hidden transition group"
              >
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                {files[index] ? (
                  <Image
                    className="w-full h-full object-cover"
                    src={URL.createObjectURL(files[index])}
                    alt="preview"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="flex flex-col items-center text-neutral-400 group-hover:text-neutral-700">
                    <span className="text-xl leading-none">＋</span>
                    <span className="text-[10px] font-medium mt-1">Upload</span>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="e.g. Sandal Gunung Explorer Trek"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-[#FAF8F5] outline-none focus:border-neutral-900 focus:bg-white transition"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        {/* Product Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={3}
            placeholder="Describe the materials, comfort, and best use..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-[#FAF8F5] outline-none focus:border-neutral-900 focus:bg-white transition resize-none"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        {/* Details Grid: Category, Price, Offer Price, Stock */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1.5 col-span-2 sm:col-span-1">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="w-full px-3 py-2.5 text-xs font-medium rounded-xl border border-neutral-200 bg-[#FAF8F5] outline-none focus:border-neutral-900 focus:bg-white transition"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
              required
            >
              <option value="" disabled hidden>Select Category</option>
              <option value="Sandal jepit">Sandal Jepit</option>
              <option value="Sandal Slide">Sandal Slide</option>
              <option value="Sandal Gunung">Sandal Gunung</option>
              <option value="Sandal Platform">Sandal Platform</option>
              <option value="Sandal heels">Sandal Heels</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block" htmlFor="product-price">
              Price (Rp)
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="e.g. 50000"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-[#FAF8F5] outline-none focus:border-neutral-900 focus:bg-white transition"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block" htmlFor="offer-price">
              Promo (Rp)
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="e.g. 39000"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-[#FAF8F5] outline-none focus:border-neutral-900 focus:bg-white transition"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="e.g. 25"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-[#FAF8F5] outline-none focus:border-neutral-900 focus:bg-white transition"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-neutral-950 text-white hover:bg-neutral-800 transition font-bold text-xs uppercase tracking-wider rounded-full shadow-sm hover:shadow-md"
          >
            Publish Sandal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;