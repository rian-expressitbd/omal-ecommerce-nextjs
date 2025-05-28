"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/libs/store/store";
import { clearCart, toggleCart } from "@/app/libs/features/cartSlice";
import CommonLayout from "@/app/layouts/CommonLayout";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { Toaster, toast } from "react-hot-toast";
import { Order } from "@/types/cart";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cart";

export default function Checkout() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isCartOpen } = useSelector((state: RootState) => state.cart);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryArea: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const loadCartItems = () => {
      if (typeof window !== "undefined") {
        const items = localStorage.getItem("cartItems");
        if (items) {
          try {
            const parsedItems: CartItem[] = JSON.parse(items);
            setCartItems(parsedItems);
          } catch (error) {
            console.error("Failed to parse cart items:", error);
            setCartItems([]);
          }
        }
      }
    };
    loadCartItems();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.phone.match(/^\d{11}$/)) {
      toast.error("Phone number must be 11 digits");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return false;
    }
    if (!formData.deliveryArea) {
      toast.error("Delivery area is required");
      return false;
    }
    if (paymentMethod !== "cod" && !transactionId.trim()) {
      toast.error("Transaction ID is required for bKash/Nagad");
      return false;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call to place order
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      const orderPayload: Partial<Order> = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        delivery_area: formData.deliveryArea,
        products: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        due: totalDue.toString(),
        paymentMethod: paymentMethod,
        transactionId: paymentMethod !== "cod" ? transactionId : undefined,
      };
      console.log("Order placed:", orderPayload);

      // Clear cart and localStorage
      dispatch(clearCart());
      localStorage.removeItem("cartItems");

      toast.success("Order placed successfully!");
      setTimeout(() => router.push("/order-confirmation"), 2000); // Redirect to confirmation page
    } catch (error) {
      toast.error("Failed to place order");
      console.error("Order error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total due
  const totalDue: number = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar
        isCartOpen={isCartOpen}
        setIsCartOpen={(isOpen: boolean) => dispatch(toggleCart(isOpen))}
      />
      <CommonLayout>
        <Toaster position='top-center' />
        <div className=' mx-auto py-8 px-4 '>
          <h1 className='text-3xl font-bold text-gray-800 mb-6'>Checkout</h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Customer Details Form */}
            <div className='bg-white shadow-lg p-6 rounded-lg'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Shipping Information
              </h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-600'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400'
                    required
                    placeholder='Enter your full name...'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-600'
                  >
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400'
                    required
                    placeholder='Enter your phone number...'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-600'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400'
                    required
                    placeholder='Enter your address...'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='deliveryArea'
                    className='block text-sm font-medium text-gray-600'
                  >
                    Delivery Area
                  </label>
                  <select
                    id='deliveryArea'
                    name='deliveryArea'
                    value={formData.deliveryArea}
                    onChange={handleInputChange}
                    className='mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    required
                  >
                    <option value='' disabled>
                      Select delivery area
                    </option>
                    <option value='inside_dhaka'>Inside Dhaka</option>
                    <option value='outside_dhaka'>Outside Dhaka</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Order Summary and Payment Options */}
            <div className='bg-white shadow-lg p-6 rounded-lg'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Order Summary
              </h2>
              {cartItems.length === 0 ? (
                <p className='text-red-500 text-sm'>Your cart is empty</p>
              ) : (
                <div className='space-y-4'>
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.productId}-${item.variantId || index}`}
                      className='flex justify-between'
                    >
                      <div>
                        <p className='text-gray-700  break-words'>
                          {item.name || "Unknown Product"}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Quantity: {item.quantity}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Price per unit: BDT {item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className='text-gray-700'>
                        BDT {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <hr className='my-4 border-gray-200' />
                  <div className='flex justify-between font-semibold text-gray-800'>
                    <p>Total Due</p>
                    <p>BDT {totalDue.toLocaleString()}</p>
                  </div>
                </div>
              )}

              <h2 className='text-xl font-semibold text-gray-800 mt-6 mb-4'>
                Payment Method
              </h2>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='cod'
                    name='paymentMethod'
                    value='cod'
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className='h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300'
                  />
                  <label
                    htmlFor='cod'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Cash on Delivery
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='bkash'
                    name='paymentMethod'
                    value='bkash'
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                    className='h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300'
                  />
                  <label
                    htmlFor='bkash'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    bKash
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='nagad'
                    name='paymentMethod'
                    value='nagad'
                    checked={paymentMethod === "nagad"}
                    onChange={() => setPaymentMethod("nagad")}
                    className='h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300'
                  />
                  <label
                    htmlFor='nagad'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Nagad
                  </label>
                </div>
                {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                  <div className='mt-4'>
                    <label
                      htmlFor='transactionId'
                      className='block text-sm font-medium text-gray-600'
                    >
                      Transaction ID
                    </label>
                    <input
                      type='text'
                      id='transactionId'
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400'
                      placeholder='Enter transaction ID'
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || cartItems.length === 0}
                className={`mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                  isSubmitting || cartItems.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </CommonLayout>
      <Footer />
    </>
  );
}
