import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Utensils, Cookie, Milk, Droplets } from 'lucide-react-native';
import { useLanguage } from '@/hooks/use-language';

export default function StepCurrentDiet() {
    const router = useRouter();
    const { t } = useLanguage();

    const [breakfast, setBreakfast] = useState('');
    const [lunch, setLunch] = useState('');
    const [dinner, setDinner] = useState('');
    const [junkFood, setJunkFood] = useState(false);
    const [milkIntake, setMilkIntake] = useState(false);
    const [lowWater, setLowWater] = useState(false);

    const handleNext = () => {
        router.push('/onboarding/step11-barriers' as any);
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
                        <Text className="text-lg font-bold text-[#192126]">Current Diet</Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-8">
                    {[...Array(10)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    ))}
                    {[...Array(3)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                    ))}
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <Text className="text-2xl font-black mb-2 text-[#192126]">What do you usually eat?</Text>
                    <Text className="text-[#5E6468] font-medium mb-6 text-base">Tell us about your current meals</Text>

                    {/* Meal Inputs */}
                    <View className="gap-4 mb-8">
                        <View>
                            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Breakfast</Text>
                            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4">
                                <Utensils size={18} color="#9CA3AF" />
                                <TextInput
                                    value={breakfast}
                                    onChangeText={setBreakfast}
                                    placeholder="e.g. Paratha, Eggs, Chai"
                                    placeholderTextColor="#9CA3AF"
                                    className="flex-1 p-4 text-[#192126] font-bold"
                                />
                            </View>
                        </View>
                        <View>
                            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lunch</Text>
                            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4">
                                <Utensils size={18} color="#9CA3AF" />
                                <TextInput
                                    value={lunch}
                                    onChangeText={setLunch}
                                    placeholder="e.g. Dal, Roti, Sabzi"
                                    placeholderTextColor="#9CA3AF"
                                    className="flex-1 p-4 text-[#192126] font-bold"
                                />
                            </View>
                        </View>
                        <View>
                            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Dinner</Text>
                            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4">
                                <Utensils size={18} color="#9CA3AF" />
                                <TextInput
                                    value={dinner}
                                    onChangeText={setDinner}
                                    placeholder="e.g. Rice, Curry, Salad"
                                    placeholderTextColor="#9CA3AF"
                                    className="flex-1 p-4 text-[#192126] font-bold"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Habits */}
                    <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Habits</Text>
                    <View className="gap-3">
                        <Pressable
                            onPress={() => setJunkFood(!junkFood)}
                            className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${junkFood ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white'}`}
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="p-2 bg-red-100 rounded-full">
                                    <Cookie size={20} color="#EF4444" />
                                </View>
                                <Text className={`font-bold ${junkFood ? 'text-red-900' : 'text-[#192126]'}`}>I eat junk food regularly</Text>
                            </View>
                            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${junkFood ? 'bg-red-500 border-red-500' : 'border-gray-200'}`}>
                                {junkFood && <Text className="text-white text-xs">✓</Text>}
                            </View>
                        </Pressable>

                        <Pressable
                            onPress={() => setMilkIntake(!milkIntake)}
                            className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${milkIntake ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-white'}`}
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="p-2 bg-blue-100 rounded-full">
                                    <Milk size={20} color="#3B82F6" />
                                </View>
                                <Text className={`font-bold ${milkIntake ? 'text-blue-900' : 'text-[#192126]'}`}>I drink milk daily</Text>
                            </View>
                            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${milkIntake ? 'bg-blue-500 border-blue-500' : 'border-gray-200'}`}>
                                {milkIntake && <Text className="text-white text-xs">✓</Text>}
                            </View>
                        </Pressable>

                        <Pressable
                            onPress={() => setLowWater(!lowWater)}
                            className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${lowWater ? 'border-orange-200 bg-orange-50' : 'border-gray-100 bg-white'}`}
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="p-2 bg-orange-100 rounded-full">
                                    <Droplets size={20} color="#F97316" />
                                </View>
                                <Text className={`font-bold ${lowWater ? 'text-orange-900' : 'text-[#192126]'}`}>I don't drink enough water</Text>
                            </View>
                            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${lowWater ? 'bg-orange-500 border-orange-500' : 'border-gray-200'}`}>
                                {lowWater && <Text className="text-white text-xs">✓</Text>}
                            </View>
                        </Pressable>
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
                        className="flex-[2] py-4 rounded-xl bg-[#192126] items-center justify-center"
                    >
                        <Text className="font-bold text-white">{t.next}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
