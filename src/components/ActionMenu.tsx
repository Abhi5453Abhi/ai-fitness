import { motion, AnimatePresence } from 'framer-motion';
// Fixed import issue
import { Search, ScanBarcode, Mic, Camera, Droplet, Scale, Flame, X } from 'lucide-react';

interface ActionMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onLogFood: () => void;
}

export function ActionMenu({ isOpen, onClose, onLogFood }: ActionMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-[#0F141E] rounded-t-3xl p-6 z-50 border-t border-gray-800"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
                        </div>

                        {/* Grid Actions */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button
                                onClick={onLogFood}
                                className="bg-[#1A202C] p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-[#252D3D] transition-colors border border-gray-800"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Search className="w-6 h-6 text-blue-400" />
                                </div>
                                <span className="font-medium text-gray-200">Log Food</span>
                            </button>
                            <button className="bg-[#1A202C] p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-[#252D3D] transition-colors border border-gray-800">
                                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                                    <ScanBarcode className="w-6 h-6 text-pink-400" />
                                </div>
                                <span className="font-medium text-gray-200">Barcode Scan</span>
                            </button>
                            <button className="bg-[#1A202C] p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-[#252D3D] transition-colors border border-gray-800">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                    <Mic className="w-6 h-6 text-purple-400" />
                                </div>
                                <span className="font-medium text-gray-200">Voice Log</span>
                            </button>
                            <button className="bg-[#1A202C] p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-[#252D3D] transition-colors border border-gray-800">
                                <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-teal-400" />
                                </div>
                                <span className="font-medium text-gray-200">Meal Scan</span>
                            </button>
                        </div>

                        {/* List Actions */}
                        <div className="bg-[#1A202C] rounded-2xl border border-gray-800 overflow-hidden mb-8">
                            <button className="w-full flex items-center gap-4 p-4 hover:bg-[#252D3D] transition-colors border-b border-gray-800/50">
                                <Droplet className="w-5 h-5 text-blue-400 fill-blue-400" />
                                <span className="text-gray-200 font-medium">Water</span>
                            </button>
                            <button className="w-full flex items-center gap-4 p-4 hover:bg-[#252D3D] transition-colors border-b border-gray-800/50">
                                <Scale className="w-5 h-5 text-green-500 fill-green-500" />
                                <span className="text-gray-200 font-medium">Weight</span>
                            </button>
                            <button className="w-full flex items-center gap-4 p-4 hover:bg-[#252D3D] transition-colors">
                                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                                <span className="text-gray-200 font-medium">Exercise</span>
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button onClick={onClose} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-800 text-gray-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
