import { MetaResponse } from "./metaResponse";

export interface Supplier {
  _id: string;
  name: string;
  company: string;
  phone?: string;
  location?: string;
  note?: string;
  image?: {
    public_id: string;
    optimizeUrl: string;
    secure_url: string;
  };
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SuppliersResponse {
  data: Supplier[];
  meta: MetaResponse;
}

export interface SupplierResponse {
  data: Supplier;
}
