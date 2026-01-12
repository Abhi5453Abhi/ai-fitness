import { Utensils, Trophy, ShoppingBag } from 'lucide-react';

interface BottomNavProps {
    activeTab: 'meal' | 'challenge' | 'store';
    onTabChange: (tab: 'meal' | 'challenge' | 'store') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    return (
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 py-4 px-8 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
            <button
                onClick={() => onTabChange('meal')}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'meal' ? 'text-[#192126]' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <div className={`p-2 rounded-xl transition-all ${activeTab === 'meal' ? 'bg-[#BBF246] text-[#192126]' : 'bg-transparent'}`}>
                    <Utensils className="w-6 h-6" strokeWidth={activeTab === 'meal' ? 2.5 : 2} />
                </div>
                {activeTab === 'meal' && <span className="text-[10px] font-black uppercase tracking-wider">Meals</span>}
            </button>

            <button
                onClick={() => onTabChange('challenge')}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'challenge' ? 'text-[#192126]' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <div className={`p-2 rounded-xl transition-all ${activeTab === 'challenge' ? 'bg-[#BBF246] text-[#192126]' : 'bg-transparent'}`}>
                    <Trophy className="w-6 h-6" strokeWidth={activeTab === 'challenge' ? 2.5 : 2} />
                </div>
                {activeTab === 'challenge' && <span className="text-[10px] font-black uppercase tracking-wider">Challenge</span>}
            </button>

            <button
                onClick={() => onTabChange('store')}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'store' ? 'text-[#192126]' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <div className={`p-2 rounded-xl transition-all ${activeTab === 'store' ? 'bg-[#BBF246] text-[#192126]' : 'bg-transparent'}`}>
                    <ShoppingBag className="w-6 h-6" strokeWidth={activeTab === 'store' ? 2.5 : 2} />
                </div>
                {activeTab === 'store' && <span className="text-[10px] font-black uppercase tracking-wider">Store</span>}
            </button>
        </div>
    );
}
