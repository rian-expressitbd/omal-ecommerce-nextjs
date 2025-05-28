export interface Image {
  public_id: string
  secure_url: string
  optimizeUrl: string
}

export interface Owner {
  _id: string
  email: string
  name: string
}

export interface Category {
  _id: string
  name: string
  image?: Image
  children?: Array<{
    _id: string
    name: string
    children?: Array<{
      _id: string
      name: string
      children?: []
    }>
  }>
}

export interface InvoiceSettings {
  invoiceID:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
  invoiceName: string
  invoiceColor: string
  invoiceTextColor: string
  invoiceBackground: string
  invoiceHaddingColor?: string
  terms_and_conditions: string
  authorizedSign: string
}

export interface Business {
  _id: string
  owner: Owner
  email: string
  phone: string
  businessName: string
  tagline: string
  categories: Category[]
  employees: string[]
  website: string
  socialMedia: string
  insideDhaka: number
  outsideDhaka: number
  subDhaka: number
  currency: string[]
  location: string
  instantCourier?: boolean
  logo?: Image
  isActive?: boolean
  isDeleted?: boolean
  createdAt: string
  updatedAt?: string
  invoice?: InvoiceSettings
}
