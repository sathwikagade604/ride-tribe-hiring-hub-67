
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type AppRole = 'admin' | 'driver' | 'rider';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: AppRole;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true, 
  requiredRole,
  redirectTo = '/login' 
}) => {
  const { user, loading, hasRole } = useAuth();
  const navigate = useNavigate();
  const [roleChecked, setRoleChecked] = React.useState(false);
  const [hasRequiredRole, setHasRequiredRole] = React.useState(false);

  useEffect(() => {
    if (loading) return;

    if (requireAuth && !user) {
      navigate(redirectTo);
      return;
    }

    if (requiredRole && user) {
      hasRole(requiredRole).then((result) => {
        setHasRequiredRole(result);
        setRoleChecked(true);
        
        if (!result) {
          navigate('/unauthorized');
        }
      });
    } else {
      setRoleChecked(true);
      setHasRequiredRole(true);
    }
  }, [user, loading, requireAuth, requiredRole, navigate, redirectTo, hasRole]);

  if (loading || (requiredRole && !roleChecked)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (requiredRole && !hasRequiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
