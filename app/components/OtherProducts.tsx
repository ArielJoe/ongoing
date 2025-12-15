
"use client";

import Image from "next/image";
import { ASSETS } from "../lib/constants";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OtherProducts() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="products" className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Other Products</h2>
                    <div className="flex gap-2">
                        <button onClick={() => scroll('left')} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => scroll('right')} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {ASSETS.otherProducts.map((product, idx) => (
                        <div
                            key={idx}
                            className="min-w-[280px] md:min-w-[320px] snap-start bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-gray-50">
                                <Image
                                    src={product.src}
                                    alt={product.name}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900">{product.name}</h3>
                                <p className="text-sm text-gray-500">Official Merchandise</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
