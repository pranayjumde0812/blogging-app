import z from 'zod';

export const SignupAuthorSchema = z.object({
  namePrefix: z.enum(['Mr', 'Mrs', 'Miss'], {
    message: 'Name prefix must be one of: Mr, Mrs, Miss',
  }),
  firstName: z.string({message: 'Firstname is required'}),
  lastName: z.string({message: 'Lastname is required'}),
  email: z
    .string({message: 'email required'})
    .email({message: 'Invalid Email'})
    .toLowerCase(),
  password: z
    .string()
    .min(8, {message: 'Password must be at least 8 characters long'}),
});

export type SignupAuthorInterface = z.infer<typeof SignupAuthorSchema>;

export const UpdateAuthorSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().email().optional(),
});

export type UpdateAuthorInterface = z.infer<typeof UpdateAuthorSchema>;