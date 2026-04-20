import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseConfigured } from '@/lib/supabase';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json(
        { message: '¡Gracias por tu interés! El sistema de registro estará disponible pronto.' },
        { status: 200, headers: corsHeaders }
      );
    }

    const body = await request.json();
    const { email, name, source } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'El email es requerido' },
        { status: 400, headers: corsHeaders }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          email: email.toLowerCase().trim(),
          name: name?.trim() || null,
          source: source || 'website',
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'Ya estás registrado. ¡Gracias!' },
          { status: 200, headers: corsHeaders }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Error al registrar. Intenta de nuevo.' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { message: '¡Registro exitoso! Te mantendremos informado.', data },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500, headers: corsHeaders }
    );
  }
}
