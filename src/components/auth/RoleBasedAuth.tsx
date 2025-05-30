
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/components/ui/sonner';
import { Shield, Users, Car, Building } from 'lucide-react';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const roleSignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['admin', 'driver', 'rider'] as const),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  licenseNumber: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const roleLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['admin', 'driver', 'rider'] as const),
});

type RoleSignupValues = z.infer<typeof roleSignupSchema>;
type RoleLoginValues = z.infer<typeof roleLoginSchema>;

interface RoleBasedAuthProps {
  onSuccess: (role: string) => void;
}

const RoleBasedAuth: React.FC<RoleBasedAuthProps> = ({ onSuccess }) => {
  const { signUp, signIn, loading } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signupForm = useForm<RoleSignupValues>({
    resolver: zodResolver(roleSignupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: 'rider',
      fullName: '',
      phone: '',
      licenseNumber: '',
    },
  });

  const loginForm = useForm<RoleLoginValues>({
    resolver: zodResolver(roleLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'rider',
    },
  });

  const watchRole = signupForm.watch('role');
  const watchLoginRole = loginForm.watch('role');

  const onSignup = async (data: RoleSignupValues) => {
    setIsSubmitting(true);
    try {
      const userData = {
        full_name: data.fullName,
        phone: data.phone,
        user_type: data.role,
        license_number: data.role === 'driver' ? data.licenseNumber : undefined,
      };

      const { error } = await signUp(data.email, data.password, userData);
      
      if (!error) {
        toast.success('Account created successfully! Please check your email to verify your account.');
        setIsSignup(false);
      }
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onLogin = async (data: RoleLoginValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (!error) {
        toast.success('Login successful!');
        onSuccess(data.role);
      }
    } catch (error) {
      toast.error('Failed to login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Building;
      case 'driver':
        return Car;
      case 'rider':
        return Users;
      default:
        return Shield;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Access administrative functions and company management';
      case 'driver':
        return 'Access driver dashboard and trip management';
      case 'rider':
        return 'Book rides and manage your trips';
      default:
        return 'Select your role to continue';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <Shield className="h-8 w-8 mx-auto mb-4 text-primary" />
          <CardTitle>{isSignup ? 'Create Account' : 'Sign In'}</CardTitle>
          <CardDescription>
            {isSignup ? 'Choose your role and create an account' : 'Sign in to your role-based account'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isSignup ? (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Your Role</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-3"
                        >
                          {(['rider', 'driver', 'admin'] as const).map((role) => {
                            const Icon = getRoleIcon(role);
                            return (
                              <FormItem key={role} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={role} />
                                </FormControl>
                                <div className="flex items-center gap-3 flex-1">
                                  <Icon className="h-5 w-5" />
                                  <div>
                                    <FormLabel className="font-medium capitalize">
                                      {role}
                                    </FormLabel>
                                    <p className="text-xs text-muted-foreground">
                                      {getRoleDescription(role)}
                                    </p>
                                  </div>
                                </div>
                              </FormItem>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchRole === 'driver' && (
                  <FormField
                    control={signupForm.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your license number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Your Role</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-3"
                        >
                          {(['rider', 'driver', 'admin'] as const).map((role) => {
                            const Icon = getRoleIcon(role);
                            return (
                              <FormItem key={role} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={role} />
                                </FormControl>
                                <div className="flex items-center gap-3 flex-1">
                                  <Icon className="h-5 w-5" />
                                  <div>
                                    <FormLabel className="font-medium capitalize">
                                      {role}
                                    </FormLabel>
                                  </div>
                                </div>
                              </FormItem>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </Form>
          )}

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm"
            >
              {isSignup 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleBasedAuth;
