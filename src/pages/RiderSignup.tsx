
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import PageLayout from '@/layouts/PageLayout';
import { useAuth } from '@/hooks/useAuth';
import { sanitizeUserData } from '@/utils/validation';
import { Users } from 'lucide-react';
import RiderSignupForm, { RiderSignupValues } from '@/components/auth/RiderSignupForm';
import SignupLinks from '@/components/auth/SignupLinks';

const RiderSignup = () => {
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (data: RiderSignupValues) => {
    setIsSubmitting(true);
    
    try {
      const sanitizedData = sanitizeUserData({
        full_name: data.name,
        phone: data.phone,
        user_type: 'rider'
      });
      
      const { error } = await signUp(data.email, data.password, sanitizedData);
      
      if (!error) {
        setTimeout(() => {
          navigate('/rider-login');
        }, 2000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div>Loading...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Rider Sign Up</CardTitle>
            <CardDescription className="text-center">
              Join as a rider and start booking rides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RiderSignupForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            <SignupLinks />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default RiderSignup;
