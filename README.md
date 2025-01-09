# Node.js Backend with Express, TypeScript, and MongoDB

This repository provides a boilerplate setup for a Node.js backend application using Express, TypeScript, and MongoDB. Yarn is used as the package manager to simplify dependency management.

## Features

- **TypeScript** for type safety and modern JavaScript features
- **Express** for robust API development
- **MongoDB** for database management
- Structured project organization
- Ready-to-use user management functionality

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) instance or cloud database (e.g., MongoDB Atlas)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
```

### 4. Run the Development Server

```bash
yarn dev
```

This command starts the server on `http://localhost:5000` by default.

### 5. Build the Project for Production

```bash
yarn build
```

The transpiled code will be located in the `dist` directory.

### 6. Start the Production Server

```bash
yarn start
```

## Project Structure

```
project/
│
├── src/
│   ├── config/
│   │   └── db.ts         # Database connection
│   ├── controllers/
│   │   └── userController.ts # User-related request handlers
│   ├── models/
│   │   └── userModel.ts  # Mongoose schema for users
│   ├── routes/
│   │   └── userRoutes.ts # User API routes
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
│
├── dist/                # Output folder for transpiled code
├── package.json         # Project metadata and scripts
├── tsconfig.json        # TypeScript configuration
├── yarn.lock            # Dependency lock file
└── .env                 # Environment variables
```

## Core Files

### Database Connection (`src/config/db.ts`)

```typescript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
```

### User Model (`src/models/userModel.ts`)

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
```

### User Controller (`src/controllers/userController.ts`)

```typescript
import { Request, Response } from 'express';
import User from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
```

### User Routes (`src/routes/userRoutes.ts`)

```typescript
import express from 'express';
import { getUsers, createUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;
```

### Express App (`src/app.ts`)

```typescript
import express, { Application } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

export default app;
```

### Server Entry Point (`src/server.ts`)

```typescript
import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Scripts

Add the following scripts to `package.json`:

```json
"scripts": {
  "start": "node dist/server.js",
  "dev": "nodemon src/server.ts",
  "build": "tsc"
}
```

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

