import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const GOAL_KEYS = [
    'goal_lose_weight',
    'goal_gain_muscle',
    'goal_get_fit',
    'goal_manage_stress',
    'goal_improve_sleep',
    'goal_increase_energy'
];

export default function Step2Goals() {
    const router = useRouter();
    const { name } = useLocalSearchParams<{ name: string }>();
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    // Mock Translation
    const t: Record<string, string> = {
        step2_title: "What are your main goals?",
        step2_subtitle: "Select up to 3 that are important to you.",
        next: "Next",
        skip: "Skip",
        goal_lose_weight: "Lose Weight",
        goal_gain_muscle: "Gain Muscle",
        goal_get_fit: "Get Fit",
        goal_manage_stress: "Manage Stress",
        goal_improve_sleep: "Improve Sleep",
        goal_increase_energy: "Increase Energy"
    };

    const toggleGoal = (goal: string) => {
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(prev => prev.filter(g => g !== goal));
        } else {
            if (selectedGoals.length < 3) {
                setSelectedGoals(prev => [...prev, goal]);
            }
        }
    };

    const handleNext = () => {
        // Navigate to step 3
        router.push({ pathname: '/onboarding/step3', params: { selectedGoals: selectedGoals } });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-6">
                {/* Header */}
                <View className="flex-row items-center mb-6">
                    <Pressable onPress={() => router.back()} className="p-2 rounded-full active:bg-gray-100">
                        <ArrowLeft color="#192126" size={24} />
                    </Pressable>
                    <Text className="mx-auto text-lg font-bold text-[#192126]">2/10</Text>
                    <View className="w-10" />
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-6">
                    <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    {[...Array(8)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                    ))}
                </View>

                {/* Content */}
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    <Text className="text-2xl font-black text-[#192126] mb-2">
                        Hey, {name || 'User'}. 👋{'\n'}{t.step2_title}
                    </Text>
                    <Text className="text-[#5E6468] font-medium mb-6 text-sm">{t.step2_subtitle}</Text>

                    <View className="gap-3 mb-6">
                        {GOAL_KEYS.map((goalKey) => {
                            const isSelected = selectedGoals.includes(goalKey);
                            return (
                                <Pressable
                                    key={goalKey}
                                    onPress={() => toggleGoal(goalKey)}
                                    className={`flex-row items-center justify-between p-5 rounded-3xl border-2 transition-all ${isSelected
                                        ? 'bg-[#192126] border-[#192126]'
                                        : 'bg-white border-gray-100 active:bg-gray-50'
                                        }`}
                                >
                                    <Text className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-[#192126]'}`}>
                                        {t[goalKey]}
                                    </Text>
                                    <View className={`w-6 h-6 rounded-full items-center justify-center ${isSelected ? 'bg-[#BBF246]' : 'bg-gray-100'}`}>
                                        {isSelected && <Check color="#192126" size={16} />}
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                </ScrollView>

                {/* Footer */}
                <View className="pt-4 border-t border-gray-100 flex-row gap-3">
                    <Pressable
                        onPress={() => router.push('/(tabs)/dashboard')}
                        className="flex-1 py-4 rounded-xl bg-gray-100 items-center justify-center active:bg-gray-200"
                    >
                        <Text className="font-bold text-[#192126]">{t.skip}</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleNext}
                        disabled={selectedGoals.length === 0}
                        className={`flex-[2] py-4 rounded-xl items-center justify-center flex-row gap-2 ${selectedGoals.length > 0 ? 'bg-[#192126]' : 'bg-gray-300'}`}
                    >
                        <Text className="font-bold text-white">{t.next}</Text>
                        {selectedGoals.length > 0 && <ArrowRight color="white" size={20} />}
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
