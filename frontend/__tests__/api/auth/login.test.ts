/**
 * @jest-environment node
 */
import { POST } from '@/app/api/auth/login/route';
import prisma from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { DeepMockProxy } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';

jest.mock('@/lib/prisma');
const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;



import { NextRequest } from 'next/server';

// Mock bcrypt & jwt
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Login API', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'testsecret';
  });

  it('should return token for valid credentials', async () => {
    const body = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    const req = new NextRequest('http://localhost:3001/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const mockUser = {
      id: 'userId',
      name: 'Test User',
      email: body.email,
      password: 'hashedPassword',
      createdAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.message).toBe('Login successful.');
    expect(json.token).toBe('mockToken');
  });

  it('should return 401 for invalid credentials (user not found)', async () => {
    const body = {
      email: 'unknown@example.com',
      password: 'Password123!',
    };

    const req = new NextRequest('http://localhost:3001/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    prismaMock.user.findUnique.mockResolvedValue(null);

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('should return 401 for invalid credentials (wrong password)', async () => {
    const body = {
      email: 'test@example.com',
      password: 'WrongPassword!',
    };

    const req = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const mockUser = {
      id: 'userId',
      name: 'Test User',
      email: body.email,
      password: 'hashedPassword',
      createdAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const res = await POST(req);
    expect(res.status).toBe(401);
  });
});
