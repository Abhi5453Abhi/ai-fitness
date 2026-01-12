import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CheckCircle, Timer } from 'lucide-react-native';
import { useLanguage } from '@/hooks/use-language';

export default function Step10Processing() {
    const router = useRouter();
    const { t } = useLanguage();
    const [status, setStatus] = useState<'analyzing' | 'ready'>('analyzing');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('ready');
        }, 3000); // Simulate 3s processing
        return () => clearTimeout(timer);
    }, []);

    const handleNext = () => {
        router.push('/(tabs)/dashboard');
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <View className="flex-1 px-6 justify-center items-center">

                {status === 'analyzing' ? (
                    <View className="items-center">
                        <ActivityIndicator size="large" color="#BBF246" className="mb-8 transform scale-150" />
                        <Text className="text-2xl font-black text-[#192126] mb-2 text-center">{t.waiting_title}</Text>
                        <Text className="text-[#5E6468] font-medium text-center text-base mb-8">{t.waiting_subtitle}</Text>

                        <View className="flex-row items-center bg-gray-50 px-4 py-2 rounded-full">
                            <Timer size={16} color="#9CA3AF" />
                            <Text className="text-gray-400 font-bold ml-2 text-sm">{t.time_remaining}: ~5s</Text>
                        </View>
                    </View>
                ) : (
                    <View className="items-center w-full">
                        <View className="w-24 h-24 bg-[#BBF246] rounded-full items-center justify-center mb-8">
                            <CheckCircle size={48} color="#192126" />
                        </View>
                        <Text className="text-2xl font-black text-[#192126] mb-2 text-center">{t.plan_ready}</Text>
                        <Text className="text-[#5E6468] font-medium text-center text-base mb-12">
                            {t.motivation_synergy_sub}
                        </Text>

                        <Pressable
                            onPress={handleNext}
                            className="w-full py-4 rounded-xl bg-[#192126] items-center justify-center"
                        >
                            <Text className="font-bold text-white uppercase tracking-wider">{t.view_plan}</Text>
                        </Pressable>
                    </View>
                )}

            </View>
        </SafeAreaView>
    );
}
