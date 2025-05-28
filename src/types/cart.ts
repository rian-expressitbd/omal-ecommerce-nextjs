// src/app/types/cart.ts
export interface CartItem {
  productId: string;
  variantId?: string | null;
  quantity: number;
}

export interface Product {
  _id: string;
  name: string;
  short_description: string;
  images: { image: { optimizeUrl: string } }[];
  video?: { secure_url: string };
  variantsId: {
    _id: string;
    name?: string;
    variants_values: string[];
    selling_price: number;
    offer_price: number;
    image?: { image: { secure_url: string } };
  }[];
  hasVariants: boolean;
  sub_category?: { _id: string }[];
  tags?: string[];
}

export interface Order {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  delivery_area: string;
  paymentMethod: string;
  transactionId: string;
  products: { productId: string; quantity: number }[];
  due: string;
}