import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import { BsCartDash } from "react-icons/bs";
import CommonLayout from "@/app/layouts/CommonLayout";

export default async function NavbarMiddle() {
  const data = await fetch(`${process.env.APP_URL}`);
  const response = await data.json();
  const buisinesses = response.data;
  const businessLogo = buisinesses[0].logo.optimizeUrl;
  return (
    <CommonLayout>
      <div className='grid grid-cols-3 mt-5'>
        <div className='w-1/3 place-self-center'></div>
        <div className='w-1/3 place-self-center'>
          <Image
            src={businessLogo}
            alt='buisiness_logo'
            width={100}
            height={5}
          />
        </div>

        <div className='flex items-center gap-3 w-1/3 place-self-center'>
          <div className='relative'>
            <input
              className=' h-10 bg-gray-200 p-4 rounded-4xl'
              placeholder='Search'
              type='text'
              name=''
              id=''
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
