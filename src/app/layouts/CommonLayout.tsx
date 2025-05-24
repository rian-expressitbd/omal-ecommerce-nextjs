import React from "react";


export default function CommonLayout({ children }) {
  return (
    <>
      <div className='mx-auto w-[90%]'>{children}</div>
    </>
  );
}
