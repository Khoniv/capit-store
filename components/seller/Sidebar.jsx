import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

    return (
        <aside className='md:w-64 w-16 border-r min-h-[calc(100vh-65px)] bg-[#FAF8F5] border-black/[0.05] p-3 flex flex-col gap-1'>
            {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={
                                `flex items-center py-2.5 px-4 gap-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${isActive
                                    ? "bg-neutral-900 text-white shadow-xs"
                                    : "text-neutral-600 hover:bg-black/[0.04] hover:text-black"
                                }`
                            }
                        >
                            <span className="text-sm">
                                {item.name === 'Add Product' ? '＋' : item.name === 'Product List' ? '📋' : '📦'}
                            </span>
                            <p className='md:block hidden truncate'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </aside>
    );
};

export default SideBar;
