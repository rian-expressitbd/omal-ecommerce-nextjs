import { Brand } from './brand'
import { Business } from './business'
import { Category } from './category'
import { Supplier } from './supplier'
import { Warehouse } from './warehouse'
export interface Owner {
  _id: string
  name: string
  email?: string
}

export interface CreatedBy {
  _id: string
  email: string
  name: string
}

export interface Image {
  _id: string
  image: {
    public_id: string
    secure_url: string
    optimizeUrl: string
  }
}

export interface Video {
  _id: string
  video: {
    public_id: string
    secure_url: string
  }
}

export interface SizeGuard {
  _id: string
  name: string
}

export interface Variant {
  _id: string
  owner: string
  productId: string

  name: string
  image: Image
  barcode: string
  sku: string
  buying_price: string
  selling_price: string
  condition: string
  discount_type: string
  discount_percent: string
  discount_amount: string
  discount_start_date: string
  discount_end_date: string
  profit: string
  margin: string
  offer_price: string
  variants_stock: number
  variants_values: string[]
  total_sold: number
  isPublish: boolean
  isPreOrder: boolean
}

export interface Product {
  _id: string
  owner: Owner
  business: Business[]
  created_by: CreatedBy
  name: string
  short_description: string
  long_description: string
  tags: string[]
  images: Image[]
  video: Video[]
  brand: Brand
  sizeGuard: SizeGuard
  supplier: Supplier
  category_group: Category[]
  warehouse: Warehouse
  total_stock: number
  total_sold: number
  hasVariants: boolean
  variantsId: Variant[]
  currency: string
  isPublish: boolean
  // updated_by: any[];

  createdAt: string
  updatedAt: string
}
