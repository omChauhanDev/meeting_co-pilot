import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Meeting Co-pilot - Upload Once, Present Forever",
  description: "Let Co-pilot explain your documents and presentations to clients so you don't have to repeat yourself",
  keywords: "AI, presentations, documents, automation, explanation",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`w-full h-full mx-auto ${inter.className} antialiased`}>
        <Navbar />
        <main className="mx-auto">{children}</main>
        <Footer />
    </div>
  )
}

