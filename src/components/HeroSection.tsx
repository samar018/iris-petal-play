import { Flower } from 'lucide-react';
import HealthIndicator from './HealthIndicator';

interface HeroSectionProps {
  apiUrl?: string;
}

const HeroSection = ({ apiUrl = 'http://localhost:8000' }: HeroSectionProps) => {
  return (
    <div className="text-center space-y-6 mb-8">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150"></div>
        <div className="relative iris-card p-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Flower className="h-16 w-16 text-primary animate-pulse-glow" />
              <div className="absolute -top-1 -right-1">
                <div className="h-4 w-4 bg-primary-glow rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Iris Classifier
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            AI-powered species identification using FastAPI and machine learning. 
            Enter flower measurements to predict which iris species you've found.
          </p>
          
          <div className="flex justify-center">
            <HealthIndicator apiUrl={apiUrl} />
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        Built with FastAPI • Powered by RandomForestClassifier
      </div>
    </div>
  );
};

export default HeroSection;