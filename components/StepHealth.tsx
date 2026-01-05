import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, ShieldAlert, Ban, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface StepHealthProps {
    healthIssues: string[];
    setHealthIssues: (h: string[]) => void;
    allergies: string[];
    setAllergies: (a: string[]) => void;
    onNext: () => void;
    onBack: () => void;
}

const HEALTH_ISSUES = [
    { key: "Diabetes", labelKey: "condition_diabetes" },
    { key: "Thyroid", labelKey: "condition_thyroid" },
    { key: "PCOS/PCOD", labelKey: "condition_pcos" },
    { key: "Cholesterol", labelKey: "condition_cholesterol" },
    { key: "Hypertension", labelKey: "condition_hypertension" },
    { key: "None", labelKey: "condition_none" }
];

const ALLERGIES = [
    { key: "Lactose", labelKey: "allergy_lactose" },
    { key: "Gluten", labelKey: "allergy_gluten" },
    { key: "Nuts", labelKey: "allergy_nuts" },
    { key: "Soy", labelKey: "allergy_soy" },
    { key: "Eggs", labelKey: "allergy_eggs" },
    { key: "None", labelKey: "allergy_none" }
];

export function StepHealth({
    healthIssues, setHealthIssues,
    allergies, setAllergies,
    onNext, onBack
}: StepHealthProps) {
    const { t } = useLanguage();

    const toggleHealth = (item: string) => {
        if (item === "None") {
            setHealthIssues(["None"]);
            return;
        }
        let newItems = healthIssues.filter(i => i !== "None");
        if (healthIssues.includes(item)) {
            newItems = newItems.filter(i => i !== item);
        } else {
            newItems = [...newItems, item];
        }
        setHealthIssues(newItems);
    }

    const toggleAllergy = (item: string) => {
        if (item === "None") {
            setAllergies(["None"]);
            return;
        }
        let newItems = allergies.filter(i => i !== "None");
        if (allergies.includes(item)) {
            newItems = newItems.filter(i => i !== item);
        } else {
            newItems = [...newItems, item];
        }
        setAllergies(newItems);
    }

    return (
        <div className="flex flex-col h-full p-6 bg-white text-[#192126]">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#192126]" />
                </button>
                <span className="mx-auto text-lg font-bold">{t.step_health_title}</span>
                <div className="w-10"></div>
            </div>

            {/* Progress Bar - Step 11 of 16 */}
            <div className="flex gap-1 mb-8">
                {[...Array(11)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                ))}
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto no-scrollbar"
            >
                {/* Health Issues */}
                <div className="mb-8">
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> {t.label_conditions}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {HEALTH_ISSUES.map(item => {
                            const isSelected = healthIssues.includes(item.key);
                            return (
                                <button
                                    key={item.key}
                                    onClick={() => toggleHealth(item.key)}
                                    className={`px-5 py-3 rounded-full font-bold text-sm border-2 transition-all flex items-center gap-2 ${isSelected
                                        ? 'bg-[#192126] border-[#192126] text-white shadow-lg'
                                        : 'bg-white border-gray-100 text-[#192126] hover:border-gray-300'
                                        }`}
                                >
                                    {t[item.labelKey]}
                                    {isSelected && <Check className="w-4 h-4 text-[#BBF246]" />}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Allergies */}
                <div className="mb-8">
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                        <Ban className="w-4 h-4" /> {t.label_allergies}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {ALLERGIES.map(item => {
                            const isSelected = allergies.includes(item.key);
                            return (
                                <button
                                    key={item.key}
                                    onClick={() => toggleAllergy(item.key)}
                                    className={`px-5 py-3 rounded-full font-bold text-sm border-2 transition-all flex items-center gap-2 ${isSelected
                                        ? 'bg-[#192126] border-[#192126] text-white shadow-lg'
                                        : 'bg-white border-gray-100 text-[#192126] hover:border-gray-300'
                                        }`}
                                >
                                    {t[item.labelKey]}
                                    {isSelected && <Check className="w-4 h-4 text-[#BBF246]" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </motion.div>

            <div className="mt-4 pt-6 border-t border-gray-100">
                <Button onClick={onNext}>{t.next}</Button>
            </div>
        </div>
    );
}
