/**
 * @jest-environment node
 */
import { POST } from '@/app/api/auth/signup/route';
import prisma from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { DeepMockProxy } from 'jest-mock-extended';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma');
const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;




// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('Signup API', () => {
  it('should create a new user with valid data', async () => {
    const body = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
    };

    const req = new NextRequest('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    prismaMock.user.findUnique.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    prismaMock.user.create.mockResolvedValue({
      id: 'userId',
      name: body.name,
      email: body.email,
      password: 'hashedPassword',
      createdAt: new Date(),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.message).toBe('User created successfully.');
    expect(json.user).toEqual({
      id: 'userId',
      name: body.name,
      email: body.email,
      createdAt: expect.any(String),
    });
  });

  it('should return 400 for invalid input', async () => {
    const body = {
      name: 'T', // Too short
      email: 'invalid-email',
      password: '123',
    };

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.errors).toHaveProperty('name');
    expect(json.errors).toHaveProperty('email');
    expect(json.errors).toHaveProperty('password');
  });

  it('should return 409 if user already exists', async () => {
    const body = {
      name: 'Test User',
      email: 'existing@example.com',
      password: 'Password123!',
    };

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    prismaMock.user.findUnique.mockResolvedValue({
      id: 'existingId',
      name: 'Existing User',
      email: body.email,
      password: 'hashedPassword',
      createdAt: new Date(),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(409);
    expect(json.message).toBe('User with this email already exists.');
  });
});
