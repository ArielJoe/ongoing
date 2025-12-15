
import Link from "next/link";
import Image from "next/image";
import { ASSETS } from "../lib/constants";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-mint/20 rounded-full blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left space-y-6">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-100 text-brand-mint font-semibold text-sm shadow-sm">
                            ✨ New Collection Available
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-brand-dark leading-tight tracking-tight">
                            Design Your Own <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mint to-brand-yellow">
                                Unique Keychain
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Expresikan gayamu! Pilih base, tambahkan hingga 3 charm hewan lucu, dan lihat hasilnya secara langsung. Pesan custom keychain-mu sekarang.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link
                                href="/customizer"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-mint rounded-full shadow-lg hover:bg-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                Mulai Custom Sekarang
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#products"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-brand-dark transition-all duration-300"
                            >
                                Lihat Katalog
                            </Link>
                        </div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-80">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                                        <Image src={ASSETS.animals[i]} alt="User" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                <strong className="text-gray-900">500+</strong> Happy Customers
                            </div>
                        </div>
                    </div>

                    {/* Image Showcase */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none transform hover:scale-[1.02] transition-transform duration-500">
                            {/* Main Hero Image - Using a Padel image for impact */}
                            <Image
                                src={ASSETS.padelSeries[1]} // Using one of the nice Padel images
                                alt="Custom Keychain Collection"
                                fill
                                className="object-cover rounded-3xl shadow-2xl"
                                priority
                            />

                            {/* Floating Elements */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white p-2 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <div className="relative w-full h-full bg-brand-yellow/10 rounded-xl overflow-hidden">
                                    <Image src={ASSETS.animals[0]} alt="Charm" fill className="object-contain p-2" />
                                </div>
                            </div>

                            <div className="absolute -top-6 -right-6 w-28 h-28 bg-white p-2 rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                <div className="relative w-full h-full bg-brand-mint/10 rounded-xl overflow-hidden">
                                    <Image src={ASSETS.keychains[0]} alt="Base" fill className="object-contain p-2" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
