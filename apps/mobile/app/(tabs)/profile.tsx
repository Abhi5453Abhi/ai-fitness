import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
    return (
        <View className="flex-1 bg-[#F9FAFB] items-center justify-center">
            <Text className="text-2xl font-bold text-[#192126]">Profile</Text>
            <Text className="text-gray-500 mt-2">User settings</Text>
        </View>
    );
}
