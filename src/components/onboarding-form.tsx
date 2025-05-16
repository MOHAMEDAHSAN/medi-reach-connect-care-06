
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface OnboardingFormProps {
  onComplete: (userData: {
    name: string;
    age: number;
    gender: string;
    city: string;
    language: string;
  }) => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
    language: "english"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenderChange = (value: string) => {
    setFormData({
      ...formData,
      gender: value
    });
  };

  const handleLanguageChange = (value: string) => {
    setFormData({
      ...formData,
      language: value
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {
    onComplete({
      ...formData,
      age: parseInt(formData.age)
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="mb-8 flex justify-center">
        <div className="w-full max-w-xs">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-apple-blue transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-center text-gray-500">
            Step {step} of 3
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Tell us about yourself</h2>
            <p className="text-gray-500 mt-2">Let's start with the basics</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="rounded-xl h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleInputChange}
                className="rounded-xl h-12"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleNext}
            className="w-full h-12 rounded-xl bg-apple-blue hover:bg-apple-blue/90"
            disabled={!formData.name || !formData.age}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">More about you</h2>
            <p className="text-gray-500 mt-2">This helps us personalize your experience</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={formData.gender} onValueChange={handleGenderChange} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="flex-grow">Male</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="flex-grow">Female</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="flex-grow">Other</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange}
                className="rounded-xl h-12"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleNext}
            className="w-full h-12 rounded-xl bg-apple-blue hover:bg-apple-blue/90"
            disabled={!formData.gender || !formData.city}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Almost done</h2>
            <p className="text-gray-500 mt-2">Choose your preferences</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={formData.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                  <SelectItem value="bengali">Bengali</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl bg-apple-blue hover:bg-apple-blue/90"
          >
            Complete Setup
          </Button>
        </div>
      )}
    </div>
  );
}
