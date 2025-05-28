export interface Brand {
  _id: string;
  name: string;
  description: string;
  image?: {
    public_id: string;
    optimizeUrl: string;
    secure_url: string;
  };
  website?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
