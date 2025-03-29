export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  subcategory?: string
  rating: number
  reviews: number
  isNew?: boolean
  isBestSeller?: boolean
  brand?: string
  features?: string[]
  specifications?: Record<string, string>
  stock?: number
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  password?: string
  address?: {
    street: string
    city: string
    state: string
    pincode: string
  }
}

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: "cod" | "card" | "upi"
  createdAt: string
  shippingAddress: {
    street: string
    city: string
    state: string
    pincode: string
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface CheckoutFormData {
  shippingAddress: {
    name: string
    phone: string
    street: string
    city: string
    state: string
    pincode: string
  }
  paymentMethod: "cod" | "card" | "upi"
  saveAddress: boolean
}

