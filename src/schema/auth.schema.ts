import z from 'zod';
import {refreshToken} from '../controller/auth.controller';

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

export const RefreshTokenSchema = z.object({
  refreshToken: z.string({message: 'Refresh token required'}),
});

export type ResfreshTokenInterface = z.infer<typeof RefreshTokenSchema>;
