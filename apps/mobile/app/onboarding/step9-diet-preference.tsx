import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Leaf, Beef, Egg, Ban } from 'lucide-react-native';
import { UniversalSelectionCard } from '@ai-fitness/shared';
import { useLanguage } from '@/hooks/use-language';

export default function StepDietPreference() {
    const router = useRouter();
    const { t } = useLanguage();
    const [dietType, setDietType] = useState<string>('');

    const diets = [
        { key: 'vegetarian', label: 'Vegetarian', desc: 'No meat, eggs optional', icon: Leaf },
        { key: 'non_vegetarian', label: 'Non-Vegetarian', desc: 'I eat everything', icon: Beef },
        { key: 'eggetarian', label: 'Eggetarian', desc: 'Veg + Eggs', icon: Egg },
        { key: 'vegan', label: 'Vegan', desc: 'No animal products', icon: Ban },
    ];

    const handleNext = () => {
        router.push('/onboarding/step10-current-diet' as any);
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
                        <Text className="text-lg font-bold text-[#192126]">Diet Preference</Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    ))}
                    {[...Array(4)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                    ))}
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <Text className="text-2xl font-black mb-2 text-[#192126]">{t.step_diet_subtitle || "Do you eat meat?"}</Text>
                    <Text className="text-[#5E6468] font-medium mb-8 text-base">{t.step_diet_desc || "This helps us recommend the right protein sources."}</Text>

                    <View className="gap-3">
                        {diets.map((diet) => {
                            const isSelected = dietType === diet.key;
                            const IconData = diet.icon;

                            return (
                                <UniversalSelectionCard
                                    key={diet.key}
                                    title={diet.label}
                                    subtitle={diet.desc}
                                    selected={isSelected}
                                    onPress={() => setDietType(diet.key)}
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
                        disabled={!dietType}
                        className={`flex-[2] py-4 rounded-xl items-center justify-center ${dietType ? 'bg-[#192126]' : 'bg-gray-300'}`}
                    >
                        <Text className="font-bold text-white">{t.next}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
