
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/components/ui/sonner';
import PageLayout from '@/layouts/PageLayout';
import { useAuth } from '@/hooks/useAuth';
import { emailSchema, checkRateLimit } from '@/utils/validation';
import { Shield, AlertTriangle } from 'lucide-react';

const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  userType: z.enum(['rider', 'driver']),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      userType: 'rider',
    },
  });

  // Redirect if already authenticated
  React.useEffect(() => {
    if (user && !loading) {
      console.log('User already authenticated, redirecting...');
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    const rateLimitKey = `login_${data.email}`;
    
    if (!checkRateLimit(rateLimitKey, 5, 900000)) {
      toast.error('Too many login attempts. Please try again in 15 minutes.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Attempting login for:', data.email);
      const { error } = await signIn(data.email, data.password);
      
      if (!error) {
        console.log('Login successful, redirecting...');
        
        // Small delay to ensure auth state is updated
        setTimeout(() => {
          if (data.userType === 'driver') {
            navigate('/driver-app');
          } else {
            navigate('/dashboard');
          }
        }, 500);
      } else {
        console.error('Login failed:', error);
      }
    } catch (error) {
      console.error('Login error:', error);
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
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your RideShare India account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="Your email address" 
                          autoComplete="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Your password" 
                          autoComplete="current-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Login as:</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="rider" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Rider - Book rides and travel
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="driver" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Driver - Drive and earn money
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-800">Important</p>
              </div>
              <p className="text-xs text-blue-700">
                Only registered users can log in. If you don't have an account, please sign up first.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Login;
