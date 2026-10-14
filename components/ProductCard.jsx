import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { motion } from "framer-motion";
const pastelColors = [
  "bg-[#E2F6EA]", // pastel green (matching 1st card in reference)
  "bg-[#F3EBF9]", // pastel lavender (matching 2nd card)
  "bg-[#FFE5D4]", // pastel peach (matching 3rd card)
  "bg-[#D9F4F6]", // pastel cyan (matching 4th card)
  "bg-[#FFF0D4]", // pastel cream yellow
];

const ProductCard = ({ product, index = 0 }) => {
  const { currency, router } = useAppContext();
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Determine soft pastel card background based on product index or name
  const bgClass = pastelColors[index % pastelColors.length];

  // Badges matching reference: NEW, HOT, -15%
  const badgeLabels = ["NEW", "HOT", "-20%", "SALE"];
  const badge = badgeLabels[index % badgeLabels.length];

  // Stagger delay based on column placement
  const delayMs = (index % 4) * 60;

  return (
    <div
      ref={cardRef}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
      onClick={() => {
        router.push("/product/" + product._id);
        if (typeof window !== "undefined") window.scrollTo(0, 0);
      }}
      className={`group flex flex-col cursor-pointer select-none scroll-reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      {/* Curved Pastel Container with squircle float & shadow */}
      <div
        className={`relative w-full aspect-square rounded-[1.6rem] sm:rounded-[2rem] ${bgClass} p-3.5 sm:p-5 flex items-center justify-center overflow-hidden squircle-card`}
      >
        {/* Top pill badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 transition-transform duration-300 group-hover:scale-105">
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-2 sm:px-2.5 py-0.5 rounded-full text-white bg-blue-500 tracking-wider shadow-xs">
            {badge}
          </span>
        </div>

        {/* Soft Radial Backlight Glow on hover */}
        <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.6rem] sm:rounded-[2rem] pointer-events-none" />

        {/* Product Image with smooth 3D tilt & scale */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={product.image[0]}
            alt={product.name}
            width={300}
            height={300}
            className="w-auto h-full max-h-[125px] sm:max-h-[170px] object-contain drop-shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* Info beneath the card matching reference typography */}
      <div className="pt-2.5 sm:pt-3 px-1 text-left">
        <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate tracking-tight group-hover:text-black">
          {product.name}
        </h3>

        {/* Pricing with strikethrough original price */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 mt-0.5">
          <span className="text-xs sm:text-sm font-extrabold text-[#FF5A5F]">
            {currency}{product.offerPrice?.toLocaleString("id-ID") || product.offerPrice}
          </span>
          {product.price > product.offerPrice && (
            <span className="text-[10px] sm:text-xs font-medium text-neutral-400 line-through">
              {currency}{product.price?.toLocaleString("id-ID") || product.price}
            </span>
          )}
        </div>

        {/* Mini color dot indicators matching reference footer */}
        <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2">
          <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-400 mr-0.5">Colors</span>
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-900 inline-block border border-white" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400 inline-block border border-white" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 inline-block border border-white" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard