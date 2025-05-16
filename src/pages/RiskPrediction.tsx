
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clipboard, AlertCircle, Check } from "lucide-react";
import { HealthRiskLayout } from "@/components/layouts/health-risk-layout";

// Form schema for health risk data
const riskFormSchema = z.object({
  age: z.coerce.number().min(18, "Age must be at least 18").max(120, "Age must be less than 120"),
  bmi: z.coerce.number().min(10, "BMI must be at least 10").max(60, "BMI must be less than 60"),
  systolic_bp: z.coerce.number().min(70, "Blood pressure must be at least 70").max(250, "Blood pressure must be less than 250"),
  cholesterol: z.coerce.number().min(100, "Cholesterol must be at least 100").max(400, "Cholesterol must be less than 400"),
  sleep_hours: z.coerce.number().min(1, "Sleep hours must be at least 1").max(16, "Sleep hours must be less than 16"),
  daily_steps: z.coerce.number().min(0, "Steps cannot be negative").max(50000, "Steps must be less than 50,000"),
  calorie_intake: z.coerce.number().min(500, "Calorie intake must be at least 500").max(10000, "Calorie intake must be less than 10,000"),
  stress_level: z.coerce.number().min(0, "Stress level must be 0-10").max(10, "Stress level must be 0-10"),
  smoking_status: z.string(),
  alcohol_units: z.coerce.number().min(0, "Alcohol units cannot be negative").max(100, "Alcohol units must be less than 100"),
});

type RiskFormValues = z.infer<typeof riskFormSchema>;

const defaultValues: Partial<RiskFormValues> = {
  age: 35,
  bmi: 24.5,
  systolic_bp: 120,
  cholesterol: 180,
  sleep_hours: 7,
  daily_steps: 8000,
  calorie_intake: 2000,
  stress_level: 5,
  smoking_status: "non_smoker",
  alcohol_units: 2,
};

export default function RiskPrediction() {
  const [result, setResult] = useState<{ probability: number; label: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<RiskFormValues>({
    resolver: zodResolver(riskFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: RiskFormValues) => {
    setLoading(true);
    // For now, we'll use a mock prediction since we don't have the ML model yet
    try {
      // This would eventually be replaced with an actual API call to the ML model
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Mock response - will be replaced with actual model prediction
      const mockProbability = Math.random();
      const mockLabel = mockProbability > 0.5 ? "Yes" : "No";
      
      setResult({
        probability: parseFloat((mockProbability * 100).toFixed(2)),
        label: mockLabel
      });
      
      toast.success("Health assessment completed");
    } catch (error) {
      toast.error("Failed to process health data");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HealthRiskLayout>
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Health Risk Assessment</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Health Information</CardTitle>
            <CardDescription>
              Complete the form below to assess your health risk factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="35" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bmi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BMI (kg/m²)</FormLabel>
                        <FormControl>
                          <Input placeholder="24.5" type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormDescription>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-xs"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open("https://www.nhs.uk/live-well/healthy-weight/bmi-calculator/", "_blank");
                            }}
                          >
                            Calculate your BMI
                          </Button>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="systolic_bp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Systolic Blood Pressure (mmHg)</FormLabel>
                        <FormControl>
                          <Input placeholder="120" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cholesterol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Cholesterol (mg/dL)</FormLabel>
                        <FormControl>
                          <Input placeholder="180" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sleep_hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sleep Hours (per night)</FormLabel>
                        <FormControl>
                          <Input placeholder="7" type="number" step="0.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="daily_steps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Steps</FormLabel>
                        <FormControl>
                          <Input placeholder="8000" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="calorie_intake"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Calorie Intake</FormLabel>
                        <FormControl>
                          <Input placeholder="2000" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stress_level"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Stress Level (0-10)</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              min={0}
                              max={10}
                              step={1}
                              defaultValue={[value]}
                              onValueChange={(vals) => onChange(vals[0])}
                              aria-label="Stress Level"
                              {...field}
                            />
                            <div className="flex justify-between text-xs">
                              <span>Low 0</span>
                              <span>5</span>
                              <span>10 High</span>
                            </div>
                            <Input 
                              type="number" 
                              min={0} 
                              max={10} 
                              value={value} 
                              onChange={(e) => onChange(Number(e.target.value))} 
                              className="mt-2" 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="smoking_status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoking Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select smoking status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="non_smoker">Non-Smoker</SelectItem>
                            <SelectItem value="ex_smoker">Ex-Smoker</SelectItem>
                            <SelectItem value="light_smoker">Light Smoker (≤10/day)</SelectItem>
                            <SelectItem value="heavy_smoker">Heavy Smoker (&gt;10/day)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="alcohol_units"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alcohol Units (weekly)</FormLabel>
                        <FormControl>
                          <Input placeholder="2" type="number" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">
                          1 unit = 1 small glass of wine or half pint of beer
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Calculate Health Risk"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result && (
          <Card className="mt-8">
            <CardHeader className={result.label === "Yes" ? "bg-red-50" : "bg-green-50"}>
              <CardTitle className="flex items-center gap-2">
                {result.label === "Yes" ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                Risk Assessment Result
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Alert variant={result.label === "Yes" ? "destructive" : "default"} className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Risk Prediction: {result.label}</AlertTitle>
                <AlertDescription>
                  Based on the provided information, your health risk probability is {result.probability}%.
                </AlertDescription>
              </Alert>
              
              <div className="text-sm text-muted-foreground">
                {result.label === "Yes" ? (
                  <p>Consider consulting with a healthcare provider to discuss these risk factors and potential interventions.</p>
                ) : (
                  <p>Your current health parameters indicate a lower risk level. Keep maintaining your healthy habits!</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(result))} className="flex items-center gap-1">
                <Clipboard className="h-4 w-4" />
                Copy Results
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </HealthRiskLayout>
  );
}
