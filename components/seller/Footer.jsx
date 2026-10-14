import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 pt-6 border-t border-black/[0.04] text-[11px] text-neutral-400">
      <p>© {new Date().getFullYear()} capitstore Seller Hub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;