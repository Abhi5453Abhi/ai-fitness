import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;
const RULER_ITEM_WIDTH = 10;

// Reusing Ruler Component (Ideally move to /components/ui/Ruler.tsx)
import { UniversalRuler } from '@ai-fitness/shared';

export default function Step6Target() {
    const router = useRouter();
    const [targetWeight, setTargetWeight] = useState<number>(65);
    // In a real app, we'd pull currentWeight from global state or params
    const currentWeight = 70;

    // Mock Translation
    const t: Record<string, string> = {
        step6_title: "Set your goal.",
        step6_subtitle: "Slide to adjust.",
        unit_kg: "kg",
        next: "Next",
        skip: "Skip"
    };

    const calculateDate = () => {
        const diff = Math.abs(currentWeight - targetWeight);
        if (diff === 0) return new Date();
        const ratePerMonth = 2; // kg
        const monthsNeeded = diff / ratePerMonth;
        const date = new Date();
        date.setMonth(date.getMonth() + Math.ceil(monthsNeeded));
        return date;
    };

    const goalDate = calculateDate();
    const monthName = goalDate.toLocaleString('default', { month: 'long' });

    const handleNext = () => {
        router.push('/onboarding/step7-weekly-goal' as any);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-6">
                {/* Header */}
                <View className="flex-row items-center mb-6">
                    <Pressable onPress={() => router.back()} className="p-2 rounded-full active:bg-gray-100">
                        <ArrowLeft color="#192126" size={24} />
                    </Pressable>
                    <Text className="mx-auto text-lg font-bold text-[#192126]">Target</Text>
                    <View className="w-10" />
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-8">
                    {[...Array(6)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    ))}
                    {[...Array(4)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                    ))}
                </View>

                {/* Content */}
                <View className="flex-1 justify-center items-center">
                    <Text className="text-2xl font-black text-[#192126] mb-2 text-center">{t.step6_title}</Text>
                    <Text className="text-[#5E6468] mb-12 text-center font-medium">{t.step6_subtitle}</Text>

                    <UniversalRuler min={40} max={150} value={targetWeight} setValue={setTargetWeight} unit={t.unit_kg} />

                    {/* Date Estimator */}
                    <View className="mt-12 px-6 py-3 rounded-full bg-white border-2 border-gray-100 flex-row items-center gap-3 shadow-sm">
                        <Calendar color="#BBF246" size={16} />
                        <Text className="text-sm font-bold text-[#192126]">
                            {currentWeight === targetWeight
                                ? "Maintaing current weight."
                                : `Target date: ${monthName}`
                            }
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                <View className="pt-6 border-t border-gray-100 flex-row gap-3">
                    <Pressable
                        onPress={handleNext} // Skip
                        className="flex-1 py-4 rounded-xl bg-gray-100 items-center justify-center active:bg-gray-200"
                    >
                        <Text className="font-bold text-[#192126]">{t.skip}</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleNext}
                        className="flex-[2] py-4 rounded-xl items-center justify-center flex-row gap-2 bg-[#192126]"
                    >
                        <Text className="font-bold text-white">{t.next}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
