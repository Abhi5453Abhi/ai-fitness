import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ShieldCheck, Phone, ArrowRight, CheckCircle, Loader2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/hooks/use-language';

export default function LoginScreen() {
    const router = useRouter();
    const { t, language, setLanguage } = useLanguage();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [step, setStep] = useState<'PHONE' | 'LANGUAGE'>('PHONE');
    const [loading, setLoading] = useState(false);


    const handleSendOtp = () => {
        if (phoneNumber.length < 10) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit number');
            return;
        }
        setStep('LANGUAGE');
    };

    const handleLogin = async (selectedLang: 'en' | 'pa') => {
        setLanguage(selectedLang);
        setLoading(true);

        // TODO: Connect to real backend when deployed
        // For now, skip API call since physical device can't reach localhost
        // Simulate a delay and go to onboarding
        setTimeout(() => {
            setLoading(false);
            // Navigate to onboarding for new users
            router.push('/onboarding/step1');
        }, 500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white items-center justify-center p-6"
        >
            <View className="w-full max-w-sm">
                {/* Header */}
                <View className="mb-10 items-center">
                    <View className="w-20 h-20 bg-[#BBF246] rounded-3xl items-center justify-center mb-6 shadow-sm shadow-lime-200">
                        <ShieldCheck color="#192126" size={40} />
                    </View>
                    <Text className="text-3xl font-black text-[#192126] mb-2 text-center">
                        {step === 'PHONE' && t.welcome_back}
                        {step === 'LANGUAGE' && t.select_language}
                    </Text>
                    <Text className="text-[#5E6468] font-medium text-center">
                        {step === 'PHONE' && t.enter_mobile}
                        {step === 'LANGUAGE' && t.choose_preferred}
                    </Text>
                </View>

                {step === 'PHONE' && (
                    <View className="space-y-6 gap-6">
                        <View className="space-y-2 gap-2">
                            <Text className="text-sm font-bold text-[#192126] ml-1">{t.mobile_number}</Text>
                            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-3xl px-4">
                                <Phone color="#9CA3AF" size={20} />
                                <TextInput
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    placeholder="+91 98765 43210"
                                    keyboardType="phone-pad"
                                    className="flex-1 py-4 pl-3 text-lg font-bold text-[#192126]"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        <Pressable
                            onPress={handleSendOtp}
                            disabled={loading}
                            className="w-full bg-[#192126] py-5 rounded-3xl items-center flex-row justify-center gap-2 active:opacity-90"
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <>
                                    <Text className="text-white text-lg font-bold">{t.continue}</Text>
                                    <ArrowRight color="#FFFFFF" size={20} />
                                </>
                            )}
                        </Pressable>
                    </View>
                )}

                {step === 'LANGUAGE' && (
                    <View className="space-y-4 gap-4">
                        {/* English Button */}
                        <Pressable
                            onPress={() => handleLogin('en')}
                            disabled={loading}
                            className={`w-full p-6 rounded-3xl border-2 flex-row items-center justify-between ${loading ? 'opacity-70 border-gray-100' : 'border-gray-100 active:border-[#BBF246] active:bg-[#BBF246]/10'}`}
                        >
                            <Text className="text-xl font-bold text-[#192126]">English</Text>
                            <View className={`w-6 h-6 rounded-full border-2 ${language === 'en' ? 'bg-[#BBF246] border-[#BBF246]' : 'border-gray-300'}`} />
                        </Pressable>

                        {/* Punjabi Button */}
                        <Pressable
                            onPress={() => handleLogin('pa')}
                            disabled={loading}
                            className={`w-full p-6 rounded-3xl border-2 flex-row items-center justify-between ${loading ? 'opacity-70 border-gray-100' : 'border-gray-100 active:border-[#BBF246] active:bg-[#BBF246]/10'}`}
                        >
                            <Text className="text-xl font-bold text-[#192126]">ਪੰਜਾਬੀ</Text>
                            <View className={`w-6 h-6 rounded-full border-2 ${language === 'pa' ? 'bg-[#BBF246] border-[#BBF246]' : 'border-gray-300'}`} />
                        </Pressable>

                        <Pressable onPress={() => setStep('PHONE')} className="mt-4">
                            <Text className="text-center text-sm font-bold text-[#5E6468]">{t.back}</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}
