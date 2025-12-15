
import Link from "next/link";
import Image from "next/image";
import { ASSETS } from "../lib/constants";
import { Instagram, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 mb-12">

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Menu</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/" className="hover:text-brand-mint transition-colors">Home</Link></li>
                            <li><Link href="/customizer" className="hover:text-brand-mint transition-colors">Customize</Link></li>
                            <li><Link href="#products" className="hover:text-brand-mint transition-colors">All Products</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+62 851-8906-7996</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                        <div className="flex items-center gap-4">
                            <a href="https://www.instagram.com/ongoingprjct/" target="_blank" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-mint hover:text-white transition-all">
                                <Instagram size={20} />
                            </a>
                            {/* Add more as needed */}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Ongoing Project. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
