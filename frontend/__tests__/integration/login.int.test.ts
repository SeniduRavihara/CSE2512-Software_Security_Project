/**
 * @jest-environment node
 */
import { POST } from '@/app/api/auth/login/route';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { cleanDatabase } from './setup';

describe('Integration: Login API', () => {
  const testUser = {
    name: 'Login User',
    email: 'login@example.com',
    password: 'StrongPassword123!',
  };

  beforeEach(async () => {
    await cleanDatabase();
    // Create user for login testing
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await prisma.user.create({
      data: {
        name: testUser.name,
        email: testUser.email,
        password: hashedPassword,
      },
    });
  });

  it('should return 200 and set cookie on valid credentials', async () => {
    const body = {
      email: testUser.email,
      password: testUser.password,
    };

    const req = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.message).toBe('Login successful.');

    // Check for token in body
    expect(data.token).toBeDefined();
  });

  it('should return 401 on invalid password', async () => {
    const body = {
      email: testUser.email,
      password: 'WrongPassword',
    };

    const req = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data.message).toBe('Invalid credentials.');
  });

  it('should return 401 on non-existent user', async () => {
    const body = {
      email: 'nonexistent@example.com',
      password: 'AnyPassword',
    };

    const req = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
  });
});
