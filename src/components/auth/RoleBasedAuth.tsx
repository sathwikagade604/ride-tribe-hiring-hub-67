
import React, { useState } from 'react';
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
import { Shield, Users, Car, Building, Eye, EyeOff } from 'lucide-react';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const roleSignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['driver', 'rider'] as const),
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
  role: z.enum(['driver', 'rider'] as const),
});

const companyAccessSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  department: z.enum(['employee', 'support', 'service', 'chat', 'query', 'tracking', 'technical', 'safety', 'emergency', 'callcenter'] as const),
});

const companySignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  employeeId: z.string().min(3, 'Employee ID must be at least 3 characters'),
  department: z.enum(['employee', 'support', 'service', 'chat', 'query', 'tracking', 'technical', 'safety', 'emergency', 'callcenter'] as const),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RoleSignupValues = z.infer<typeof roleSignupSchema>;
type RoleLoginValues = z.infer<typeof roleLoginSchema>;
type CompanyAccessValues = z.infer<typeof companyAccessSchema>;
type CompanySignupValues = z.infer<typeof companySignupSchema>;

interface RoleBasedAuthProps {
  onSuccess: (role: string) => void;
}

const RoleBasedAuth: React.FC<RoleBasedAuthProps> = ({ onSuccess }) => {
  const { signUp, signIn, loading } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [isCompanyAccess, setIsCompanyAccess] = useState(false);
  const [isCompanySignup, setIsCompanySignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const companyForm = useForm<CompanyAccessValues>({
    resolver: zodResolver(companyAccessSchema),
    defaultValues: {
      email: '',
      password: '',
      department: 'employee',
    },
  });

  const companySignupForm = useForm<CompanySignupValues>({
    resolver: zodResolver(companySignupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      employeeId: '',
      department: 'employee',
    },
  });

  const watchRole = signupForm.watch('role');

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
        // Don't auto-login, require email verification first
      }
    } catch (error) {
      console.error('Signup error:', error);
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
      } else {
        toast.error('Invalid credentials or account not verified. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCompanyAccess = async (data: CompanyAccessValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (!error) {
        toast.success('Company access granted!');
        onSuccess(data.department);
      } else {
        toast.error('Invalid company credentials. Please check your email and password.');
      }
    } catch (error) {
      console.error('Company access error:', error);
      toast.error('Failed to access company portal. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCompanySignup = async (data: CompanySignupValues) => {
    setIsSubmitting(true);
    try {
      const userData = {
        full_name: data.fullName,
        employee_id: data.employeeId,
        department: data.department,
        user_type: 'employee',
      };

      const { error } = await signUp(data.email, data.password, userData);
      
      if (!error) {
        toast.success('Company account created successfully! Please check your email to verify your account.');
        setIsCompanySignup(false);
      }
    } catch (error) {
      console.error('Company signup error:', error);
      toast.error('Failed to create company account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
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

  // Company Signup Portal
  if (isCompanySignup) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Building className="h-8 w-8 mx-auto mb-4 text-primary" />
            <CardTitle>Company Account Registration</CardTitle>
            <CardDescription>
              Create your company account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...companySignupForm}>
              <form onSubmit={companySignupForm.handleSubmit(onCompanySignup)} className="space-y-4">
                <FormField
                  control={companySignupForm.control}
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
                  control={companySignupForm.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your employee ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={companySignupForm.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Department</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-2"
                        >
                          {Object.entries(roleAccessLevels).map(([key, deptData]) => {
                            const Icon = deptData.icon;
                            return (
                              <FormItem key={key} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={key} />
                                </FormControl>
                                <div className="flex items-center gap-2 flex-1">
                                  <Icon className="h-4 w-4" />
                                  <FormLabel className="font-medium text-sm">
                                    {deptData.name}
                                  </FormLabel>
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
                  control={companySignupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your company email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={companySignupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={companySignupForm.control}
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
                  {isSubmitting ? 'Creating Account...' : 'Create Company Account'}
                </Button>
              </form>
            </Form>

            <div className="text-center space-y-2">
              <Button
                variant="link"
                onClick={() => setIsCompanySignup(false)}
                className="text-sm"
              >
                Already have an account? Sign in
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  setIsCompanyAccess(false);
                  setIsCompanySignup(false);
                }}
                className="text-sm"
              >
                Back to Public Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Company Access Portal
  if (isCompanyAccess) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Building className="h-8 w-8 mx-auto mb-4 text-primary" />
            <CardTitle>Company Access Portal</CardTitle>
            <CardDescription>
              Login with your company credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...companyForm}>
              <form onSubmit={companyForm.handleSubmit(onCompanyAccess)} className="space-y-4">
                <FormField
                  control={companyForm.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Department</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-2"
                        >
                          {Object.entries(roleAccessLevels).map(([key, deptData]) => {
                            const Icon = deptData.icon;
                            return (
                              <FormItem key={key} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={key} />
                                </FormControl>
                                <div className="flex items-center gap-2 flex-1">
                                  <Icon className="h-4 w-4" />
                                  <FormLabel className="font-medium text-sm">
                                    {deptData.name}
                                  </FormLabel>
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
                  control={companyForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your company email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={companyForm.control}
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
                  {isSubmitting ? 'Accessing...' : 'Access Company Portal'}
                </Button>
              </form>
            </Form>

            <div className="text-center space-y-2">
              <Button
                variant="link"
                onClick={() => setIsCompanySignup(true)}
                className="text-sm"
              >
                Need a company account? Sign up
              </Button>
              <Button
                variant="link"
                onClick={() => setIsCompanyAccess(false)}
                className="text-sm"
              >
                Back to Public Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Public Access (Rider/Driver)
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <Shield className="h-8 w-8 mx-auto mb-4 text-primary" />
          <CardTitle>{isSignup ? 'Create Account' : 'Sign In'}</CardTitle>
          <CardDescription>
            {isSignup ? 'Choose your role and create an account' : 'Sign in to your account'}
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
                          {(['rider', 'driver'] as const).map((role) => {
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
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
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
                          {(['rider', 'driver'] as const).map((role) => {
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

          <div className="text-center space-y-2">
            <Button
              variant="link"
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm"
            >
              {isSignup 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"}
            </Button>
            
            <div className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCompanyAccess(true)}
                className="w-full"
              >
                <Building className="h-4 w-4 mr-2" />
                Company Access Portal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleBasedAuth;
