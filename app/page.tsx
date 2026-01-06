'use client'

import { useState, useEffect } from 'react'
import { Step1Name } from '@/components/Step1Name'
import { Step2Goals } from '@/components/Step2Goals'
import { Step3Motivation } from '@/components/Step3Motivation'
import { Step4Biometrics } from '@/components/Step4Biometrics'
import { Step5Metrics } from '@/components/Step5Metrics'
import { Step6Target } from '@/components/Step6Target'
import { StepRate } from '@/components/StepRate'
import { StepDietType } from '@/components/StepDietType'
import { StepCurrentFood } from '@/components/StepCurrentFood'
import { StepDailyRoutine } from '@/components/StepDailyRoutine'
import { StepHealth } from '@/components/StepHealth'
import { StepHabits } from '@/components/StepHabits'
import { Step7Activity } from '@/components/Step7Activity'
import { Step8Barriers } from '@/components/Step8Barriers'
import { Step9Pledge } from '@/components/Step9Pledge'
import { Step10Processing } from '@/components/Step10Processing'
import { StepWaiting } from '@/components/StepWaiting'
import { Dashboard } from '@/components/Dashboard'
import Login from '@/components/Login'
import { BackgroundAnimation } from '@/components/BackgroundAnimation'

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const [step, setStep] = useState(1)
    const [name, setName] = useState('')
    const [selectedGoals, setSelectedGoals] = useState<string[]>([])

    // Lifted State
    const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null)
    const [age, setAge] = useState<number>(25)
    const [height, setHeight] = useState(170)
    const [weight, setWeight] = useState(70)
    const [targetWeight, setTargetWeight] = useState(65)
    const [weeklyRate, setWeeklyRate] = useState<string>('')

    // NEW STATES
    const [dietType, setDietType] = useState<string>('')
    const [currentBreakfast, setCurrentBreakfast] = useState('')
    const [currentLunch, setCurrentLunch] = useState('')
    const [currentDinner, setCurrentDinner] = useState('')
    const [junkFood, setJunkFood] = useState(false)
    const [milkIntake, setMilkIntake] = useState(false)
    const [waterIntake, setWaterIntake] = useState(false) // true = good (>3L), false = bad (<2L) default false logic in component? 
    // Component logic: true = good drinking habits? The component logic I saw: !waterIntake ? 'border-orange-200' -> "I drink < 2L water". So if TRUE, it means BAD habit.
    // Let's align with component: "I drink < 2L water" check -> true means low water.
    const [wakeTime, setWakeTime] = useState('')
    const [workTime, setWorkTime] = useState('')
    const [sleepTime, setSleepTime] = useState('')
    const [healthIssues, setHealthIssues] = useState<string[]>([])
    const [allergies, setAllergies] = useState<string[]>([])

    const [habits, setHabits] = useState<string[]>([])
    const [activityLevel, setActivityLevel] = useState<string>('')
    const [barriers, setBarriers] = useState<string[]>([])
    const [pledgeDays, setPledgeDays] = useState(3)
    const [planData, setPlanData] = useState<any>(null)
    const [planReadyTime, setPlanReadyTime] = useState<number | null>(null)

    // Persistence Logic
    const STORAGE_KEY = 'ai-fitness-pal-state'
    const [isLoaded, setIsLoaded] = useState(false)

    // Load state on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setIsAuthenticated(parsed.isAuthenticated ?? false)
                setUserId(parsed.userId ?? null)
                setStep(parsed.step ?? 1)
                setName(parsed.name ?? '')
                setSelectedGoals(parsed.selectedGoals ?? [])
                setGender(parsed.gender ?? null)
                setAge(parsed.age ?? 25)
                setHeight(parsed.height ?? 170)
                setWeight(parsed.weight ?? 70)
                setTargetWeight(parsed.targetWeight ?? 65)
                setWeeklyRate(parsed.weeklyRate ?? '')

                // Load NEW STATES
                setDietType(parsed.dietType ?? '')
                setCurrentBreakfast(parsed.currentBreakfast ?? '')
                setCurrentLunch(parsed.currentLunch ?? '')
                setCurrentDinner(parsed.currentDinner ?? '')
                setJunkFood(parsed.junkFood ?? false)
                setMilkIntake(parsed.milkIntake ?? false)
                setWaterIntake(parsed.waterIntake ?? false)
                setWakeTime(parsed.wakeTime ?? '')
                setWorkTime(parsed.workTime ?? '')
                setSleepTime(parsed.sleepTime ?? '')
                setHealthIssues(parsed.healthIssues ?? [])
                setAllergies(parsed.allergies ?? [])

                setHabits(parsed.habits ?? [])
                setActivityLevel(parsed.activityLevel ?? '')
                setBarriers(parsed.barriers ?? [])
                setPledgeDays(parsed.pledgeDays ?? 3)
                setPlanData(parsed.planData ?? null)
                setPlanReadyTime(parsed.planReadyTime ?? null)
            } catch (e) {
                console.error("Failed to load state", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save state on change
    useEffect(() => {
        if (!isLoaded) return

        const stateToSave = {
            isAuthenticated,
            userId,
            step,
            name,
            selectedGoals,
            gender,
            age,
            height,
            weight,
            targetWeight,
            weeklyRate,
            // NEW STATES
            dietType,
            currentBreakfast,
            currentLunch,
            currentDinner,
            junkFood,
            milkIntake,
            waterIntake,
            wakeTime,
            workTime,
            sleepTime,
            healthIssues,
            allergies,

            habits,
            activityLevel,
            barriers,
            pledgeDays,
            planData,
            planReadyTime
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
    }, [
        isLoaded,
        isAuthenticated,
        userId,
        step,
        name,
        selectedGoals,
        gender,
        age,
        height,
        weight,
        targetWeight,
        weeklyRate,
        dietType,
        currentBreakfast,
        currentLunch,
        currentDinner,
        junkFood,
        milkIntake,
        waterIntake,
        wakeTime,
        workTime,
        sleepTime,
        healthIssues,
        allergies,
        habits,
        activityLevel,
        barriers,
        pledgeDays,
        planData,
        planReadyTime
    ])

    const handleNext = () => {
        setStep(prev => prev + 1)
    }

    const handleBack = () => {
        setStep(prev => Math.max(1, prev - 1))
    }

    const toggleGoal = (goal: string) => {
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(prev => prev.filter(g => g !== goal))
        } else {
            if (selectedGoals.length < 3) {
                setSelectedGoals(prev => [...prev, goal])
            }
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 text-[#192126] flex justify-center overflow-hidden font-sans relative">
            {step === 16 && <BackgroundAnimation />}
            <div className="w-full max-w-md h-screen relative bg-transparent sm:border-x sm:border-gray-200 shadow-2xl shadow-gray-200/50 z-10">
                {!isAuthenticated ? (
                    <Login onLoginSuccess={(token: string, uid: string) => {
                        console.log("Logged in with token:", token, "UID:", uid)
                        setIsAuthenticated(true)
                        setUserId(uid)
                    }} />
                ) : (
                    <>
                        {step === 1 && <Step1Name name={name} setName={setName} onNext={handleNext} onBack={handleBack} />}
                        {step === 2 && <Step2Goals name={name} selectedGoals={selectedGoals} toggleGoal={toggleGoal} onNext={handleNext} onBack={handleBack} />}
                        {step === 3 && <Step3Motivation selectedGoals={selectedGoals} onNext={handleNext} onBack={handleBack} />}
                        {step === 4 && <Step4Biometrics gender={gender} setGender={setGender} age={age} setAge={setAge} onNext={handleNext} onBack={handleBack} />}
                        {step === 5 && <Step5Metrics height={height} setHeight={setHeight} weight={weight} setWeight={setWeight} onNext={handleNext} onBack={handleBack} />}
                        {step === 6 && <Step6Target targetWeight={targetWeight} setTargetWeight={setTargetWeight} currentWeight={weight} onNext={handleNext} onBack={handleBack} />}
                        {step === 7 && <StepRate weeklyRate={weeklyRate} setWeeklyRate={setWeeklyRate} onNext={handleNext} onBack={handleBack} />}

                        {/* NEW STEPS */}
                        {step === 8 && (
                            <StepDietType
                                dietType={dietType}
                                setDietType={setDietType}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                        {step === 9 && (
                            <StepCurrentFood
                                currentBreakfast={currentBreakfast} setCurrentBreakfast={setCurrentBreakfast}
                                currentLunch={currentLunch} setCurrentLunch={setCurrentLunch}
                                currentDinner={currentDinner} setCurrentDinner={setCurrentDinner}
                                junkFood={junkFood} setJunkFood={setJunkFood}
                                milkIntake={milkIntake} setMilkIntake={setMilkIntake}
                                waterIntake={waterIntake} setWaterIntake={setWaterIntake}
                                onNext={handleNext} onBack={handleBack}
                            />
                        )}
                        {step === 10 && (
                            <StepDailyRoutine
                                wakeTime={wakeTime} setWakeTime={setWakeTime}
                                workTime={workTime} setWorkTime={setWorkTime}
                                sleepTime={sleepTime} setSleepTime={setSleepTime}
                                onNext={handleNext} onBack={handleBack}
                            />
                        )}
                        {step === 11 && (
                            <StepHealth
                                healthIssues={healthIssues} setHealthIssues={setHealthIssues}
                                allergies={allergies} setAllergies={setAllergies}
                                onNext={handleNext} onBack={handleBack}
                            />
                        )}

                        {step === 12 && <StepHabits habits={habits} setHabits={setHabits} onNext={handleNext} onBack={handleBack} />}
                        {step === 13 && <Step7Activity activityLevel={activityLevel} setActivityLevel={setActivityLevel} onNext={handleNext} onBack={handleBack} />}
                        {step === 14 && <Step8Barriers barriers={barriers} setBarriers={setBarriers} onNext={handleNext} onBack={handleBack} />}
                        {step === 15 && <Step9Pledge pledgeDays={pledgeDays} setPledgeDays={setPledgeDays} onNext={handleNext} onBack={handleBack} />}

                        {step === 16 && (
                            <Step10Processing
                                userData={{
                                    name, selectedGoals, gender: gender || 'other', age, height, weight, targetWeight, weeklyRate,
                                    dietType,
                                    wakeTime, workTime, sleepTime,
                                    currentBreakfast, currentLunch, currentDinner,
                                    junkFood, milkIntake, waterIntake,
                                    healthIssues, allergies,
                                    habits, activityLevel, barriers, pledgeDays, userId: userId || 'anonymous'
                                }}
                                setPlanData={setPlanData}
                                onNext={() => {
                                    // 5-10 minute delay
                                    const delay = (Math.floor(Math.random() * 6) + 5) * 60 * 1000;
                                    setPlanReadyTime(Date.now() + delay);
                                    setStep(17);
                                }}
                            />
                        )}
                        {step === 17 && <Dashboard name={name} planData={planData} planReadyTime={planReadyTime} />}
                    </>
                )}


                {/* Reset Debug Button */}
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to reset all progress?')) {
                            localStorage.removeItem(STORAGE_KEY)
                            window.location.reload()
                        }
                    }}
                    className="absolute bottom-2 right-2 text-xs text-gray-300 hover:text-red-400 opacity-50 hover:opacity-100 transition-opacity z-50"
                >
                    Reset Progress
                </button>
            </div>
        </div>
    )
}
