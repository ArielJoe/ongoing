
"use client";

import Link from "next/link";
import Image from "next/image";
import { ASSETS } from "../lib/constants";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-10 w-auto aspect-[3/1]">
                            {/* Note: Adjust width/height as needed based on actual logo dimension */}
                            <Image
                                src={ASSETS.logo}
                                alt="Ongoing Project"
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-brand-dark hidden sm:block">Ongoing Project</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-brand-mint font-medium transition-colors">Home</Link>
                        <Link href="/customizer" className="text-gray-600 hover:text-brand-mint font-medium transition-colors">Customize Keychain</Link>
                        <Link href="#products" className="text-gray-600 hover:text-brand-mint font-medium transition-colors">Products</Link>
                        <Link href="#contact" className="text-gray-600 hover:text-brand-mint font-medium transition-colors">Contact</Link>
                        <Link
                            href="/customizer"
                            className="px-6 py-2.5 bg-brand-mint text-white font-semibold rounded-full hover:bg-emerald-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Mulai Custom
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-brand-mint p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-mint hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/customizer"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-mint hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Customize Keychain
                        </Link>
                        <Link
                            href="#products"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-mint hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            href="#contact"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-mint hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                        <div className="pt-4">
                            <Link
                                href="/customizer"
                                className="block w-full text-center px-6 py-3 bg-brand-mint text-white font-semibold rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Mulai Custom
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
