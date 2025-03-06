import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground w-full mx-auto">
      <div className="container px-4 md:px-6 pb-12 md:by-16 w-full mx-auto">
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/70 text-sm">
            &copy; {new Date().getFullYear()} Presenter AI. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-primary-foreground/70 hover:text-secondary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-secondary text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-secondary text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}