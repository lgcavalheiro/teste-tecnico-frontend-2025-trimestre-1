import { NextResponse } from 'next/server';
import { CEPResponse } from '@/types/cep';

export async function GET(
  request: Request,
  { params }: { params: { cep: string } }
) {
  const { cep } = params;

  const cepRegex = /^\d{8}$/;
  if (!cep || !cepRegex.test(cep)) {
    return NextResponse.json(
      { error: 'CEP inválido. O CEP deve conter 8 dígitos numéricos.' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar CEP');
    }

    const data: CEPResponse = await response.json();

    if (data.erro) {
      return NextResponse.json(
        { error: 'CEP não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar CEP. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
