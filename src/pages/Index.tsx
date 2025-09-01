import HeroSection from '@/components/HeroSection';
import PredictionForm from '@/components/PredictionForm';
import ModelInfo from '@/components/ModelInfo';

const Index = () => {
  // You can customize this URL to match your FastAPI server
  const apiUrl = 'http://localhost:8000';

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <HeroSection apiUrl={apiUrl} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PredictionForm apiUrl={apiUrl} />
          </div>
          
          <div className="lg:col-span-1">
            <ModelInfo apiUrl={apiUrl} />
          </div>
        </div>
        
        <footer className="text-center text-muted-foreground text-sm mt-12 space-y-2">
          <p>
            Built with ❤️ using React, TypeScript & Tailwind CSS
          </p>
          <p className="text-xs">
            Connect your FastAPI server to {apiUrl} to start making predictions
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
