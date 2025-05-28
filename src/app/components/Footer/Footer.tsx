import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=' text-white '>
      <div className='py-6 px-4 bg-gray-800'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 container mx-auto'>
          {/* Contact Us */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>CONTACT US</h3>
            <p>Email: marketing.onal@gmail.com</p>
            <p>Call: 0315 2006837</p>
          </div>

          {/* Information */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>INFORMATION</h3>
            <p>About Us</p>
            <p>FAQs</p>
            <p>Contact Us</p>
            <p>Careers</p>
            <p>Customer Support</p>
          </div>

          {/* Policies */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>POLICIES</h3>
            <p>Shipping Policy</p>
            <p>Refund & Exchange Policy</p>
            <p>Privacy Policy</p>
            <p>Terms And Service</p>
          </div>

          {/* Newsletter Sign Up */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>NEWSLETTER SIGN UP</h3>
            <div className='flex flex-col sm:flex-row gap-2'>
              <input
                type='email'
                placeholder='enter your email address'
                className='p-2 rounded border border-gray-600 bg-gray-700 text-white w-full sm:w-auto'
              />
              <button className='bg-purple-700 text-white p-2 rounded hover:bg-purple-600 transition-colors w-full sm:w-auto'>
                SUBMIT
              </button>
            </div>
            <div className='flex justify-center space-x-4 mt-4'>
              <a href='#' className='text-gray-400 hover:text-white'>
                <span className='sr-only'>Facebook</span>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' />
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <span className='sr-only'>Instagram</span>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.32 3.608 1.295.975.975 1.233 2.242 1.295 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.32 2.633-1.295 3.608-.975.975-2.242 1.233-3.608 1.295-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.32-3.608-1.295-.975-.975-1.233-2.242-1.295-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.32-2.633 1.295-3.608.975-.975 2.242-1.233 3.608-1.295 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.314 0-3.737.015-5.04.08-1.297.063-2.183.283-2.95.596-.832.342-1.54.804-2.246 1.51-.706.706-1.168 1.414-1.51 2.246-.313.767-.533 1.653-.596 2.95-.065 1.303-.08 1.726-.08 5.04s.015 3.737.08 5.04c.063 1.297.283 2.183.596 2.95.342.832.804 1.54 1.51 2.246.706.706 1.414 1.168 2.246 1.51.767.313 1.653.533 2.95.596 1.303.065 1.726.08 5.04.08s3.737-.015 5.04-.08c1.297-.063 2.183-.283 2.95-.596.832-.342 1.54-.804 2.246-1.51.706-.706 1.168-1.414 1.51-2.246.313-.767.533-1.653.596-2.95.065-1.303.08-1.726.08-5.04s-.015-3.737-.08-5.04c-.063-1.297-.283-2.183-.596-2.95-.342-.832-.804-1.54-1.51-2.246-.706-.706-1.414-1.168-2.246-1.51-.767-.313-1.653-.533-2.95-.596-1.303-.065-1.726-.08-5.04-.08Z' />
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <span className='sr-only'>TikTok</span>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M19.589 6.686a4.993 4.993 0 0 0-3.67-3.551 4.907 4.907 0 0 0-5.696 1.145c-.006.006-1.049 1.049-2.862 2.862a4.904 4.904 0 0 0-1.146 5.694 4.995 4.995 0 0 0 3.552 3.671v-3.96a4.966 4.966 0 0 0-.2-1.255c.378-.135.725-.325 1.031-.567.245-.193.47-.405.676-.637a1.798 1.798 0 0 1 2.561-.051 1.787 1.787 0 0 1 .536 1.275v5.739c1.888-.468 3.38-1.962 3.847-3.85a4.925 4.925 0 0 0-1.629-5.586z' />
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <span className='sr-only'>YouTube</span>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright and Payment Methods */}
      <div className='flex flex-col md:flex-row justify-between items-center py-6 border-t border-gray-700 pt-4 bg-purple-950 '>
        <div className='mx-auto container flex justify-between items-center'>
          <p className='text-sm text-white'>© 2024. All Rights Reserved.</p>
          <div className='flex space-x-4 mt-4 md:mt-0 text-white' >
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png'
              alt='Visa'
              className='h-8'
            />
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg'
              alt='MasterCard'
              className='h-8'
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
