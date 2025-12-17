import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import prisma from '@/lib/prisma';

// 30 second timeout for DB operations
jest.setTimeout(30000);

beforeAll(async () => {
  // Ensure we can connect
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

// Helper to clean up database between tests
export const cleanDatabase = async () => {
  // Delete all users to start fresh
  const deleteUsers = prisma.user.deleteMany();
  await prisma.$transaction([deleteUsers]);
};
