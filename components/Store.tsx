import React from 'react';
import { ShoppingBag, Lock } from 'lucide-react';

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

export const Store = () => {
    return (
        <div className="h-full overflow-y-auto pb-24 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black mb-2 text-[#192126]">Rewards Store</h1>
                <p className="text-gray-500 font-medium">Redeem your hard-earned points.</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4">
                {MOCK_PRODUCTS.map(product => (
                    <div key={product.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">

                        {/* Coming Soon Overlay */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Lock className="w-8 h-8 mb-2 text-[#BBF246]" />
                            <span className="font-bold text-sm tracking-wider uppercase">Coming Soon</span>
                        </div>

                        {/* Image */}
                        <div className="aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-50">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Details */}
                        <div className="mt-auto">
                            <h3 className="font-bold text-[#192126] text-sm leading-tight mb-1">{product.name}</h3>
                            <div className="flex items-center gap-1 text-[#BBF246] font-black text-xs">
                                <ShoppingBag className="w-3 h-3" />
                                {product.points} PTS
                            </div>
                        </div>

                        {/* Badge for mobile visibility if hover isn't clear */}
                        <div className="absolute top-3 right-3 bg-[#192126] text-white text-[10px] font-bold px-2 py-1 rounded-full z-0 group-hover:opacity-0 transition-opacity">
                            COMING SOON
                        </div>
                    </div>
                ))}
            </div>

            {/* Teaser */}
            <div className="mt-8 bg-[#BBF246]/10 rounded-3xl p-6 text-center border border-[#BBF246]/20">
                <p className="text-[#192126] font-bold text-sm">More rewards unlocking soon!</p>
                <p className="text-gray-500 text-xs mt-1">Keep pushing to stack up points.</p>
            </div>
        </div>
    );
};
