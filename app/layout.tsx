import type React from "react"
import "@livekit/components-styles"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`h-full w-full ${inter.className}`}>
      <body className="h-full w-full">{children}</body>
    </html>
  )
}