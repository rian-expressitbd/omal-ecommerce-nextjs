import { Business } from './business';
import { MetaResponse } from './metaResponse';

export interface CategoryImage {
  public_id: string;
  secure_url: string;
  optimizeUrl: string;
}

export interface CategoryChild {
  _id: string;
  owner: string;
  name: string;
  parent?: Category | null;
  children: CategoryChild[] | [];
  businesses: Business[] | [];
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  owner: string;
  name: string;
  parent?: Category | null;
  children: CategoryChild[] | [];
  businesses: Business[];
  image?: CategoryImage;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  status: number;
  success: boolean;
  message: string;
  meta: MetaResponse;
  data: Category[];
}
