// Entrada al hub y al admin. No usa variables de entorno: la clave es correcta si abre los datos cifrados del hub.
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_HUB, DURACION_S, llaveDeClave } from '@/lib/hubSeguridad';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const k = llaveDeClave(password);
    if (k) {
      const res = NextResponse.json({ authenticated: true });
      res.cookies.set(COOKIE_HUB, k.toString('base64url'), {
        httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: DURACION_S,
      });
      return res;
    }
    await new Promise((r) => setTimeout(r, 1500)); // frena a quien intente adivinar la clave
    return NextResponse.json({ authenticated: false, error: 'Clave incorrecta' }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false, error: 'Error de servidor' }, { status: 500 });
  }
}

// Salir: borra la llave del navegador.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_HUB, '', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 });
  return res;
}
