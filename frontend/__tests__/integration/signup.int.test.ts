/**
 * @jest-environment node
 */
import { POST } from '@/app/api/auth/signup/route';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { cleanDatabase } from './setup';

describe('Integration: Signup API', () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it('should create a new user and return 201', async () => {
    const body = {
      name: 'Integration User',
      email: 'integration@example.com',
      password: 'StrongPassword123!',
    };

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    expect(response.status).toBe(201);

    const data = await response.json();
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe(body.email);

    // Verify database
    const dbUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    expect(dbUser).toBeDefined();
    expect(dbUser?.name).toBe(body.name);
  });

  it('should return 400 if email already exists', async () => {
    const body = {
      name: 'Duplicate User',
      email: 'duplicate@example.com',
      password: 'StrongPassword123!',
    };

    // Create first user directly in DB
    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: 'hashedpassword', // Doesn't matter for this test
      },
    });

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    expect(response.status).toBe(409);
    
    const data = await response.json();
    expect(data.message).toMatch(/already exists/i);
  });
});
