// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get user ID from cookie
    const userId = request.cookies.get('user-id')?.value

    if (!userId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Not authenticated' 
        },
        { status: 401 }
      )
    }

    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          error: 'User not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true,
      user 
    })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Authentication check failed' 
      },
      { status: 500 }
    )
  }
} 