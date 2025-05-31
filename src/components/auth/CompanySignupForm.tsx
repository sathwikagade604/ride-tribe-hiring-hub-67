
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Building } from 'lucide-react';
import { roleAccessLevels } from '@/constants/roleAccessLevels';
import { companySignupSchema, CompanySignupValues } from '@/schemas/authSchemas';

interface CompanySignupFormProps {
  onSignup: (data: CompanySignupValues) => Promise<void>;
  onBackToLogin: () => void;
  onBackToPublic: () => void;
  isSubmitting: boolean;
}

const CompanySignupForm: React.FC<CompanySignupFormProps> = ({
  onSignup,
  onBackToLogin,
  onBackToPublic,
  isSubmitting
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<CompanySignupValues>({
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignup)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field}
                        autoComplete="name"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your employee ID" 
                        {...field}
                        autoComplete="username"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Department *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="space-y-2"
                        disabled={isSubmitting}
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
                                <FormLabel className="font-medium text-sm cursor-pointer">
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
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Email *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your company email" 
                        {...field}
                        autoComplete="email"
                        disabled={isSubmitting}
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
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Create a password" 
                          {...field}
                          autoComplete="new-password"
                          disabled={isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isSubmitting}
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
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Confirm your password" 
                        {...field}
                        autoComplete="new-password"
                        disabled={isSubmitting}
                      />
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
              onClick={onBackToLogin}
              className="text-sm"
              disabled={isSubmitting}
            >
              Already have an account? Sign in
            </Button>
            <Button
              variant="link"
              onClick={onBackToPublic}
              className="text-sm"
              disabled={isSubmitting}
            >
              Back to Public Access
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySignupForm;
