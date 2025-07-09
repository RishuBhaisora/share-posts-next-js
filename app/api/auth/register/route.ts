// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { username, password, name } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Username and password are required' 
        },
        { status: 400 }
      )
    }

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Username already exists' 
        },
        { status: 400 }
      )
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        username,
        password, // Plain text password
        name: name || username,
      },
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
      },
    })

    // Set session cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Registration successful',
      user 
    })
    
    response.cookies.set('user-id', user.id, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    return response

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Registration failed' 
      },
      { status: 500 }
    )
  }
}