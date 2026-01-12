import React, { ReactNode } from 'react';
import { Pressable, Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

interface UniversalSelectionCardProps {
    title: string;
    subtitle?: string;
    selected: boolean;
    onPress: () => void;
    icon?: ReactNode;
    style?: ViewStyle;
}

export const UniversalSelectionCard = ({
    title,
    subtitle,
    selected,
    onPress,
    icon,
    style
}: UniversalSelectionCardProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                selected ? styles.containerSelected : styles.containerUnselected,
                pressed && !selected && styles.pressed,
                style
            ]}
        >
            <View style={[styles.iconContainer, selected ? styles.iconContainerSelected : styles.iconContainerUnselected]}>
                {icon}
            </View>

            <View style={styles.contentContainer}>
                <Text style={[styles.title, selected ? styles.textSelected : styles.textUnselected]}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={[styles.subtitle, selected ? styles.subtitleSelected : styles.subtitleUnselected]}>
                        {subtitle}
                    </Text>
                )}
            </View>

            {/* Radio Circle */}
            <View style={[styles.radio, selected ? styles.radioSelected : styles.radioUnselected]}>
                {selected && <View style={styles.radioInner} />}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 24,
        borderWidth: 2,
        marginBottom: 16,
        // Shadow for web/ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2, // Android
    },
    containerUnselected: {
        backgroundColor: '#FFFFFF',
        borderColor: '#F3F4F6', // Gray-100
    },
    containerSelected: {
        backgroundColor: '#192126',
        borderColor: '#192126',
    },
    pressed: {
        backgroundColor: '#F9FAFB', // Gray-50
    },
    iconContainer: {
        padding: 12,
        borderRadius: 999,
        marginRight: 16,
    },
    iconContainerUnselected: {
        backgroundColor: '#F3F4F6', // Gray-100
    },
    iconContainerSelected: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    textUnselected: {
        color: '#192126',
    },
    textSelected: {
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    subtitleUnselected: {
        color: '#6B7280', // Gray-500
    },
    subtitleSelected: {
        color: '#9CA3AF', // Gray-400
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioUnselected: {
        backgroundColor: '#F3F4F6',
    },
    radioSelected: {
        backgroundColor: '#BBF246',
    },
    radioInner: {
        width: 8,
        height: 8,
        backgroundColor: '#192126',
        borderRadius: 4,
    }
});
