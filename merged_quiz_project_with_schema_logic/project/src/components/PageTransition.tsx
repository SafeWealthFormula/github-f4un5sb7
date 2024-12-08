import { LoadingSpinner } from './ui/LoadingSpinner';

interface PageTransitionProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export function PageTransition({ children, isLoading }: PageTransitionProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}