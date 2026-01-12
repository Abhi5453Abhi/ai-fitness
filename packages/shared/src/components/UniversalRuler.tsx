import React, { useRef } from 'react';
import { View, Text, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

const SCREEN_WIDTH = Dimensions.get('window').width;
const RULER_ITEM_WIDTH = 10;

interface UniversalRulerProps {
    min: number;
    max: number;
    value: number;
    setValue: (val: number) => void;
    unit: string;
    step?: number;
}

export const UniversalRuler: React.FC<UniversalRulerProps> = ({
    min,
    max,
    value,
    setValue,
    unit,
    step = 1
}) => {
    const lastValueRef = useRef(value);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / RULER_ITEM_WIDTH);
        const calculatedValue = min + (index * step);

        if (calculatedValue >= min && calculatedValue <= max) {
            const snapped = Math.round(calculatedValue / step) * step;
            if (snapped !== lastValueRef.current) {
                lastValueRef.current = snapped;
                setValue(snapped);
                // Haptic feedback on value change
                if (Platform.OS !== 'web') {
                    Haptics.selectionAsync();
                }
            }
        }
    };

    const ticksCount = Math.floor((max - min) / step) + 1;
    const ticks = Array.from({ length: ticksCount }, (_, i) => min + (i * step));

    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            {/* Value Display - Reduced size */}
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 48, fontWeight: '900', color: '#192126' }}>{value}</Text>
                <Text style={{ fontSize: 16, color: '#9CA3AF', fontWeight: 'bold', marginLeft: 6 }}>{unit}</Text>
            </View>

            {/* Ruler Container - Reduced height */}
            <View style={{ height: 64, width: '100%', position: 'relative', justifyContent: 'center' }}>
                {/* Center Indicator - Fixed alignment */}
                <View
                    style={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: -2,
                        height: 40,
                        width: 4,
                        backgroundColor: '#BBF246',
                        borderRadius: 9999,
                        zIndex: 20,
                        top: 4
                    }}
                    pointerEvents="none"
                />

                {/* Edge Fades */}
                <View style={{ position: 'absolute', left: 0, width: 48, height: '100%', backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 10 }} pointerEvents="none" />
                <View style={{ position: 'absolute', right: 0, width: 48, height: '100%', backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 10 }} pointerEvents="none" />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={RULER_ITEM_WIDTH}
                    decelerationRate="fast"
                    onScroll={handleScroll}
                    scrollEventThrottle={32}
                    contentContainerStyle={{ paddingHorizontal: SCREEN_WIDTH / 2 - 5 }}
                >
                    {ticks.map((val) => (
                        <View key={val} style={{ width: 10, alignItems: 'center', justifyContent: 'center', height: 48 }}>
                            <View
                                style={{
                                    width: 2,
                                    borderRadius: 9999,
                                    height: val % (step * 5) === 0 ? 28 : 14,
                                    backgroundColor: val % (step * 5) === 0 ? '#9CA3AF' : '#D1D5DB'
                                }}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};
