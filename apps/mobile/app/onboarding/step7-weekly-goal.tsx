import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, TrendingDown, Gauge, Zap, Flame } from 'lucide-react-native';
import { UniversalSelectionCard } from '@ai-fitness/shared';
import { useLanguage } from '@/hooks/use-language';

export default function StepWeeklyGoal() {
    const router = useRouter();
    const { t } = useLanguage();
    const [weeklyRate, setWeeklyRate] = useState<string>('');

    const rates = [
        { key: 'rate_02', value: '0.2', label: '0.2 kg/week', desc: 'Gentle & sustainable', icon: TrendingDown, recommended: true },
        { key: 'rate_05', value: '0.5', label: '0.5 kg/week', desc: 'Balanced approach', icon: Gauge },
        { key: 'rate_08', value: '0.8', label: '0.8 kg/week', desc: 'Faster results', icon: Zap },
        { key: 'rate_10', value: '1.0', label: '1.0 kg/week', desc: 'Maximum effort', icon: Flame },
    ];

    const handleNext = () => {
        router.push('/onboarding/step8-activity' as any);
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
                        <Text className="text-lg font-bold text-[#192126]">Weekly Goal</Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-8">
                    {[...Array(7)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    ))}
                    {[...Array(6)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                    ))}
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <Text className="text-2xl font-black mb-2 text-[#192126]">What's your weekly goal?</Text>
                    <Text className="text-[#5E6468] font-medium mb-8 text-base">How much weight do you want to lose per week?</Text>

                    <View className="gap-3">
                        {rates.map((rate) => {
                            const isSelected = weeklyRate === rate.value;
                            const IconData = rate.icon;

                            return (
                                <UniversalSelectionCard
                                    key={rate.value}
                                    title={rate.label}
                                    subtitle={rate.desc + (rate.recommended ? ' ⭐ Recommended' : '')}
                                    selected={isSelected}
                                    onPress={() => setWeeklyRate(rate.value)}
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
                        onPress={handleNext}
                        className="flex-1 py-4 rounded-xl bg-gray-100 items-center justify-center active:bg-gray-200"
                    >
                        <Text className="font-bold text-[#192126]">{t.skip}</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleNext}
                        disabled={!weeklyRate}
                        className={`flex-[2] py-4 rounded-xl items-center justify-center ${weeklyRate ? 'bg-[#192126]' : 'bg-gray-300'}`}
                    >
                        <Text className="font-bold text-white">{t.next}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
