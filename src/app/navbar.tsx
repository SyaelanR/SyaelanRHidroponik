"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";
import React, { useState } from 'react';
import { ButtonDekstop, MobileMenuTogle, ButtonMobile } from "./Components/navbar/button";
import { 
  Droplets 
} from 'lucide-react';

export default function Navbar() {
      const pathname = usePathname();
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    return(
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">DEWAPONIK</span>
            </div>

            {/* Desktop Navigation */}
            <ButtonDekstop pathname={pathname} />

            {/* Mobile Menu Toggle */}
            <MobileMenuTogle isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <ButtonMobile pathname={pathname} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </nav>
    )
}