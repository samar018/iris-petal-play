import { useState, useEffect } from 'react';
import axios from 'axios';

interface HealthIndicatorProps {
  apiUrl?: string;
}

const HealthIndicator = ({ apiUrl = 'http://localhost:8000' }: HealthIndicatorProps) => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkHealth = async () => {
    setIsChecking(true);
    try {
      await axios.get(`${apiUrl}/health`, { timeout: 5000 });
      setIsHealthy(true);
    } catch (error) {
      setIsHealthy(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [apiUrl]);

  const getStatusColor = () => {
    if (isChecking || isHealthy === null) return 'bg-muted animate-pulse';
    return isHealthy ? 'health-online' : 'health-offline';
  };

  const getStatusText = () => {
    if (isChecking) return 'Checking...';
    if (isHealthy === null) return 'Unknown';
    return isHealthy ? 'API Online' : 'API Offline';
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className={`health-indicator ${getStatusColor()}`} />
      <span>{getStatusText()}</span>
    </div>
  );
};

export default HealthIndicator;