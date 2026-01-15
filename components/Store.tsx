import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

/*
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Apple AirPods",
        points: 500,
        image: "/images/airpods.png"
    },
    {
        id: 2,
        name: "Apple Watch Series 9",
        points: 5000,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=300&h=300"
    }
];
*/

export const Store = () => {
    return (
        <div className="h-full overflow-y-auto pb-24 p-6 flex flex-col">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black mb-2 text-[#192126]">Rewards Store</h1>
                <p className="text-gray-500 font-medium">Redeem your hard-earned points.</p>
            </div>

            {/* Coming Soon Placeholder */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div className="bg-[#BBF246]/20 rounded-full p-6 mb-6">
                    <Sparkles className="w-16 h-16 text-[#BBF246]" />
                </div>
                <h2 className="text-2xl font-black text-[#192126] mb-3">Under Construction 🚧</h2>
                <p className="text-gray-600 font-medium text-base max-w-xs mb-2">
                    We're getting some exciting items ready for you!
                </p>
                <p className="text-gray-500 text-sm max-w-xs">
                    Stay tuned — amazing rewards are on the way. Keep stacking those points!
                </p>
            </div>

            {/* Teaser */}
            <div className="mt-auto bg-[#BBF246]/10 rounded-3xl p-6 text-center border border-[#BBF246]/20">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <ShoppingBag className="w-4 h-4 text-[#BBF246]" />
                    <p className="text-[#192126] font-bold text-sm">Store Opening Soon!</p>
                </div>
                <p className="text-gray-500 text-xs">Keep pushing to stack up points while you wait.</p>
            </div>
        </div>
    );
};
