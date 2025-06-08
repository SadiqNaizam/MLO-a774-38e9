import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MultiStepProgressIndicator from './MultiStepProgressIndicator'; // Import the progress indicator
import { useToast } from '@/components/ui/use-toast'; // Assuming useToast is in ui folder
// import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface FormStep {
  id: string;
  name: string;
  component: ReactNode; // The actual form content for this step
  // Optional: validation function for this step
  // validate?: () => Promise<boolean> | boolean;
}

interface GuidedMultiStepFormProps {
  steps: FormStep[];
  formTitle: string;
  onFormSubmit: (formData: any) => Promise<void> | void; // Receives aggregated data from all steps
  // initialData?: any; // To pre-fill form
}

const GuidedMultiStepForm: React.FC<GuidedMultiStepFormProps> = ({ steps, formTitle, onFormSubmit }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<any>({}); // Aggregate form data
  const { toast } = useToast();

  console.log("Rendering GuidedMultiStepForm. Current step:", steps[currentStepIndex]?.name, "Data:", formData);

  const CurrentStepComponent = steps[currentStepIndex]?.component;

  const handleNext = async () => {
    console.log("Next button clicked on step:", currentStepIndex);
    // Optional: Add validation logic here if step.validate exists
    // const isValid = await steps[currentStepIndex].validate?.();
    // if (isValid === false) return;

    // For simplicity, we assume step components manage their own state and pass it up via a context or prop
    // Or, the GuidedMultiStepForm could pass down `formData` and `setFormData` to each step component
    // This example implies each step handles its data internally and it's collected at the end.
    // A more robust solution might involve a shared form context (e.g., react-hook-form's FormProvider)

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    console.log("Previous button clicked on step:", currentStepIndex);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked. Aggregated form data:", formData);
    // Optional: final validation
    try {
      await onFormSubmit(formData);
      toast({
        title: "Form Submitted!",
        description: "Your information has been processed successfully.",
        variant: "default", // "default" often has a green/success style in shadcn
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    }
  };

  // This is a placeholder for how individual steps might update shared state
  // In a real app, you'd use React Context, Zustand, or pass callbacks.
  const updateStepData = (stepId: string, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [stepId]: data,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center mb-4">{formTitle}</CardTitle>
        <MultiStepProgressIndicator
          steps={steps.map(s => ({ id: s.id, name: s.name }))}
          currentStepIndex={currentStepIndex}
          // onStepClick={(index) => setCurrentStepIndex(index)} // Allow clicking on progress (optional)
        />
      </CardHeader>
      <CardContent className="min-h-[200px] py-6">
        {/* Render the current step's component.
            You might need to pass props like `formData`, `updateStepData` to CurrentStepComponent.
            Example: React.cloneElement(CurrentStepComponent as React.ReactElement, { updateStepData, stepData: formData[steps[currentStepIndex].id] })
        */}
        {CurrentStepComponent ? CurrentStepComponent : <p>Step content not found.</p>}
      </CardContent>
      <CardFooter className="flex justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          {/* <ChevronLeft className="mr-2 h-4 w-4" /> */}
          Previous
        </Button>
        {currentStepIndex < steps.length - 1 ? (
          <Button onClick={handleNext}>
            Next
            {/* <ChevronRight className="ml-2 h-4 w-4" /> */}
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            {/* <Check className="mr-2 h-4 w-4" /> */}
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GuidedMultiStepForm;