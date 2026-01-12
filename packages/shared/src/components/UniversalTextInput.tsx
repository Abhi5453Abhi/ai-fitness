import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface UniversalTextInputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export const UniversalTextInput = ({ label, error, style, ...props }: UniversalTextInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={{ marginBottom: 16 }}>
            {label && (
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#192126', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {label}
                </Text>
            )}
            <TextInput
                style={[
                    {
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#192126',
                        borderBottomWidth: 2,
                        paddingVertical: 8,
                        borderColor: error ? '#EF4444' : isFocused ? '#BBF246' : '#E5E7EB'
                    },
                    style
                ]}
                placeholderTextColor="#9CA3AF"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            {error && <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{error}</Text>}
        </View>
    );
};
