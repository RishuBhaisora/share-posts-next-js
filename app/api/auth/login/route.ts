import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

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

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid username or password' 
        },
        { status: 401 }
      )
    }

    // Check password (plain text comparison)
    if (user.password !== password) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid username or password' 
        },
        { status: 401 }
      )
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Set session cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful',
      user: userWithoutPassword
    })
    
    response.cookies.set('user-id', user.id, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Login failed' 
      },
      { status: 500 }
    )
  }
}