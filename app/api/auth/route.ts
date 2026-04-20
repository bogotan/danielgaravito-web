import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || '89674523';

    if (password === adminPassword) {
      return NextResponse.json({ authenticated: true });
    } else {
      return NextResponse.json({ authenticated: false, error: 'Clave incorrecta' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ authenticated: false, error: 'Error de servidor' }, { status: 500 });
  }
}
