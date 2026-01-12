import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Armchair, Footprints, Zap, Flame } from 'lucide-react-native';
import { UniversalSelectionCard } from '@ai-fitness/shared';
import { useLanguage } from '@/hooks/use-language';

export default function Step7Activity() {
    const router = useRouter();
    const { t } = useLanguage();
    const [activityLevel, setActivityLevel] = useState<string>('');

    const activities = [
        { level: 'Sedentary', key: 'activity_sedentary', descKey: 'desc_sedentary', icon: Armchair },
        { level: 'Lightly Active', key: 'activity_light', descKey: 'desc_light', icon: Footprints },
        { level: 'Active', key: 'activity_active', descKey: 'desc_active', icon: Zap },
        { level: 'Very Active', key: 'activity_very', descKey: 'desc_very', icon: Flame },
    ] as const;

    const handleNext = () => {
        if (!activityLevel) return;
        // In the future this should save to context/store
        router.push('/onboarding/step9-diet-preference' as any); // Type assertion until route exists
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
                        <Text className="text-lg font-bold text-[#192126]">{t.step_activity_header}</Text>
                    </View>
                </View>

                {/* Progress Bar (Simulated for Step 7 approx 60%) */}
                <View className="flex-row gap-1 mb-8">
                    {[...Array(8)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    ))}
                    {[...Array(5)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                    ))}
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <Text className="text-2xl font-black mb-2 text-[#192126]">{t.step_activity_title}</Text>
                    <Text className="text-[#5E6468] font-medium mb-8 text-base">{t.step_activity_subtitle}</Text>

                    <View className="gap-2">
                        {activities.map((act) => {
                            const IconData = act.icon;
                            const isSelected = activityLevel === act.level;

                            return (
                                <UniversalSelectionCard
                                    key={act.level}
                                    title={t[act.key as keyof typeof t] || act.level}
                                    subtitle={t[act.descKey as keyof typeof t] || ''}
                                    selected={isSelected}
                                    onPress={() => setActivityLevel(act.level)}
                                    // Pass custom icon rendering
                                    icon={
                                        <IconData
                                            size={24}
                                            color={isSelected ? '#BBF246' : '#6B7280'}
                                            fill={isSelected ? '#BBF246' : 'none'} // Optional fill effect
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
                        onPress={() => router.push('/onboarding/step8' as any)}
                        className="flex-1 py-4 rounded-xl bg-gray-100 items-center justify-center active:bg-gray-200"
                    >
                        <Text className="font-bold text-[#192126]">{t.skip}</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleNext}
                        className={`flex-[2] py-4 rounded-xl items-center justify-center ${activityLevel ? 'bg-[#192126]' : 'bg-gray-300'}`}
                        disabled={!activityLevel}
                    >
                        <Text className="font-bold text-white">{t.next}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
