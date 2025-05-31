
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Users, Car, Building, Eye, EyeOff } from 'lucide-react';
import { roleSignupSchema, roleLoginSchema, RoleSignupValues, RoleLoginValues } from '@/schemas/authSchemas';

interface PublicAuthFormProps {
  isSignup: boolean;
  onSignup: (data: RoleSignupValues) => Promise<void>;
  onLogin: (data: RoleLoginValues) => Promise<void>;
  onToggleMode: () => void;
  onCompanyAccess: () => void;
  isSubmitting: boolean;
}

const PublicAuthForm: React.FC<PublicAuthFormProps> = ({
  isSignup,
  onSignup,
  onLogin,
  onToggleMode,
  onCompanyAccess,
  isSubmitting
}) => {
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

  const watchRole = signupForm.watch('role');

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
              onClick={onToggleMode}
              className="text-sm"
            >
              {isSignup 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"}
            </Button>
            
            <div className="border-t pt-4">
              <Button
                variant="outline"
                onClick={onCompanyAccess}
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

export default PublicAuthForm;
