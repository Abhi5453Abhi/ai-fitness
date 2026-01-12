import React from 'react';
import { View, Text } from 'react-native';

export default function StoreScreen() {
    return (
        <View className="flex-1 bg-[#F9FAFB] items-center justify-center">
            <Text className="text-2xl font-bold text-[#192126]">Store</Text>
            <Text className="text-gray-500 mt-2">Spend your FitCoins here</Text>
        </View>
    );
}
