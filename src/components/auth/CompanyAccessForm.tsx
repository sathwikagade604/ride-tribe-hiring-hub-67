
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building } from 'lucide-react';
import { roleAccessLevels } from '@/constants/roleAccessLevels';
import { companyAccessSchema, CompanyAccessValues } from '@/schemas/authSchemas';

interface CompanyAccessFormProps {
  onLogin: (data: CompanyAccessValues) => Promise<void>;
  onSignup: () => void;
  onBackToPublic: () => void;
  isSubmitting: boolean;
}

const CompanyAccessForm: React.FC<CompanyAccessFormProps> = ({
  onLogin,
  onSignup,
  onBackToPublic,
  isSubmitting
}) => {
  const form = useForm<CompanyAccessValues>({
    resolver: zodResolver(companyAccessSchema),
    defaultValues: {
      email: '',
      password: '',
      department: 'employee',
    },
  });

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Department *</FormLabel>
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
                control={form.control}
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
                control={form.control}
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
              onClick={onSignup}
              className="text-sm"
            >
              Need a company account? Sign up
            </Button>
            <Button
              variant="link"
              onClick={onBackToPublic}
              className="text-sm"
            >
              Back to Public Access
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyAccessForm;
