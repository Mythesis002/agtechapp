import type { User } from "./types"

// Mock users data
const users: User[] = [
  {
    id: "user1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    address: {
      street: "123 Farm Road",
      city: "Amritsar",
      state: "Punjab",
      pincode: "143001",
    },
    password: "password123", // In a real app, this would be hashed
  },
  {
    id: "user2",
    name: "Anita Patel",
    email: "anita.patel@example.com",
    phone: "+91 87654 32109",
    address: {
      street: "456 Market Street",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001",
    },
    password: "password123", // In a real app, this would be hashed
  },
]

// Mock authentication functions
export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email)
}

export function validatePassword(user: User, password: string): boolean {
  return user.password === password
}

// In a real app, you would use a proper authentication system
// This is just a simple mock for demonstration purposes
export function getCurrentUser(): User | null {
  // In a real app, this would check the session/token
  // For now, we'll just return the first user
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      return JSON.parse(storedUser)
    }
  }
  return null
}

export function setCurrentUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }
}

export function clearCurrentUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

