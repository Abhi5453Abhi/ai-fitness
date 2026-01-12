'use client';
import { UniversalButton } from '@ai-fitness/shared';
import React from 'react';

export default function TestPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900">Universal React Test</h1>
            <p className="text-gray-500 mb-8 text-center max-w-md">
                The buttons below are defined in <code>packages/shared</code> using
                <code>react-native</code> primitives, but they render here as HTML!
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <UniversalButton
                    title="Primary Native Button"
                    onPress={() => alert('Hello from Universal Component!')}
                    variant="primary"
                />

                <UniversalButton
                    title="Secondary Native Button"
                    onPress={() => alert('Secondary Pressed')}
                    variant="secondary"
                />

                <UniversalButton
                    title="Outline Native Button"
                    onPress={() => alert('Outline Pressed')}
                    variant="outline"
                />
            </div>
        </div>
    );
}
