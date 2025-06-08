import React from 'react';
import { cn } from '@/lib/utils'; // For conditional class names

interface Step {
  id: string;
  name: string;
  // status: 'completed' | 'current' | 'upcoming'; // Could be managed internally or passed
}

interface MultiStepProgressIndicatorProps {
  steps: Step[];
  currentStepIndex: number;
  onStepClick?: (stepIndex: number) => void; // Optional: allow clicking to navigate
}

const MultiStepProgressIndicator: React.FC<MultiStepProgressIndicatorProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
}) => {
  console.log("Rendering MultiStepProgressIndicator. Current step index:", currentStepIndex, "Total steps:", steps.length);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={cn("flex-1", stepIdx !== steps.length -1 ? "pr-2 sm:pr-4" : "")}>
            {currentStepIndex > stepIdx ? ( // Completed step
              <div className="group flex flex-col items-center w-full cursor-pointer" onClick={() => onStepClick?.(stepIdx)}>
                <span className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary">
                  <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="mt-1 text-xs sm:text-sm font-medium text-primary text-center">{step.name}</span>
                {/* Connector line for completed step */}
                {stepIdx !== steps.length - 1 && (
                    <div className="absolute top-1/2 left-full h-0.5 w-full -translate-y-1/2 bg-primary" aria-hidden="true" />
                )}
              </div>
            ) : currentStepIndex === stepIdx ? ( // Current step
              <div className="group flex flex-col items-center w-full" aria-current="step">
                <span className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border-2 border-primary bg-primary-foreground">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary" aria-hidden="true" />
                </span>
                <span className="mt-1 text-xs sm:text-sm font-medium text-primary text-center">{step.name}</span>
                {/* Connector line for current step (to next) */}
                 {stepIdx !== steps.length - 1 && (
                    <div className="absolute top-1/2 left-full h-0.5 w-full -translate-y-1/2 bg-border" aria-hidden="true" />
                )}
              </div>
            ) : ( // Upcoming step
              <div className="group flex flex-col items-center w-full cursor-default">
                <span className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border-2 border-border bg-background">
                  {/* Optional: could add a smaller dot or nothing */}
                </span>
                <span className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground text-center">{step.name}</span>
                 {/* Connector line for upcoming step */}
                 {stepIdx !== steps.length - 1 && (
                    <div className="absolute top-1/2 left-full h-0.5 w-full -translate-y-1/2 bg-border" aria-hidden="true" />
                )}
              </div>
            )}
            {/* Mobile connector - simplified or hidden */}
            {/* {stepIdx !== steps.length - 1 ? (
              <div className="h-0.5 w-full bg-gray-200 group-hover:bg-gray-300 md:ml-0 md:mr-0 md:mt-0 md:w-auto md:h-auto md:flex-1" />
            ) : null} */}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default MultiStepProgressIndicator;