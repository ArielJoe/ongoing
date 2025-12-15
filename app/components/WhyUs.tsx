
import Image from "next/image";
import { ASSETS } from "../lib/constants";

export default function WhyUs() {
    const features = [
        {
            title: "Real-time Preview",
            desc: "Lihat hasil desainmu seketika. Geser, pilih, dan sesuaikan sesuka hati sebelum memesan.",
            icon: "🎨"
        },
        {
            title: "Premium Quality",
            desc: "Dibuat dengan bahan akrilik berkualitas tinggi dan print tajam yang tahan lama.",
            icon: "✨"
        },
        {
            title: "Unik & Personal",
            desc: "Kombinasi tak terbatas. Buat keychain yang benar-benar mewakili kepribadianmu.",
            icon: "🦄"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Ongoing Project?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Kami memberikan pengalaman kustomisasi terbaik dengan kualitas produk yang tidak main-main.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-4xl mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
