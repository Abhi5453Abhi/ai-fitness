// import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';
import { TapeMeasure } from './TapeMeasure';

interface Step5MetricsProps {
    height: number;
    setHeight: (h: number) => void;
    weight: number;
    setWeight: (w: number) => void;
    onNext: () => void;
    onBack: () => void;
}

export function Step5Metrics({ height, setHeight, weight, setWeight, onNext, onBack }: Step5MetricsProps) {
    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full bg-[#1F2937] hover:bg-[#374151]">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <span className="mx-auto text-lg font-medium">Metrics</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-6">
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-gray-700 rounded-full"></div>
            </div>



            {/* Re-doing layout: Top/Bottom split for mobile friendliness */}
            {/* Horizontal Stacked Layout */}
            <div className="absolute inset-0 top-24 bottom-24 flex flex-col justify-center gap-40 pointer-events-none">

                {/* Height container (Horizontal) */}
                <div className="h-32 flex items-center justify-center pointer-events-auto">
                    <TapeMeasure
                        value={height}
                        onChange={setHeight}
                        min={120}
                        max={220}
                        step={50}
                        orientation="horizontal"
                        unit="cm"
                        label="Height"
                        showTickLabels={false}
                        labelPosition="top"
                    />
                </div>

                {/* Weight container (Horizontal) */}
                <div className="h-32 flex items-center justify-center pointer-events-auto">
                    <TapeMeasure
                        value={weight}
                        onChange={setWeight}
                        min={40}
                        max={160}
                        step={50}
                        orientation="horizontal"
                        unit="kg"
                        label="Weight"
                        showTickLabels={false}
                        labelPosition="bottom"
                    />
                </div>
            </div>

            <div className="mt-auto z-20">
                <Button onClick={onNext}>
                    Next
                </Button>
            </div>
        </div>
    );
}
