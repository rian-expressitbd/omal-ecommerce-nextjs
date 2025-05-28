// types/warehouse.ts
interface Owner {
  _id: string;
  email: string;
  name: string;
}

export interface Warehouse {
  _id: string;
  owner: Owner | string;
  name: string;
  location: string;
  phone: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
