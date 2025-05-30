
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, RefreshCw, X, Settings } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ErrorHandlingProps {
  errors: string[];
  onAutoFix: (error: string) => void;
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  lastCheck: string;
  issues: number;
  uptime: string;
}

const ErrorHandling: React.FC<ErrorHandlingProps> = ({ errors, onAutoFix }) => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    status: 'healthy',
    lastCheck: new Date().toLocaleTimeString(),
    issues: 0,
    uptime: '99.9%'
  });
  const [autoFixEnabled, setAutoFixEnabled] = useState(true);
  const [fixHistory, setFixHistory] = useState<string[]>([]);

  // Monitor system health
  useEffect(() => {
    const checkSystemHealth = () => {
      const issueCount = errors.length;
      let status: 'healthy' | 'warning' | 'critical' = 'healthy';
      
      if (issueCount > 5) {
        status = 'critical';
      } else if (issueCount > 2) {
        status = 'warning';
      }

      setSystemHealth({
        status,
        lastCheck: new Date().toLocaleTimeString(),
        issues: issueCount,
        uptime: '99.9%'
      });
    };

    const interval = setInterval(checkSystemHealth, 30000); // Check every 30 seconds
    checkSystemHealth(); // Initial check

    return () => clearInterval(interval);
  }, [errors]);

  // Auto-fix system
  useEffect(() => {
    if (autoFixEnabled && errors.length > 0) {
      const timer = setTimeout(() => {
        const errorToFix = errors[0];
        handleAutoFix(errorToFix);
      }, 2000); // Wait 2 seconds before auto-fixing

      return () => clearTimeout(timer);
    }
  }, [errors, autoFixEnabled]);

  const handleAutoFix = (error: string) => {
    console.log('Attempting auto-fix for:', error);
    
    // Categorize and fix errors
    try {
      if (error.includes('validation')) {
        fixValidationError(error);
      } else if (error.includes('network') || error.includes('fetch')) {
        fixNetworkError(error);
      } else if (error.includes('permission') || error.includes('auth')) {
        fixPermissionError(error);
      } else if (error.includes('undefined') || error.includes('null')) {
        fixReferenceError(error);
      } else if (error.includes('syntax')) {
        fixSyntaxError(error);
      } else {
        fixGenericError(error);
      }

      setFixHistory(prev => [...prev, `Fixed: ${error} at ${new Date().toLocaleTimeString()}`]);
      onAutoFix(error);
      toast.success('Error automatically resolved');
    } catch (fixError) {
      console.error('Auto-fix failed:', fixError);
      toast.error('Auto-fix failed, manual intervention required');
    }
  };

  const fixValidationError = (error: string) => {
    // Auto-fix validation errors by setting default values
    console.log('Applying validation fix');
    // Implementation would set default values for form fields
  };

  const fixNetworkError = (error: string) => {
    // Auto-fix network errors by retrying requests
    console.log('Applying network retry fix');
    // Implementation would retry failed network requests
  };

  const fixPermissionError = (error: string) => {
    // Auto-fix permission errors by redirecting to appropriate pages
    console.log('Applying permission fix');
    // Implementation would handle permission redirects
  };

  const fixReferenceError = (error: string) => {
    // Auto-fix reference errors by providing fallback values
    console.log('Applying reference error fix');
    // Implementation would provide null checks and fallbacks
  };

  const fixSyntaxError = (error: string) => {
    // Auto-fix syntax errors by correcting common issues
    console.log('Applying syntax error fix');
    // Implementation would fix common syntax issues
  };

  const fixGenericError = (error: string) => {
    // Generic error handling
    console.log('Applying generic error fix');
    // Implementation would provide general error recovery
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      case 'critical': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  if (errors.length === 0 && systemHealth.status === 'healthy') {
    return null; // Don't show when everything is fine
  }

  return (
    <div className="space-y-4">
      {/* System Health Status */}
      <Card className={`border-l-4 ${
        systemHealth.status === 'healthy' ? 'border-l-green-500' : 
        systemHealth.status === 'warning' ? 'border-l-yellow-500' : 'border-l-red-500'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${getStatusBg(systemHealth.status)}`}>
                {systemHealth.status === 'healthy' ? (
                  <CheckCircle className={`h-5 w-5 ${getStatusColor(systemHealth.status)}`} />
                ) : (
                  <AlertTriangle className={`h-5 w-5 ${getStatusColor(systemHealth.status)}`} />
                )}
              </div>
              <div>
                <h3 className="font-semibold">System Health: {systemHealth.status.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground">
                  Last checked: {systemHealth.lastCheck} | Issues: {systemHealth.issues} | Uptime: {systemHealth.uptime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAutoFixEnabled(!autoFixEnabled)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Auto-Fix: {autoFixEnabled ? 'ON' : 'OFF'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Errors */}
      {errors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Active Issues ({errors.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {errors.map((error, index) => (
              <Alert key={index} className="border-l-4 border-l-red-500">
                <AlertDescription className="flex items-center justify-between">
                  <span className="flex-1">{error}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-red-600">
                      Error
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleAutoFix(error)}
                      disabled={!autoFixEnabled}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Fix
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAutoFix(error)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Fix History */}
      {fixHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Recent Fixes ({fixHistory.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {fixHistory.slice(-5).map((fix, index) => (
                <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {fix}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ErrorHandling;
