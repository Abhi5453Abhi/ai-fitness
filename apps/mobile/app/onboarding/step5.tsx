import React, { useState, useRef } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, Dimensions, TextInput, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;
const RULER_ITEM_WIDTH = 10;

// Reusable Ruler Component
import { UniversalRuler } from '@ai-fitness/shared';

export default function Step5Metrics() {
    const router = useRouter();
    const [height, setHeight] = useState<number>(170);
    const [weight, setWeight] = useState<number>(70);

    // Mock Translation
    const t: Record<string, string> = {
        step5_title: "Body Metrics",
        label_height: "HEIGHT",
        label_weight: "WEIGHT",
        unit_cm: "cm",
        unit_kg: "kg",
        next: "Next",
        skip: "Skip"
    };

    const handleNext = () => {
        // Navigate to Step 6
        router.push('/onboarding/step6');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-6">
                {/* Header */}
                <View className="flex-row items-center mb-6">
                    <Pressable onPress={() => router.back()} className="p-2 rounded-full active:bg-gray-100">
                        <ArrowLeft color="#192126" size={24} />
                    </Pressable>
                    <Text className="mx-auto text-lg font-bold text-[#192126]">5/10</Text>
                    <View className="w-10" />
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    ))}
                    <View className="h-1 flex-1 bg-gray-100 rounded-full" />
                </View>

                {/* Content */}
                <View className="flex-1 justify-center gap-8">
                    {/* Height Section */}
                    <View className="items-center">
                        <Text className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-2">{t.label_height}</Text>
                        <UniversalRuler min={100} max={250} value={height} setValue={setHeight} unit={t.unit_cm} />
                    </View>

                    {/* Weight Section */}
                    <View className="items-center">
                        <Text className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-2">{t.label_weight}</Text>
                        <UniversalRuler min={30} max={200} value={weight} setValue={setWeight} unit={t.unit_kg} />
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
