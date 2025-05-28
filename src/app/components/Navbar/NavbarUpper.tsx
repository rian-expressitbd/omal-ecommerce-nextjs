import Link from "next/link";
import React from "react";

export default function NavbarUpper() {
  return (
    <div className="relative overflow-hidden bg-purple-700 text-white w-[100vw]">
      <div className="py-3 animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-xs font-semibold mx-4 inline-block">
            Get Free Shipping on Orders Above 12,000 -
            <Link href="#" className="ml-1 font-semibold hover:underline">
              SHOP NOW
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}