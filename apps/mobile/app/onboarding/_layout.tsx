import { Stack } from 'expo-router';

export default function OnboardingLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="step1" />
            <Stack.Screen name="step2" />
            <Stack.Screen name="step3" />
            <Stack.Screen name="step4" />
            <Stack.Screen name="step5" />
            <Stack.Screen name="step6" />
            <Stack.Screen name="step7-weekly-goal" />
            <Stack.Screen name="step8-activity" />
            <Stack.Screen name="step9-diet-preference" />
            <Stack.Screen name="step10-current-diet" />
            <Stack.Screen name="step11-barriers" />
            <Stack.Screen name="step12-pledge" />
            <Stack.Screen name="step13-processing" />
        </Stack>
    );
}
