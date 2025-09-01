import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Loader2, Flower2 } from 'lucide-react';
import axios from 'axios';

interface IrisInput {
  sepal_length: number;
  sepal_width: number;  
  petal_length: number;
  petal_width: number;
}

interface PredictionResult {
  predicted_class: string;
}

interface PredictionFormProps {
  apiUrl?: string;
}

const PredictionForm = ({ apiUrl = 'http://localhost:8000' }: PredictionFormProps) => {
  const [formData, setFormData] = useState<IrisInput>({
    sepal_length: 5.1,
    sepal_width: 3.5,
    petal_length: 1.4,
    petal_width: 0.2
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof IrisInput, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const getFlowerIcon = (species: string) => {
    switch (species.toLowerCase()) {
      case 'setosa': return '🌸';
      case 'versicolor': return '🌿';
      case 'virginica': return '🌺';
      default: return '🌼';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post<PredictionResult>(`${apiUrl}/predict`, formData);
      setPrediction(response.data);
    } catch (err) {
      setError('Failed to get prediction. Please check if the API is running.');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="iris-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <Flower2 className="h-8 w-8 text-primary mx-auto mb-2" />
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Iris Species Predictor
            </h2>
            <p className="text-muted-foreground">
              Enter the measurements to predict the iris species
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'sepal_length', label: 'Sepal Length (cm)', placeholder: '5.1' },
              { key: 'sepal_width', label: 'Sepal Width (cm)', placeholder: '3.5' },
              { key: 'petal_length', label: 'Petal Length (cm)', placeholder: '1.4' },
              { key: 'petal_width', label: 'Petal Width (cm)', placeholder: '0.2' }
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="text-sm font-medium text-foreground">
                  {label}
                </Label>
                <Input
                  id={key}
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  placeholder={placeholder}
                  value={formData[key as keyof IrisInput]}
                  onChange={(e) => handleInputChange(key as keyof IrisInput, e.target.value)}
                  className="iris-input"
                  required
                />
              </div>
            ))}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="iris-button-predict w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Predicting...
              </>
            ) : (
              <>
                <Flower2 className="h-5 w-5 mr-2" />
                Predict Species
              </>
            )}
          </Button>
        </form>
      </Card>

      {error && (
        <Card className="iris-card p-4 border-destructive bg-destructive/5">
          <div className="text-destructive text-center">
            <p className="font-medium">Prediction Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </Card>
      )}

      {prediction && (
        <Card className="prediction-result">
          <div className="flower-icon">
            {getFlowerIcon(prediction.predicted_class)}
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">
            Predicted Species
          </h3>
          <p className="text-2xl font-display font-bold text-primary capitalize">
            Iris {prediction.predicted_class}
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Based on the measurements you provided
          </p>
        </Card>
      )}
    </div>
  );
};

export default PredictionForm;