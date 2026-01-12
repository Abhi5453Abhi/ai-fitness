import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { UniversalTextInput } from '@ai-fitness/shared';

export default function Step1Name() {
    const router = useRouter();
    const [name, setName] = useState('');

    // Mock Translation for MVP
    const t = {
        step1_title: "Let's get to know you",
        step1_subtitle: "We need your name to personalize your journey.",
        name_placeholder: "YOUR NAME",
        next: "Next",
        skip: "Skip"
    };

    const handleNext = () => {
        if (name.trim()) {
            router.push({ pathname: '/onboarding/step2', params: { name } });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 p-6"
            >
                {/* Header */}
                <View className="flex-row items-center mb-8">
                    <Pressable onPress={() => router.back()} className="p-2 rounded-full active:bg-gray-100">
                        <ArrowLeft color="#192126" size={24} />
                    </Pressable>
                    <Text className="mx-auto text-lg font-bold text-[#192126]">1/10</Text>
                    <View className="w-10" />
                </View>

                {/* Progress Bar */}
                <View className="flex-row gap-1 mb-8">
                    <View className="h-1 flex-1 bg-[#BBF246] rounded-full" />
                    {[...Array(9)].map((_, i) => (
                        <View key={i} className="h-1 flex-1 bg-gray-100 rounded-full" />
                    ))}
                </View>

                {/* Content */}
                <View className="flex-1">
                    <Text className="text-3xl font-black text-[#192126] mb-2">{t.step1_title}</Text>
                    <Text className="text-[#5E6468] font-medium mb-8">{t.step1_subtitle}</Text>

                    <View className="mb-4">
                        <UniversalTextInput
                            label={t.name_placeholder}
                            value={name}
                            onChangeText={setName}
                            placeholder="Ex. John Doe"
                            autoFocus={true}
                        />
                    </View>
                </View>

                {/* Footer */}
                <View className="pt-6 flex-row gap-3">
                    <Pressable
                        onPress={() => router.push('/onboarding/step2')} // Skip behavior
                        className="flex-1 py-4 rounded-xl bg-gray-100 items-center justify-center active:bg-gray-200"
                    >
                        <Text className="font-bold text-[#192126]">{t.skip}</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleNext}
                        disabled={!name.trim()}
                        className={`flex-[2] py-4 rounded-xl items-center justify-center flex-row gap-2 ${name.trim() ? 'bg-[#192126]' : 'bg-gray-300'}`}
                    >
                        <Text className="font-bold text-white">{t.next}</Text>
                        {name.trim() && <ArrowRight color="white" size={20} />}
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
