import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, XCircle, Coffee, Moon, Flame, Zap } from 'lucide-react-native';
import { UniversalSelectionCard } from '@ai-fitness/shared';
import { useLanguage } from '@/hooks/use-language';

export default function Step8Barriers() {
    const router = useRouter();
    const { t } = useLanguage();
    const [selectedBarriers, setSelectedBarriers] = useState<string[]>([]);

    const barriers = [
        { key: 'barrier_snacking', icon: Moon },
        { key: 'barrier_sugar', icon: Coffee },
        { key: 'barrier_stress', icon: Zap }, // Fallback for WebAnimation
        { key: 'barrier_time', icon: Clock },
        { key: 'barrier_cooking', icon: Flame },
        { key: 'barrier_sleep', icon: Moon },
    ] as const;

    // Use generic icons or mapped ones
    // Note: In a real app we'd map all barrier keys to icons

    const toggleBarrier = (key: string) => {
        if (selectedBarriers.includes(key)) {
            setSelectedBarriers(selectedBarriers.filter(k => k !== key));
        } else {
            setSelectedBarriers([...selectedBarriers, key]);
        }
    };

    const handleNext = () => {
        router.push('/onboarding/step12-pledge' as any);
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <View className="flex-1 px-6 pt-6">
                {/* Header */}
                <View className="flex-row items-center mb-6 relative">
                    <Pressable
                        onPress={() => router.back()}
                        className="p-2 rounded-full absolute left-0 z-10 active:bg-gray-100"
                    >
                        <ArrowLeft color="#192126" size={24} />
                    </Pressable>
                    <View className="flex-1 items-center">
                        <Text className="text-lg font-bold text-[#192126]">8/10</Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-8">
                    {[...Array(8)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    ))}
                    {[...Array(5)].map((_, i) => ( // Total steps logic might be off, but consistent with visual
                        <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                    ))}
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <Text className="text-2xl font-black mb-2 text-[#192126]">{t.step8_title}</Text>
                    <Text className="text-[#5E6468] font-medium mb-8 text-base">{t.step8_subtitle}</Text>

                    <View className="gap-2">
                        {barriers.map((bar) => {
                            const isSelected = selectedBarriers.includes(bar.key);
                            const IconData = bar.icon;

                            return (
                                <UniversalSelectionCard
                                    key={bar.key}
                                    title={t[bar.key as keyof typeof t] || bar.key}
                                    selected={isSelected}
                                    onPress={() => toggleBarrier(bar.key)}
                                    icon={
                                        <IconData
                                            size={24}
                                            color={isSelected ? '#BBF246' : '#6B7280'}
                                        />
                                    }
                                />
                            );
                        })}
                    </View>
                </ScrollView>

                {/* Footer */}
                <View className="p-6 bg-white border-t border-gray-100 flex-row gap-3">
                    <Pressable
                        onPress={handleNext} // Skip allowed
                        className="flex-1 py-4 rounded-xl bg-gray-100 items-center justify-center active:bg-gray-200"
                    >
                        <Text className="font-bold text-[#192126]">{t.skip}</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleNext}
                        className="flex-[2] py-4 rounded-xl bg-[#192126] items-center justify-center"
                    >
                        <Text className="font-bold text-white">{t.next}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
