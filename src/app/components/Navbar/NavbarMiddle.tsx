"use client";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import { BsCartDash } from "react-icons/bs";
import CommonLayout from "@/app/layouts/CommonLayout";
import logo from "@/app/assets/logo1.jpg";

export default function NavbarMiddle() {
  const [buisinessLogo, setBusinessLogo] = useState("");
  useEffect(() => {
    fetch(
      `https://backend.calquick.app/v2/api/public/67e1167340fa1b061c4b5389/6800959381b0b41ac48282a1`
    )
      .then((res) => res.json())
      .then((data) => console.log(data?.data[0].logo.optimizeUrl));
  });

  return (
    <CommonLayout>
      <div className='grid grid-cols-3 mt-5'>
        <div className='w-1/3 place-self-center'></div>
        <div className='w-1/3 place-self-center'>
          <Image
            src={buisinessLogo || logo}
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
          <div>
            <BsCartDash size={44} className='h-10 w-20' />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
