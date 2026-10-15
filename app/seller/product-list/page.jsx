'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const { router, getToken, user } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    offerPrice: '',
    stock: '',
  });

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/product/seller-list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      offerPrice: product.offerPrice,
      stock: product.stock,
    });
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.put(`/api/product/${selectedProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        toast.success("Produk berhasil diupdate");
        setShowModal(false);
        fetchSellerProduct();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus produk ini?");
    if (!confirm) return;
    try {
      const token = await getToken();
      const { data } = await axios.delete(`/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        toast.success("Produk berhasil dihapus!");
        fetchSellerProduct();
      } else {
        toast.error(data.message || "Gagal menghapus produk.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus produk.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  return (
    <div className="w-full">
      {loading ? <Loading /> : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">Your Products</h1>
              <p className="text-xs text-neutral-500 mt-1">Manage and update your published sandal products</p>
            </div>
            <button
              onClick={() => router.push('/seller')}
              className="px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition"
            >
              ＋ Add New
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-black/[0.05] shadow-xs overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#FAF8F5] border-b border-black/[0.05] text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-4 py-4 max-sm:hidden">Category</th>
                  <th className="px-4 py-4">Price</th>
                  <th className="px-4 py-4 max-sm:hidden">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] text-xs">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-neutral-400">
                      No products found. Start by adding one!
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr key={index} className="hover:bg-neutral-50/60 transition">
                      <td className="px-6 py-3.5 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] p-1 flex items-center justify-center shrink-0 border border-black/[0.04]">
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            className="max-h-10 max-w-10 object-contain"
                            width={50}
                            height={50}
                          />
                        </div>
                        <span className="font-bold text-neutral-900 truncate max-w-xs">{product.name}</span>
                      </td>
                      <td className="px-4 py-3.5 max-sm:hidden text-neutral-600 font-medium">
                        <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-[11px]">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-neutral-900">
                        Rp {product.offerPrice?.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-3.5 max-sm:hidden text-neutral-600 font-medium">
                        {product.stock || 0} pcs
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="px-3 py-1 rounded-full text-xs font-bold text-neutral-700 hover:bg-black/[0.05] transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => router.push(`/product/${product._id}`)}
                          className="px-3 py-1 rounded-full text-xs font-bold text-neutral-900 hover:bg-black/[0.05] transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Edit Product */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded resize-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="" disabled hidden>-- Pilih --</option>
                  <option value="Sandal Jepit">Sandal Jepit</option>
                  <option value="Sandal Slide">Sandal Slide</option>
                  <option value="Sandal Gunung">Sandal Gunung</option>
                  <option value="Sandal Platform">Sandal Platform</option>
                  <option value="Sandal Heels">Sandal Heels</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Offer Price</label>
                <input
                  type="number"
                  value={formData.offerPrice}
                  onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductList;
