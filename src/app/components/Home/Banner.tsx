"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import SliderImgOne from "../../assets/banner1.jpg";
import SliderImgTwo from "../../assets/banner2.jpg";
import CommonLayout from "@/app/layouts/CommonLayout";
import Button from "../UI/Button";

export default function Banner() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='mt-5'>
      <Slider {...settings}>
        <div className='w-full relative'>
          <CommonLayout>
            <div className='absolute top-1/2 transform -translate-y-1/2 w-1/3'>
              <h1 className='text-white text-7xl font-semibold'>
                Save Up To 40%
              </h1>
              <p className="text-sm text-white mt-3 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolorem quidem illo, fugiat quis quisquam suscipit laboriosam blanditiis praesentium reiciendis velit dignissimos voluptatum illum, itaque cumque dicta tempora! Fugit, unde placeat voluptatibus nobis, inventore dignissimos, suscipit sint repellat commodi sunt iste asperiores tenetur aperiam quis veniam! Magnam sapiente possimus soluta modi fugiat iste vel obcaecati molestias quisquam maiores culpa, aliquam quod! Reprehenderit vitae suscipit, amet laborum sint nulla esse dolor quas possimus itaque consequatur nisi dolorum quam tempora, est voluptas!</p>
              <div className='mt-8'>
                <Button className='bg-purple-700 text-white'>Shop Now</Button>
              </div>
            </div>
          </CommonLayout>

          <Image
            src={SliderImgOne}
            alt='slider_img_one'
            width={1080}
            height={720}
            className='h-[800px] w-full'
          />
        </div>

        <div className='w-full relative'>
          <div className='absolute top-1/2'>
            <h1 className='text-white text-7xl font-semibold'>
              Save Up To 40%
            </h1>
          </div>

          <Image
            src={SliderImgTwo}
            alt='slider_img_two'
            width={1080}
            height={720}
            className='h-[800px] w-full'
          />
        </div>
      </Slider>
    </div>
  );
}
