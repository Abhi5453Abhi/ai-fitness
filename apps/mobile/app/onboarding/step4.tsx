import React, { useState, useRef } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ArrowLeft, User, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';


import { UniversalRuler } from '@ai-fitness/shared';

const MIN_AGE = 18;
const MAX_AGE = 100;

export default function Step4Biometrics() {
    const router = useRouter();
    const [gender, setGender] = useState<'male' | 'female' | null>(null);
    const [age, setAge] = useState<number>(25);

    // Mock Translation
    const t: Record<string, string> = {
        step4_title: "Biometrics",
        step4_subtitle: "We use this to calculate your metabolic rate and caloric needs.",
        gender_male: "Male",
        gender_female: "Female",
        age_label: "AGE",
        years_old: "years old",
        next: "Next",
        skip: "Skip"
    };

    const handleNext = () => {
        router.push('/onboarding/step5');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-6">
                {/* Header */}
                <View className="flex-row items-center mb-6">
                    <Pressable onPress={() => router.back()} className="p-2 rounded-full active:bg-gray-100">
                        <ArrowLeft color="#192126" size={24} />
                    </Pressable>
                    <Text className="mx-auto text-lg font-bold text-[#192126]">4/10</Text>
                    <View className="w-10" />
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-8">
                    <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    {[...Array(6)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                    ))}
                </View>

                {/* Content */}
                <View className="flex-1">
                    <Text className="text-2xl font-black text-[#192126] mb-2 text-center">{t.step4_title}</Text>
                    <Text className="text-[#5E6468] mb-8 text-center font-medium">{t.step4_subtitle}</Text>

                    {/* Gender Selection */}
                    <View className="flex-row gap-4 mb-12">
                        {['male', 'female'].map((g) => (
                            <Pressable
                                key={g}
                                onPress={() => setGender(g as 'male' | 'female')}
                                className={`flex-1 p-6 rounded-3xl border-2 items-center justify-center gap-2 ${gender === g ? 'bg-[#192126] border-[#192126]' : 'bg-white border-gray-100'}`}
                            >
                                <User size={40} color={gender === g ? '#BBF246' : '#9CA3AF'} />
                                <Text className={`text-lg font-bold capitalize ${gender === g ? 'text-white' : 'text-gray-400'}`}>
                                    {g === 'male' ? t.gender_male : t.gender_female}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    {/* Age Scroller */}
                    <View className="items-center">
                        <Text className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 text-center">{t.age_label}</Text>

                        <UniversalRuler
                            min={MIN_AGE}
                            max={MAX_AGE}
                            value={age}
                            setValue={setAge}
                            unit={t.years_old}
                        />
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
                        disabled={!gender}
                        className={`flex-[2] py-4 rounded-xl items-center justify-center flex-row gap-2 ${gender ? 'bg-[#192126]' : 'bg-gray-300'}`}
                    >
                        <Text className="font-bold text-white">{t.next}</Text>
                        {gender && <ArrowRight color="white" size={20} />}
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
