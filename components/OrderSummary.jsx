import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserAddresses(data.address);
        if (data.address.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please Select an Address");
      }
      let cartItemsArray = Object.keys(cartItems).map((key) => ({
        product: key,
        quantity: cartItems[key],
      }));
      cartItemsArray = cartItemsArray.filter(item => item.quantity > 0)
      if (cartItemsArray.length === 0) {
        return toast.error('Cart is Empety')
      }
      const token = await getToken()
      const{data} = await axios.post('/api/order/create',{
        address: selectedAddress._id,
        items: cartItemsArray
      },{
        headers:{Authorization:`Bearer ${token}`}
      })
      if (data.success) {
        toast.success(data.message)
        setCartItems({})
        router.push('/order-placed')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user]);

  return (
    <div className="w-full md:w-96 bg-white rounded-[2rem] border border-black/[0.05] p-6 shadow-xs h-fit">
      <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
        Order Summary
      </h2>
      <hr className="border-black/[0.05] my-4" />
      <div className="space-y-5">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-2">
            Delivery Address
          </label>
          <div className="relative inline-block w-full text-xs">
            <button
              className="w-full text-left px-3.5 py-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800 font-medium focus:outline-none flex items-center justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="truncate pr-2">
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.city}`
                  : "Select Address"}
              </span>
              <span className="text-neutral-400">▾</span>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border border-neutral-200 rounded-xl shadow-lg mt-1 z-20 py-1.5 overflow-hidden">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-3.5 py-2 hover:bg-neutral-50 text-neutral-800 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.city}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-3.5 py-2 hover:bg-neutral-50 text-orange-600 font-bold cursor-pointer border-t border-neutral-100"
                >
                  ＋ Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-2">
            Promo Code
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. CAPITHEMAT"
              className="flex-grow w-full text-xs outline-none px-3.5 py-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800"
            />
            <button className="bg-neutral-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-neutral-800 transition">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-black/[0.05] my-4" />

        <div className="space-y-3 text-xs">
          <div className="flex justify-between font-medium text-neutral-600">
            <p>Subtotal ({getCartCount()} items)</p>
            <p className="font-bold text-neutral-900">
              {currency}{getCartAmount()?.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="flex justify-between text-neutral-600">
            <p>Shipping</p>
            <p className="font-bold text-emerald-600">FREE</p>
          </div>
          <div className="flex justify-between text-neutral-600">
            <p>Estimated Tax (2%)</p>
            <p className="font-bold text-neutral-900">
              {currency}{Math.floor(getCartAmount() * 0.02)?.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="flex justify-between text-base font-extrabold border-t border-black/[0.05] pt-3 text-neutral-900">
            <p>Total</p>
            <p className="text-[#FF5A5F]">
              {currency}{(getCartAmount() + Math.floor(getCartAmount() * 0.02))?.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full mt-6 hover:bg-neutral-800 transition shadow-sm hover:shadow-md"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
