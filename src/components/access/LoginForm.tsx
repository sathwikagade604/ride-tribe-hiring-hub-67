
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginFormSchema, LoginFormValues } from '@/schemas/loginFormSchema';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';

interface LoginFormProps {
  onLogin: (data: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('employee');
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
      role: 'employee',
      subRole: '',
    },
  });

  const handleRoleChange = (role: RoleKey) => {
    setSelectedRole(role);
    form.setValue('role', role);
    form.setValue('subRole', ''); // Reset sub-role when role changes
  };

  const hasSubRoles = selectedRole && 
    roleAccessLevels[selectedRole] && 
    'subRoles' in roleAccessLevels[selectedRole];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Access Portal</CardTitle>
        <CardDescription>Log in with your credentials to access the company portal</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
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
                      {Object.entries(roleAccessLevels).map(([key, role]) => (
                        <FormItem key={key} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={key} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">{role.name}</FormLabel>
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
                        {Object.entries(roleAccessLevels[selectedRole].subRoles || {}).map(([key, subRole]) => (
                          <SelectItem key={key} value={key}>
                            {subRole.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button type="submit" className="w-full">Log In</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
