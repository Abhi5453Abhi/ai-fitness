import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { ArrowLeft, Sparkles, Trophy, Salad, Brain, TrendingDown, Activity, Zap } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/hooks/use-language';

export default function Step3Motivation() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { t } = useLanguage();

    // Fix param parsing: params.selectedGoals can be string, array, or command-separated string
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [isSynergy, setIsSynergy] = useState(false);
    const [primaryGoal, setPrimaryGoal] = useState("goal_lose_weight");

    useEffect(() => {
        let goals: string[] = [];
        const raw = params.selectedGoals;

        if (typeof raw === 'string') {
            goals = raw.split(',').filter(Boolean);
        } else if (Array.isArray(raw)) {
            goals = raw.filter(Boolean) as string[];
        }

        if (goals.length === 0) goals = ['goal_lose_weight'];

        setSelectedGoals(goals);
        setIsSynergy(goals.length > 1);
        setPrimaryGoal(goals[0]);
    }, [params.selectedGoals]);

    const handleNext = () => {
        router.push('/onboarding/step4');
    };

    // -----------------------------------------------------------------------
    // RENDERERS (View-based approximations of Web SVGs)
    // -----------------------------------------------------------------------

    const RenderSynergyCore = () => (
        <View className="items-center justify-center p-8 h-64">
            <View className="relative w-full h-full items-center justify-center">
                {/* Orbiting items simulation */}
                {selectedGoals.map((_, i) => {
                    // Simple static positioning for orbit simulation
                    const angle = (i * 2 * Math.PI) / selectedGoals.length;
                    const radius = 80;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <View
                            key={i}
                            className="absolute bg-white border border-gray-100 w-10 h-10 rounded-full items-center justify-center shadow-sm z-20"
                            style={{ transform: [{ translateX: x }, { translateY: y }] }}
                        >
                            <View className="w-2 h-2 bg-[#192126] rounded-full" />
                        </View>
                    );
                })}

                {/* Central Core */}
                <View className="w-24 h-24 bg-[#192126] rounded-full items-center justify-center z-10 shadow-lg shadow-[#BBF246]/50">
                    <Sparkles color="#BBF246" size={40} />
                </View>

                <View className="absolute bottom-0">
                    <Text className="text-center text-gray-500 font-medium">
                        Combining <Text className="text-[#192126] font-bold">{selectedGoals.length} goals</Text> into one unified protocol.
                    </Text>
                </View>
            </View>
        </View>
    );

    const RenderMuscleCurve = () => (
        <View className="w-full h-64 bg-orange-50 rounded-3xl border border-orange-100 p-6 justify-between overflow-hidden relative">
            <View className="absolute right-6 top-6 bg-white p-2 rounded-full z-10">
                <Trophy color="#F97316" size={24} />
            </View>
            {/* Bars increasing in height to simulate growth */}
            <View className="absolute bottom-0 left-0 right-0 h-40 flex-row items-end justify-between px-6 pb-6 opacity-30">
                {[1, 1.2, 1.5, 1.4, 1.8, 2.2, 2.5].map((h, i) => (
                    <View key={i} className="w-6 bg-orange-400 rounded-t-lg" style={{ height: h * 40 }} />
                ))}
            </View>
            <View className="mt-auto bg-white/80 p-3 rounded-2xl self-start z-10 border border-orange-100">
                <Text className="text-3xl font-black text-[#192126]">+2.5kg</Text>
                <Text className="text-orange-900 font-medium text-xs">Lean Mass Projection</Text>
            </View>
        </View>
    );

    const RenderDietStream = () => (
        <View className="w-full h-64 bg-green-50 rounded-3xl border border-green-100 p-6 items-center justify-center overflow-hidden">
            <View className="bg-white border border-gray-100 shadow-sm px-6 py-3 rounded-full flex-row items-center gap-3 z-10">
                <Salad color="#16A34A" size={20} />
                <Text className="text-[#192126] font-bold">Metabolic Optimization</Text>
            </View>
            {/* Particles */}
            <View className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <View
                        key={i}
                        className="absolute bg-green-400 rounded-full opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: Math.random() * 10 + 4,
                            height: Math.random() * 10 + 4
                        }}
                    />
                ))}
            </View>
        </View>
    );

    const RenderStressWave = () => (
        <View className="w-full h-64 bg-indigo-50 rounded-3xl border border-indigo-100 p-6 items-center justify-center overflow-hidden">
            {/* Circles representing focus/calm */}
            <View className="absolute w-40 h-40 rounded-full border border-indigo-200 opacity-50" />
            <View className="absolute w-60 h-60 rounded-full border border-indigo-200 opacity-30" />
            <View className="absolute w-80 h-80 rounded-full border border-indigo-200 opacity-20" />

            <View className="items-center bg-white/80 p-6 rounded-3xl z-10 shadow-sm">
                <Brain color="#4F46E5" size={40} />
                <Text className="text-indigo-900 font-bold mt-2">Cortisol Regulation</Text>
            </View>
        </View>
    );

    const RenderActivityStairs = () => (
        <View className="w-full h-64 bg-gray-50 rounded-3xl border border-gray-100 p-6 flex-row items-end justify-center gap-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((h, i) => (
                <View key={i} className="w-8 bg-[#192126] rounded-t-md opacity-80" style={{ height: `${h * 15}%` }} />
            ))}
            <View className="absolute top-6 left-6">
                <Text className="text-[#192126] font-black text-xl">Activity Volume</Text>
            </View>
        </View>
    );

    const RenderWeightLoss = () => (
        <View className="w-full h-64 bg-blue-50 rounded-3xl border border-blue-100 p-6 justify-between relative overflow-hidden">
            {/* Downward trend line simulation */}
            <View className="absolute top-1/4 left-0 right-0 h-40 opacity-20">
                <View className="absolute top-0 left-0 w-full h-1 bg-blue-300 transform rotate-12 translate-y-10" />
            </View>

            <View className="absolute top-1/3 left-4 right-4">
                <View className="flex-row items-center gap-2">
                    <TrendingDown color="#3B82F6" size={32} />
                    <Text className="text-3xl font-black text-blue-500">-5kg</Text>
                </View>
            </View>
            <View className="mt-auto flex-row justify-between w-full px-1">
                <Text className="text-xs font-bold text-blue-900/50">Today</Text>
                <Text className="text-xs font-bold text-blue-900/50">6 months</Text>
            </View>
        </View>
    );

    // Selector Logic
    let Content = RenderWeightLoss;
    let title: string = t.motivation_default_title;
    let sub: string = t.motivation_default_sub;

    if (isSynergy) {
        title = t.motivation_synergy_title;
        sub = t.motivation_synergy_sub;
        Content = RenderSynergyCore;
    } else if (primaryGoal === 'goal_gain_muscle' || primaryGoal === 'goal_increase_energy') {
        title = t.motivation_muscle_title;
        sub = t.motivation_muscle_sub;
        Content = RenderMuscleCurve;
    } else if (primaryGoal === 'goal_unknown_diet_placeholder') { // No diet goal currently
        title = t.motivation_diet_title;
        sub = t.motivation_diet_sub;
        Content = RenderDietStream;
    } else if (primaryGoal === 'goal_manage_stress' || primaryGoal === 'goal_improve_sleep') {
        title = t.motivation_stress_title;
        sub = t.motivation_stress_sub;
        Content = RenderStressWave;
    } else if (primaryGoal === 'goal_get_fit') {
        title = t.motivation_active_title;
        sub = t.motivation_active_sub;
        Content = RenderActivityStairs;
    } else {
        // Default / Lose Weight
        Content = RenderWeightLoss;
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-col h-full bg-white">
                <View className="p-6 pb-0">
                    {/* Header */}
                    <View className="items-center mb-6">
                        <Text className="mx-auto text-lg font-bold text-gray-400">3/10</Text>
                    </View>

                    {/* Progress Bar */}
                    <View className="flex-row gap-1 mb-8">
                        <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                        <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                        <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                        {[...Array(7)].map((_, i) => (
                            <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                        ))}
                    </View>
                </View>

                <View className="flex-1 px-6">
                    <Text className="text-lg font-bold text-gray-400 mb-2">{t.real_talk}</Text>
                    <Text className="text-3xl font-black mb-4 leading-tight text-[#192126]">{title}</Text>
                    <Text className="text-[#5E6468] text-lg mb-8 leading-relaxed font-medium">{sub}</Text>

                    <View className="flex-1 relative mb-4 justify-center">
                        <Content />
                    </View>

                    {!isSynergy && (
                        <Text className="text-sm italic text-gray-400 mb-6 text-center">{t.ps_message}</Text>
                    )}
                </View>

                {/* Footer */}
                <View className="p-6 mt-auto flex-row items-center gap-4 border-t border-gray-100 bg-white">
                    <Pressable onPress={() => router.back()} className="p-4 rounded-full active:bg-gray-100">
                        <ArrowLeft color="#192126" size={24} />
                    </Pressable>

                    <Pressable
                        onPress={() => router.push('/onboarding/step4')}
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

