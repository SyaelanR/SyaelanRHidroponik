"use client";
import Link from "next/link"
import React from 'react';
import { 
  Menu,
  X,
  LayoutDashboard,
  Database
} from 'lucide-react';

interface MobileMenuControlProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PathnameProp {
  pathname: string;
}

export function ButtonDekstop ({ pathname }: PathnameProp) {
    return(
        <div className="hidden md:flex items-center space-x-1">
            <Link 
            href="/Dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname === '/Dashboard' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
            >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
            </Link>
            <Link 
            href="/Data-Record"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname === '/Data-Record' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
            >
            <Database className="w-4 h-4" />
            Data Record
            </Link>
        </div>
    )
}

export const ButtonMobile = ({ pathname, isMobileMenuOpen, setIsMobileMenuOpen }: PathnameProp & MobileMenuControlProps) => {
    return(
        <>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2">
            <Link 
              href="/Dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium ${
                pathname === '/Dashboard' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link 
              href="/Data-Record"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium ${
                pathname === '/Data-Record' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Database className="w-5 h-5" />
              Data Record
            </Link>
          </div>
        )}
        </>
    )
}

export const MobileMenuTogle = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileMenuControlProps) => {
    return (
        <div className="md:hidden flex items-center">
            <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-50"
            >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
    )
}
