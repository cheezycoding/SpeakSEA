import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeProps {
  disabled: boolean;
  startButtonText: string;
  onStartCall: () => void;
}

export const Welcome = ({
  disabled,
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeProps) => {
  return (
    <section
      ref={ref}
      inert={disabled}
      className={cn(
        'bg-background fixed inset-0 mx-auto flex h-svh flex-col items-center justify-center text-center',
        disabled ? 'z-10' : 'z-20'
      )}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4 size-16"
        style={{ color: 'white' }}
      >
        {/* Teacher Avatar - Head */}
        <circle
          cx="32"
          cy="24"
          r="12"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Teacher Avatar - Body */}
        <path
          d="M20 48C20 40 24 36 32 36C40 36 44 40 44 48V52H20V48Z"
          fill="currentColor"
        />
        {/* Teacher Avatar - Glasses */}
        <circle
          cx="28"
          cy="24"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="36"
          cy="24"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M31 24L33 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Teacher Avatar - Smile */}
        <path
          d="M28 30C28 30 30 32 32 32C34 32 36 30 36 30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Teacher Avatar - Hair bun */}
        <circle
          cx="32"
          cy="16"
          r="2"
          fill="currentColor"
        />
        {/* Teacher Avatar - Book */}
        <rect
          x="46"
          y="40"
          width="8"
          height="12"
          rx="1"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M48 42L52 42M48 44L54 44M48 46L52 46"
          stroke="var(--lk-bg-secondary)"
          strokeWidth="0.5"
        />
      </svg>

      <p 
        className="max-w-prose pt-1 leading-6 font-medium"
        style={{ color: 'white' }}
      >
        Chat Live with Ms Chan, your AI PSLE Oral Examiner
      </p>
      <Button 
        variant="primary" 
        size="lg" 
        onClick={onStartCall} 
        className="mt-6 w-64 font-mono"
        style={{
          border: '2px dashed rgba(255, 255, 255, 0.3)'
        }}
      >
        {startButtonText}
      </Button>
    </section>
  );
};
