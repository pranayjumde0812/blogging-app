import z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string({message: 'email required'})
    .email({message: 'Invalid Email'})
    .toLowerCase(),
  password: z
    .string()
    .min(8, {message: 'Password must be at least 8 characters long'}),
});

export type LoginInterface = z.infer<typeof LoginSchema>;
