interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-[var(--app-primary)]">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--app-primary)] transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
