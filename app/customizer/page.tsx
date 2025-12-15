
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ASSETS } from "../lib/constants";
import { Download, RefreshCw, MessageCircle, ZoomIn, ZoomOut, Check, ChevronLeft, ChevronRight } from "lucide-react";

// Types
type CharmSlot = 'A' | 'B' | 'C';
type SelectionState = {
    baseIndex: number;
    slots: {
        A: number | null; // Bottom
        B: number | null; // Middle
        C: number | null; // Top
    };
    zoom: number;
};

export default function CustomizerPage() {
    // State
    const [state, setState] = useState<SelectionState>({
        baseIndex: 0,
        slots: { A: null, B: null, C: null }, // Initialize with empty slots
        zoom: 1,
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Constants
    const CANVAS_SIZE = 800; // Internal resolution

    // Coordinates for Charms (Approximate based on vertical stacking assumption)
    // These are relative percentages (0.0 to 1.0) of the canvas size
    const CHARM_POSITIONS = {
        C: { x: 0.5, y: 0.35, scale: 0.15 }, // Top
        B: { x: 0.5, y: 0.5, scale: 0.15 },  // Middle
        A: { x: 0.5, y: 0.65, scale: 0.15 }, // Bottom
    };

    // Helper to load image
    const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    };

    // Draw Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = async () => {
            // Clear
            ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

            // Background (Optional: Gradient or Grid)
            // ctx.fillStyle = "#ffffff";
            // ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

            // Save context for Zoom
            ctx.save();
            ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
            ctx.scale(state.zoom, state.zoom);
            ctx.translate(-CANVAS_SIZE / 2, -CANVAS_SIZE / 2);

            try {
                // 1. Draw Base
                const basePath = ASSETS.keychains[state.baseIndex];
                const baseImg = await loadImage(basePath);

                // Draw base centered, preserving aspect ratio
                // Assume base images are roughly square or fit within a certain area
                const baseScale = 0.8;
                const bw = CANVAS_SIZE * baseScale;
                const bh = (bw / baseImg.width) * baseImg.height;
                const bx = (CANVAS_SIZE - bw) / 2;
                const by = (CANVAS_SIZE - bh) / 2;

                // Shadow for base
                ctx.shadowColor = "rgba(0,0,0,0.2)";
                ctx.shadowBlur = 20;
                ctx.shadowOffsetY = 10;
                ctx.drawImage(baseImg, bx, by, bw, bh);
                ctx.shadowColor = "transparent";

                // 2. Draw Charms (Order: A->B->C or C->B->A depending on layer? C is Top, so draw last?)
                // Let's draw Bottom (A) -> Middle (B) -> Top (C) to overlay correctly up the chain
                // Actually, physically on a keychain, the top one covers the string of the bottom one... 
                // tough to say without seeing the assets. I'll draw A then B then C.

                const drawCharm = async (slot: CharmSlot) => {
                    const charmIndex = state.slots[slot];
                    if (charmIndex === null) return;

                    const charmPath = ASSETS.animals[charmIndex];
                    const charmImg = await loadImage(charmPath);

                    const pos = CHARM_POSITIONS[slot];
                    const cw = CANVAS_SIZE * pos.scale;
                    const ch = (cw / charmImg.width) * charmImg.height;
                    const cx = (CANVAS_SIZE * pos.x) - (cw / 2);
                    const cy = (CANVAS_SIZE * pos.y) - (ch / 2);

                    // Slight shadow for depth between charms
                    ctx.shadowColor = "rgba(0,0,0,0.1)";
                    ctx.shadowBlur = 5;
                    ctx.drawImage(charmImg, cx, cy, cw, ch);
                    ctx.shadowColor = "transparent";
                };

                await drawCharm('A');
                await drawCharm('B');
                await drawCharm('C');

            } catch (err) {
                console.error("Failed to render canvas", err);
            }

            ctx.restore();
        };

        render();
    }, [state]);

    // Actions
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `ongoing-keychain-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
    };

    const handleWhatsApp = () => {
        // Construct message
        const baseName = `Base Model ${state.baseIndex + 1}`;
        const charmA = state.slots.A !== null ? `Charm ${state.slots.A + 1}` : "Empty";
        const charmB = state.slots.B !== null ? `Charm ${state.slots.B + 1}` : "Empty";
        const charmC = state.slots.C !== null ? `Charm ${state.slots.C + 1}` : "Empty";

        const text = `Halo Ongoing Project! Saya mau order custom keychain dengan detail:\n\n` +
            `🏷️ Base: ${baseName}\n` +
            `🐶 Slot A (Bawah): ${charmA}\n` +
            `🐱 Slot B (Tengah): ${charmB}\n` +
            `🐰 Slot C (Atas): ${charmC}\n\n` +
            `Mohon info total harganya ya! Terima kasih.`;

        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/6288218541267?text=${encodedText}`, '_blank');
    };

    const handleReset = () => {
        if (confirm("Reset desain ke awal?")) {
            setState({
                baseIndex: 0,
                slots: { A: null, B: null, C: null },
                zoom: 1
            });
        }
    };

    // Slot Controls Component
    const SlotControl = ({ label, slot }: { label: string, slot: CharmSlot }) => (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">{label}</span>
                {state.slots[slot] !== null && (
                    <button
                        onClick={() => setState(s => ({ ...s, slots: { ...s.slots, [slot]: null } }))}
                        className="text-xs text-red-500 hover:text-red-600"
                    >
                        Hapus
                    </button>
                )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {ASSETS.animals.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setState(s => ({ ...s, slots: { ...s.slots, [slot]: idx } }))}
                        className={`
                flex-shrink-0 w-16 h-16 rounded-xl border-2 overflow-hidden bg-white relative transition-all snap-start
                ${state.slots[slot] === idx ? 'border-brand-mint ring-2 ring-brand-mint/20' : 'border-gray-200 hover:border-brand-mint/50'}
            `}
                    >
                        <Image src={img} alt={`Charm ${idx}`} fill className="object-contain p-1" />
                        {state.slots[slot] === idx && (
                            <div className="absolute inset-0 bg-brand-mint/10 flex items-center justify-center">
                                <Check size={12} className="text-brand-mint bg-white rounded-full p-0.5" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto w-full h-full">
                <h1 className="sr-only">Studio Kustomisasi Keychain</h1>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

                    {/* LEFT COLUMN: BASE SELECTION */}
                    <div className="lg:col-span-3 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow-dark">1</span>
                                Pilih Base
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                {ASSETS.keychains.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setState(s => ({ ...s, baseIndex: idx }))}
                                        className={`
                                    relative aspect-square rounded-xl border-2 transition-all overflow-hidden bg-gray-50
                                    ${state.baseIndex === idx ? 'border-brand-mint ring-4 ring-brand-mint/10' : 'border-transparent hover:border-brand-mint/50'}
                                `}
                                    >
                                        <Image src={img} alt={`Base ${idx}`} fill className="object-contain p-2" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE COLUMN: PREVIEW */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="flex-grow bg-white rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-auto">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5" style={{
                                backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }} />

                            <canvas
                                ref={canvasRef}
                                width={CANVAS_SIZE}
                                height={CANVAS_SIZE}
                                className="w-full h-full max-w-[500px] max-h-[500px] object-contain drop-shadow-2xl"
                            />

                            {/* Zoom Controls */}
                            <div className="absolute bottom-6 right-6 flex gap-2">
                                <button
                                    onClick={() => setState(s => ({ ...s, zoom: Math.min(s.zoom + 0.1, 2) }))}
                                    className="bg-white p-2.5 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 text-gray-700"
                                >
                                    <ZoomIn size={20} />
                                </button>
                                <button
                                    onClick={() => setState(s => ({ ...s, zoom: Math.max(s.zoom - 0.1, 0.5) }))}
                                    className="bg-white p-2.5 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 text-gray-700"
                                >
                                    <ZoomOut size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-gray-400 text-sm">
                            Drag slots below to customize charms
                        </div>
                    </div>

                    {/* RIGHT COLUMN: CHARMS & ACTIONS */}
                    <div className="lg:col-span-4 lg:h-[calc(100vh-8rem)] flex flex-col gap-6 lg:overflow-y-auto custom-scrollbar">

                        {/* Charms Selector */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-grow">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink-dark">2</span>
                                Pilih Charms
                            </h2>

                            <SlotControl label="Slot C (Atas)" slot="C" />
                            <SlotControl label="Slot B (Tengah)" slot="B" />
                            <SlotControl label="Slot A (Bawah)" slot="A" />
                        </div>

                        {/* Actions Panel */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-brand-mint/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mint/10 rounded-fullblur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <h3 className="font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>
                            <div className="space-y-3 mb-6 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Base Model:</span>
                                    <span className="font-medium text-gray-900">Model {state.baseIndex + 1}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Charms:</span>
                                    <span className="font-medium text-gray-900">
                                        {[state.slots.A, state.slots.B, state.slots.C].filter(x => x !== null).length} items selected
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleWhatsApp}
                                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/20 transition-all hover:-translate-y-0.5"
                                >
                                    <MessageCircle size={20} />
                                    Order via WhatsApp
                                </button>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                                    >
                                        <Download size={18} />
                                        Preview
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 font-semibold py-3 rounded-xl transition-colors"
                                    >
                                        <RefreshCw size={18} />
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
