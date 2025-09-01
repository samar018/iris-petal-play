import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Database, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface ModelInfoData {
  model_type: string;
  classes: string[];
}

interface ModelInfoProps {
  apiUrl?: string;
}

const ModelInfo = ({ apiUrl = 'http://localhost:8000' }: ModelInfoProps) => {
  const [modelInfo, setModelInfo] = useState<ModelInfoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        const response = await axios.get<ModelInfoData>(`${apiUrl}/info`);
        setModelInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch model info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModelInfo();
  }, [apiUrl]);

  if (isLoading) {
    return (
      <Card className="iris-card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  if (!modelInfo) {
    return null;
  }

  return (
    <Card className="iris-card p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Brain className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-display font-semibold text-foreground">
            Model Information
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-2">
              <Database className="h-4 w-4" />
              Model Type
            </span>
            <span className="font-medium text-foreground">
              {modelInfo.model_type}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Available Classes
            </span>
            <div className="grid grid-cols-1 gap-2">
              {modelInfo.classes.map((className, index) => (
                <div
                  key={className}
                  className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2"
                >
                  <span className="capitalize font-medium text-secondary-foreground">
                    Iris {className}
                  </span>
                  <span className="text-lg">
                    {className === 'setosa' ? '🌸' : className === 'versicolor' ? '🌿' : '🌺'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModelInfo;