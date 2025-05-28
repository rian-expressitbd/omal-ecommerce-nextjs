import CommonLayout from "@/app/layouts/CommonLayout";
import Link from "next/link";
import React from "react";

export default function NavbarLower() {
  return (
    <div className="hidden lg:block">
      <CommonLayout>
        <div className='mt-5'>
          <ul className="flex items-center gap-10 justify-center">
            <Link className="text-sm font-semibold" href="/">Home</Link>
            <Link className="text-sm font-semibold" href="#">Eid Collection 25 </Link>
            <Link className="text-sm font-semibold" href="#">Restocks</Link>
            <Link className="text-sm font-semibold" href="#">Best Sellers</Link>
            <Link className="text-sm font-semibold" href="#">Winter Collection 24</Link>
            <Link className="text-sm font-semibold" href="#">Festive Wear </Link>
            <Link className="text-sm font-semibold" href="#">Saree</Link>
            <Link className="text-sm font-semibold" href="#">Lawn</Link>
            <Link className="text-sm font-semibold" href="#">Velvet</Link>
            <Link className="text-sm font-semibold" href="#">Accessories</Link>
          </ul>
        </div>
      </CommonLayout>
    </div>
  );
}
