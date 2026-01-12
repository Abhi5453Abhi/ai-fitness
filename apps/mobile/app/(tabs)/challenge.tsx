import React from 'react';
import { View, Text } from 'react-native';

export default function ChallengeScreen() {
    return (
        <View className="flex-1 bg-[#F9FAFB] items-center justify-center">
            <Text className="text-2xl font-bold text-[#192126]">Push-up Challenge</Text>
            <Text className="text-gray-500 mt-2">Camera will open here</Text>
        </View>
    );
}
