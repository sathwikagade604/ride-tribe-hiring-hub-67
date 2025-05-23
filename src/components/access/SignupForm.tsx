
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupFormSchema, SignupFormValues } from '@/schemas/signupFormSchema';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';

interface SignupFormProps {
  onSignup: (data: SignupFormValues) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('employee');
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'employee',
      subRole: '',
    },
  });

  const handleRoleChange = (role: RoleKey) => {
    setSelectedRole(role);
    form.setValue('role', role);
    form.setValue('subRole', ''); // Reset sub-role when role changes
  };

  const roleData = roleAccessLevels[selectedRole];
  const hasSubRoles = roleData && roleData.subRoles && Object.keys(roleData.subRoles).length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Access Registration</CardTitle>
        <CardDescription>Create your company portal account with role-based access</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSignup)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose a username" {...field} />
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
                    <Input type="email" placeholder="Enter your email address" {...field} />
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
                    <Input type="password" placeholder="Create a password" {...field} />
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Access Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => handleRoleChange(value as RoleKey)}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      {Object.entries(roleAccessLevels).map(([key, roleData]) => (
                        <FormItem key={key} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={key} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">{roleData.name}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {hasSubRoles && (
              <FormField
                control={form.control}
                name="subRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Team/Specialization</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(roleData.subRoles || {}).map(([key, subRoleData]) => (
                          <SelectItem key={key} value={key}>
                            {subRoleData.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
