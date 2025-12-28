import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, ScanBarcode, Mic, Camera, Plus, ChevronDown, CheckCircle2, Zap } from 'lucide-react';

interface LogFoodProps {
    isOpen: boolean;
    onClose: () => void;
}

const SUGGESTIONS = [
    { name: "Roti", cal: 120, detail: "1 medium", verified: true },
    { name: "Chapati", cal: 120, detail: "50 gram, Homemade", verified: true },
    { name: "Sugar", cal: 16, detail: "1 teaspoon", verified: true },
    { name: "Ghee", cal: 40, detail: "1 teaspoon", verified: true },
    { name: "Almonds", cal: 164, detail: "1 ounce", verified: true },
    { name: "Curd (Dahi) 200gm", cal: 122, detail: "200 gms, Curd", verified: false },
    { name: "Egg white", cal: 17, detail: "1 large", verified: true },
];

export function LogFood({ isOpen, onClose }: LogFoodProps) {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#090E17] z-50 flex flex-col"
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
                <button onClick={onClose} className="p-2 -ml-2 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
                <button className="flex items-center gap-1 font-semibold text-blue-500">
                    Select a Meal <ChevronDown className="w-4 h-4" />
                </button>
                <div className="w-8"></div> {/* Spacer for alignment */}
            </div>

            {/* Search Bar */}
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Food"
                        className="w-full bg-[#111827] text-white pl-12 pr-10 py-4 rounded-xl border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-base shadow-lg"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="px-4 flex gap-6 border-b border-gray-800 text-sm font-medium overflow-x-auto no-scrollbar">
                {['All', 'My Meals', 'My Recipes', 'My Foods'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 whitespace-nowrap transition-colors ${activeTab === tab
                                ? 'text-white border-b-2 border-white'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="p-4 grid grid-cols-4 gap-3">
                <button className="bg-[#111827] p-3 rounded-2xl border border-gray-800 flex flex-col items-center justify-center gap-2 hover:bg-[#1F2937] transition-colors aspect-square">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <ScanBarcode className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-[10px] text-blue-400 font-medium text-center leading-tight">Barcode scan</span>
                </button>
                <button className="bg-[#111827] p-3 rounded-2xl border border-gray-800 flex flex-col items-center justify-center gap-2 hover:bg-[#1F2937] transition-colors aspect-square">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Mic className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-[10px] text-blue-400 font-medium text-center leading-tight">Voice log</span>
                </button>
                <button className="bg-[#111827] p-3 rounded-2xl border border-gray-800 flex flex-col items-center justify-center gap-2 hover:bg-[#1F2937] transition-colors aspect-square">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Camera className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-[10px] text-blue-400 font-medium text-center leading-tight">Meal scan</span>
                </button>
                <button className="bg-[#111827] p-3 rounded-2xl border border-gray-800 flex flex-col items-center justify-center gap-2 hover:bg-[#1F2937] transition-colors aspect-square">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-[10px] text-blue-400 font-medium text-center leading-tight">Quick add</span>
                </button>
            </div>

            {/* Suggestions */}
            <div className="flex-1 overflow-y-auto px-4 pb-20">
                <h3 className="text-lg font-bold mb-4">Suggestions</h3>
                <div className="space-y-3">
                    {SUGGESTIONS.map((item, index) => (
                        <div key={index} className="bg-[#111827] p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-200">{item.name}</span>
                                    {item.verified && <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500/10" />}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {item.cal} cal, {item.detail}
                                </div>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-colors">
                                <Plus className="w-6 h-6" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
