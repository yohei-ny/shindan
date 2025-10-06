import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { DiagnosisType } from '@/types';
import { typeData } from '@/lib/types';
import { getTypeGradient } from '@/lib/diagnosis';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type: typeParam } = await params;
    const type = typeParam as DiagnosisType;
    const data = typeData[type];
    const gradient = getTypeGradient(type);

    if (!data) {
      return new Response('Not Found', { status: 404 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: gradient,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
            }}
          >
            {type}
          </div>
          <div
            style={{
              fontSize: 48,
              color: 'white',
              marginBottom: 20,
            }}
          >
            {data.name}
          </div>
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              marginBottom: 40,
            }}
          >
            {data.tagline}
          </div>
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            #SEXタイプ診断
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG Image generation error:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
