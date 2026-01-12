import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-[#F9FAFB] items-center justify-center">
      <Text className="text-2xl font-bold text-[#192126]">Dashboard</Text>
      <Text className="text-gray-500 mt-2">Welcome to your fitness journey!</Text>
    </View>
  );
}
