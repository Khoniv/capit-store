import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderSlider = () => {
  const router = useRouter();

  const sliderData = [
    {
      id: 1,
      tag: "Summer Collection",
      title: "Are you ready to\nlead the way",
      subtitle: "Comfort meets aesthetic Indonesian crafted sandals",
      buttonText: "Discover",
      bgClass: "from-[#FFE7BE] to-[#FEDAA2]",
      badgeColor: "bg-orange-500",
      imgSrc: "/database/Crocs.png",
      link: "/all-products",
      colorVariants: [
        { name: "Yellow", bg: "bg-amber-400" },
        { name: "Pink", bg: "bg-rose-300" },
        { name: "Blue", bg: "bg-sky-400" },
      ],
    },
    {
      id: 2,
      tag: "Outdoor Series",
      title: "Step freely on\nevery adventure",
      subtitle: "Ergonomic mountain sandals with grip traction",
      buttonText: "Explore Now",
      bgClass: "from-[#D5F2E3] to-[#BCECD3]",
      badgeColor: "bg-emerald-600",
      imgSrc: "/database/Sandal%20Gunung/Gunung%201.png",
      link: "/all-products",
      colorVariants: [
        { name: "Olive", bg: "bg-emerald-700" },
        { name: "Charcoal", bg: "bg-neutral-800" },
        { name: "Sand", bg: "bg-amber-200" },
      ],
    },
    {
      id: 3,
      tag: "Casual Everyday",
      title: "Pure comfort for\nyour daily stroll",
      subtitle: "Ultra-soft EVA memory foam classic flip flops",
      buttonText: "Shop Series",
      bgClass: "from-[#E6E6FA] to-[#D8D8F6]",
      badgeColor: "bg-purple-600",
      imgSrc: "/database/Sandal%20jepit/blue_flop_shoes_image.png",
      link: "/all-products",
      colorVariants: [
        { name: "Blue", bg: "bg-blue-400" },
        { name: "Pink", bg: "bg-pink-300" },
        { name: "White", bg: "bg-stone-100" },
      ],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);

  // Auto-slide berganti setiap 4 detik (pause saat kursor diarahkan ke banner)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, sliderData.length]);

  const active = sliderData[currentSlide];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full my-4 md:my-6"
    >
      {/* Outer wrapper with subtle preview cards on sides */}
      <div className="relative flex items-center justify-center">
        
        {/* Previous arrow button (pill circle matching reference) */}
        <button
          onClick={prevSlide}
          className="absolute -left-3 sm:left-2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-neutral-700 hover:text-black border border-black/[0.06] transition -translate-y-1/2 top-1/2"
          aria-label="Previous"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Main Curved Banner Card */}
        <div
          className={`relative w-full rounded-[1.8rem] sm:rounded-[2.4rem] md:rounded-[3rem] bg-gradient-to-br ${active.bgClass} px-5 sm:px-10 md:px-16 py-7 sm:py-10 md:py-14 overflow-hidden transition-all duration-700 shadow-sm`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10">
            {/* Left Column: Text & CTA */}
            <div className="max-w-md text-left w-full">
              <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-700 bg-white/70 backdrop-blur-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3">
                {active.tag}
              </span>
              
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15] whitespace-pre-line font-sans">
                {active.title}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-700 font-medium mt-2 sm:mt-3 max-w-sm">
                {active.subtitle}
              </p>

              {/* Discover Pill Button */}
              <div className="mt-4 sm:mt-6 flex items-center gap-4">
                <button
                  onClick={() => router.push(active.link)}
                  className="flex items-center gap-2 px-5 py-2 sm:px-7 sm:py-3 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold tracking-wide transition shadow-md hover:shadow-xl group"
                >
                  <span>{active.buttonText}</span>
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>

              {/* Color variant dots matching reference */}
              <div className="flex items-center gap-1.5 sm:gap-2 mt-5 sm:mt-8">
                {active.colorVariants.map((item, idx) => (
                  <div
                    key={idx}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg ${item.bg} border-2 border-white shadow-xs cursor-pointer hover:scale-110 transition`}
                    title={item.name}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Hero Sandal Product Image */}
            <div className="relative flex items-center justify-center w-full md:w-1/2 aspect-4/3 md:aspect-square max-h-[220px] sm:max-h-[280px] md:max-h-[360px]">
              {/* Soft decorative backdrop glow */}
              <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-white/40 blur-2xl animate-pulse" />
              
              <Image
                src={active.imgSrc}
                alt={active.title}
                width={500}
                height={500}
                priority
                className="relative z-10 w-auto h-full max-h-[290px] md:max-h-[330px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.18)] hero-float transition-all duration-700"
              />
            </div>
          </div>

          {/* Slider Pagination Indicators (Bottom center pill bars) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {sliderData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentSlide === idx ? "w-6 bg-neutral-900" : "w-1.5 bg-neutral-400/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Next arrow button (pill circle matching reference) */}
        <button
          onClick={nextSlide}
          className="absolute -right-3 sm:right-2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-neutral-700 hover:text-black border border-black/[0.06] transition -translate-y-1/2 top-1/2"
          aria-label="Next"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeaderSlider;
