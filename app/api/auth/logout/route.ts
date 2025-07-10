// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ 
      success: true,
      message: 'Logout successful'
    })
    
    // Clear the user-id cookie by setting it to expire immediately
    response.cookies.set('user-id', '', {
      httpOnly: true,
      maxAge: 0, // Expire immediately
      expires: new Date(0), // Set to epoch time
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Logout failed' 
      },
      { status: 500 }
    )
  }
} 