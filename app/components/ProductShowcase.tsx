
import Image from "next/image";
import { ASSETS } from "../lib/constants";
import Link from "next/link";

export default function ProductShowcase() {
    // Create mock combinations or use existing images that look like finished products
    const showcaseItems = [
        { name: "Padel Series", img: ASSETS.padelSeries[0], price: "Start from 45k" },
        { name: "Cute Animals", img: ASSETS.padelSeries[2], price: "Start from 35k" },
        { name: "Custom Mix", img: ASSETS.padelSeries[3], price: "Start from 50k" },
        { name: "Signature Set", img: ASSETS.padelSeries[4], price: "Start from 55k" },
    ];

    return (
        <section id="showcase" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Keychains</h2>
                        <p className="text-gray-600">Inspirasi untuk desainmu selanjutnya</p>
                    </div>
                    <Link href="/customizer" className="text-brand-mint font-semibold hover:text-emerald-600 hidden sm:block">
                        Buat Design Sendiri &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {showcaseItems.map((item, idx) => (
                        <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={item.img}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 group-hover:text-brand-mint transition-colors">{item.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link href="/customizer" className="text-brand-mint font-semibold hover:text-emerald-600">
                        Buat Design Sendiri &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
