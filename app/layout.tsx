import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Design Prototype - Not Final Version",
  description: "E-commerce platform for agricultural products",
  icons: {
    icon: "https://media.licdn.com/dms/image/v2/D4D0BAQFProEfi6-Xog/img-crop_100/img-crop_100/0/1736174685350?e=1748476800&v=beta&t=JIiYBdHQwQCjPPS8tw8sZy1b5UCVrYlqAxiEFqS4RX4",
  },
    generator: 'adarshsin9hh'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'