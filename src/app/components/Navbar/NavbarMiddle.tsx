"use client";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import { BsCartDash } from "react-icons/bs";
import CommonLayout from "@/app/layouts/CommonLayout";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

interface NavbarMiddleProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

export default function NavbarMiddle({
  isCartOpen,
  setIsCartOpen,
}: NavbarMiddleProps) {
  const [buisinessLogo, setBusinessLogo] = useState("");
  console.log("setIsCartOpen", setIsCartOpen); //outputs undefined
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  console.log(cartItems?.length);

  useEffect(() => {
    fetch(
      `https://backend.calquick.app/v2/api/public/6829ddabc20c6404b3e2a66b/6829ded2c20c6404b3e2a680/`
    )
      .then((res) => res.json())
      .then((data) => setBusinessLogo(data?.data[0]?.logo?.secure_url));
  }, []);

  return (
    <CommonLayout>
      <div className='grid grid-cols-3 mt-5'>
        <div className='w-1/3 place-self-center'></div>
        <div className='w-1/3 place-self-center'>
          <Image
            src={buisinessLogo || "/assets/logo1.jpg"}
            alt='business_logo'
            width={100}
            height={50}
          />
        </div>

        <div className='flex items-center gap-3 w-1/3 place-self-center'>
          <div className='relative'>
            <input
              className=' h-10 bg-gray-200 p-4 rounded-4xl'
              placeholder='Search'
              type='text'
            />
            <FaMagnifyingGlass
              size={20}
              className='absolute top-[10px] right-4'
            />
          </div>
          <div className='relative'>
            <div onClick={() => setIsCartOpen(true)} className='cursor-pointer'>
              <BsCartDash size={44} className='h-10 w-20' />
            </div>
            <sup className='text-white bg-red-700 p-3 rounded-full absolute top-0 right-0'>
              {cartItems?.length > 9 ? "9+" : cartItems?.length}
            </sup>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
