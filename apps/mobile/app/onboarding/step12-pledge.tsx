import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Flame, Sprout, Hammer, Trophy } from 'lucide-react-native';
import { UniversalSelectionCard } from '@ai-fitness/shared';
import { useLanguage } from '@/hooks/use-language';

export default function Step9Pledge() {
    const router = useRouter();
    const { t } = useLanguage();
    const [commitment, setCommitment] = useState<string>('');

    const options = [
        { key: 'pledge_gentle', days: 3, icon: Sprout },
        { key: 'pledge_habits', days: 4, icon: Hammer },
        { key: 'pledge_results', days: 5, icon: Flame },
        { key: 'pledge_beast', days: 6, icon: Trophy },
    ];

    const handleNext = () => {
        router.push('/onboarding/step13-processing' as any);
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
                        <Text className="text-lg font-bold text-[#192126]">9/10</Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    ))}
                    <View className="h-1 flex-1 bg-gray-100 rounded-full" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <Text className="text-2xl font-black mb-2 text-[#192126]">{t.step9_title}</Text>
                    <Text className="text-[#5E6468] font-medium mb-8 text-base">{t.step9_subtitle}</Text>

                    <View className="gap-2">
                        {options.map((opt) => {
                            const isSelected = commitment === opt.key;
                            const IconData = opt.icon;

                            return (
                                <UniversalSelectionCard
                                    key={opt.key}
                                    title={t[opt.key as keyof typeof t] || opt.key}
                                    subtitle={`${opt.days} Days/Week`}
                                    selected={isSelected}
                                    onPress={() => setCommitment(opt.key)}
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
                <View className="p-6 bg-white border-t border-gray-100">
                    <Pressable
                        onPress={handleNext}
                        disabled={!commitment}
                        className={`w-full py-4 rounded-xl items-center justify-center ${commitment ? 'bg-[#192126]' : 'bg-gray-300'}`}
                    >
                        <Text className="font-bold text-white">{t.pledge_button}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
