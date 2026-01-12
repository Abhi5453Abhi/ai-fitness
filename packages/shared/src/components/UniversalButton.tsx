import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';

interface UniversalButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'outline';
}

export const UniversalButton = ({ title, onPress, style, textStyle, variant = 'primary' }: UniversalButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.base,
                styles[variant],
                pressed && styles.pressed,
                style
            ]}
        >
            <Text style={[styles.textBase, styles[`text_${variant}` as keyof typeof styles], textStyle]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    primary: {
        backgroundColor: '#192126', // Dark background
    },
    secondary: {
        backgroundColor: '#F3F4F6', // Gray-100
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#E5E7EB', // Gray-200
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }]
    },
    textBase: {
        fontSize: 16,
        fontWeight: '600',
    },
    text_primary: {
        color: '#FFFFFF',
    },
    text_secondary: {
        color: '#192126',
    },
    text_outline: {
        color: '#192126',
    }
});
