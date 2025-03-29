"use client"

import { Separator } from "@/components/ui/separator"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Menu,
  Search,
  User,
  Heart,
  Sun,
  Moon,
  LogOut,
  Settings,
  Package,
  ShoppingBag,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useCartStore } from "@/lib/store"
import { getCurrentUser, clearCurrentUser } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { User as UserType } from "@/lib/types"
import { useClickAway } from "react-use"
import { products } from "@/lib/data"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()
  const router = useRouter()
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [mounted, setMounted] = useState(false)
  const { items, totalItems } = useCartStore()
  const cartItemCount = mounted ? totalItems() : 0

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Fix hydration issues and load user data
  useEffect(() => {
    setMounted(true)
    const user = getCurrentUser()
    setCurrentUser(user)
  }, [])

  useClickAway(searchRef, () => {
    setShowResults(false)
  })

  const handleLogout = () => {
    clearCurrentUser()
    setCurrentUser(null)
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (query.trim().length > 1) {
      const filtered = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5) // Limit to 5 results
      setSearchResults(filtered)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, handleSearch])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Deals", href: "/deals" },
    { name: "Support", href: "/support" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-primary">AgTech</span> <span className="text-foreground">Solutions</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative w-full max-w-sm mx-4" ref={searchRef}>
            <Input
              type="search"
              placeholder="Search for seeds, fertilizers..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
            <Button variant="ghost" className="absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
            </Button>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-[400px] overflow-auto">
                <div className="p-2">
                  <h3 className="text-sm font-medium mb-2">Products</h3>
                  <ul className="space-y-2">
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/products/${product.id}`}
                          className="flex items-center gap-3 p-2 hover:bg-muted rounded-md transition-colors"
                          onClick={() => {
                            setShowResults(false)
                            setSearchQuery("")
                          }}
                        >
                          <div className="h-10 w-10 bg-muted rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="object-cover h-full w-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                          </div>
                          <div className="text-sm font-medium">₹{product.price}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search Toggle - Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* User Account */}
            {mounted &&
              (currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{currentUser.name}</span>
                        <span className="text-xs text-muted-foreground">{currentUser.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/orders">
                        <Package className="h-4 w-4 mr-2" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/auth/login">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              ))}

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  {currentUser ? (
                    <>
                      <Link href="/profile" className="text-lg font-medium transition-colors hover:text-primary">
                        My Account
                      </Link>
                      <Link href="/profile/orders" className="text-lg font-medium transition-colors hover:text-primary">
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-lg font-medium transition-colors hover:text-primary text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/auth/login" className="text-lg font-medium transition-colors hover:text-primary">
                      Login / Sign Up
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div
        className={cn("md:hidden overflow-hidden transition-all duration-300", isSearchOpen ? "h-14 py-2" : "h-0 py-0")}
      >
        <div className="container">
          <div className="relative" ref={isMobile ? searchRef : undefined}>
            <Input
              type="search"
              placeholder="Search for seeds, fertilizers..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
            <Button variant="ghost" className="absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
            </Button>

            {/* Mobile Search Results Dropdown */}
            {showResults && searchResults.length > 0 && isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-[400px] overflow-auto">
                <div className="p-2">
                  <h3 className="text-sm font-medium mb-2">Products</h3>
                  <ul className="space-y-2">
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/products/${product.id}`}
                          className="flex items-center gap-3 p-2 hover:bg-muted rounded-md transition-colors"
                          onClick={() => {
                            setShowResults(false)
                            setSearchQuery("")
                            setIsSearchOpen(false)
                          }}
                        >
                          <div className="h-10 w-10 bg-muted rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="object-cover h-full w-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                          </div>
                          <div className="text-sm font-medium">₹{product.price}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

