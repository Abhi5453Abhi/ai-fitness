import { useState } from 'react';
import { Step1Name } from './components/Step1Name';
import { Step2Goals } from './components/Step2Goals';
import { Step3Motivation } from './components/Step3Motivation';
import { Step4Biometrics } from './components/Step4Biometrics';
import { Step5Metrics } from './components/Step5Metrics';
import { Step6Target } from './components/Step6Target';
import { StepRate } from './components/StepRate';
import { StepHabits } from './components/StepHabits';
import { Step7Activity } from './components/Step7Activity';
import { Step8Barriers } from './components/Step8Barriers';
import { Step9Pledge } from './components/Step9Pledge';
import { Step10Processing } from './components/Step10Processing';
import { Dashboard } from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Lifted State
  const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [targetWeight, setTargetWeight] = useState(65);
  const [weeklyRate, setWeeklyRate] = useState<string>('');
  const [habits, setHabits] = useState<string[]>([]);
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [barriers, setBarriers] = useState<string[]>([]);
  const [pledgeDays, setPledgeDays] = useState(3);
  const [planData, setPlanData] = useState<any>(null);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(prev => prev.filter(g => g !== goal));
    } else {
      if (selectedGoals.length < 3) {
        setSelectedGoals(prev => [...prev, goal]);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#090E17] text-white flex justify-center overflow-hidden font-sans">
      <div className="w-full max-w-md h-screen relative bg-[#090E17] sm:border-x sm:border-gray-800">
        {!isAuthenticated ? (
          <Login onLoginSuccess={(token, uid) => {
            console.log("Logged in with token:", token, "UID:", uid);
            setIsAuthenticated(true);
            setUserId(uid);
          }} />
        ) : (
          <>
            {step === 1 && (
              <Step1Name
                name={name}
                setName={setName}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 2 && (
              <Step2Goals
                name={name}
                selectedGoals={selectedGoals}
                toggleGoal={toggleGoal}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 3 && (
              <Step3Motivation
                selectedGoals={selectedGoals}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 4 && (
              <Step4Biometrics
                gender={gender}
                setGender={setGender}
                age={age}
                setAge={setAge}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 5 && (
              <Step5Metrics
                height={height}
                setHeight={setHeight}
                weight={weight}
                setWeight={setWeight}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 6 && (
              <Step6Target
                targetWeight={targetWeight}
                setTargetWeight={setTargetWeight}
                currentWeight={weight}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 7 && (
              <StepRate
                weeklyRate={weeklyRate}
                setWeeklyRate={setWeeklyRate}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 8 && (
              <StepHabits
                habits={habits}
                setHabits={setHabits}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 9 && (
              <Step7Activity
                activityLevel={activityLevel}
                setActivityLevel={setActivityLevel}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 10 && (
              <Step8Barriers
                barriers={barriers}
                setBarriers={setBarriers}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 11 && (
              <Step9Pledge
                pledgeDays={pledgeDays}
                setPledgeDays={setPledgeDays}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 12 && (
              <Step10Processing
                userData={{
                  name,
                  selectedGoals,
                  gender: gender || 'other', // Fallback to avoid null
                  age,
                  height,
                  weight,
                  targetWeight,
                  weeklyRate, // New field
                  habits,     // New field
                  activityLevel,
                  barriers,
                  pledgeDays,
                  userId: userId || 'anonymous' // Pass userId
                }}
                setPlanData={setPlanData}
                onNext={() => setStep(13)}
              />
            )}
            {step === 13 && (
              <Dashboard planData={planData} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
