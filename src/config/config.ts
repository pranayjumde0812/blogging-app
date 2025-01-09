import 'dotenv/config';
import {z} from 'zod';

const ENUM_NODE_ENVS = z.enum(['production', 'development', 'staging']);

const envVarsSchema = z.object({
  NODE_ENV: ENUM_NODE_ENVS,
  PORT: z.coerce.number().default(3000),
  MONGODB_URL: z.string(),
});

export const env = envVarsSchema.parse(process.env);
