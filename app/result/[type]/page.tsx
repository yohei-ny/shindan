'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DiagnosisResult, DiagnosisType } from '@/types';
import { getTypeDescription } from '@/lib/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

function getTypeColor(type: DiagnosisType): string {
  const colors: Record<string, string> = {
    'S-HE': '#ef4444', 'S-HC': '#f97316', 'S-LE': '#f59e0b', 'S-LC': '#eab308',
    'N-HE': '#a855f7', 'N-HC': '#9333ea', 'N-LE': '#3b82f6', 'N-LC': '#2563eb',
    'M-HE': '#14b8a6', 'M-HC': '#10b981', 'M-LE': '#22c55e', 'M-LC': '#84cc16',
  };
  return colors[type] || '#3b82f6';
}

// 有効なタイプかチェック
function isValidType(type: string): type is DiagnosisType {
  const validTypes = [
    'S-HE', 'S-HC', 'S-LE', 'S-LC',
    'N-HE', 'N-HC', 'N-LE', 'N-LC',
    'M-HE', 'M-HC', 'M-LE', 'M-LC'
  ];
  return validTypes.includes(type);
}

export default function TypeResultPage() {
  const router = useRouter();
  const params = useParams();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && params?.type) {
      const typeParam = typeof params.type === 'string' ? params.type : params.type[0];

      if (!isValidType(typeParam)) {
        router.push('/');
        return;
      }

      // localStorageから結果を取得、なければダミーデータを作成
      const savedResult = localStorage.getItem('diagnosisResult');
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        // URLのtypeでlocalStorageのtypeを上書き
        setResult({ ...parsedResult, type: typeParam });
      } else {
        // ダミーの結果データを作成（直リンクでアクセスされた場合）
        setResult({
          type: typeParam,
          scores: {
            L: 8,
            E: 5,
            B: 4,
            ST: 3,
            WA: 3
          },
          badges: [],
          gender: 'male' as const,
          timestamp: Date.now()
        });
      }
      setIsLoading(false);
    }
  }, [params, router]);

  if (isLoading || !result) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <header className="flex items-center justify-between px-6 py-4 bg-black">
          <div className="text-2xl">🔥</div>
          <h1 className="text-xl font-bold text-[#D4AF77] tracking-wider">性愛診断</h1>
          <div className="text-2xl">🎁</div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  const type = result.type;
  const typeInfo = getTypeDescription(type);
  const typeColor = getTypeColor(type);

  const handleShare = (platform: 'twitter' | 'line') => {
    const url = window.location.href;
    const text = `私は「${typeInfo.name}」でした！ ${typeInfo.tagline}\n\n#SEXタイプ診断`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'line') {
      window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-6 py-4 bg-black">
        <div className="text-2xl">🔥</div>
        <h1 className="text-xl font-bold text-[#D4AF77] tracking-wider">性愛診断</h1>
        <div className="text-2xl">🎁</div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col items-center" style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '48px' }}>
        <div className="w-full max-w-md flex flex-col items-center">
          {/* タイプバッジ */}
          <div className="text-center" style={{ marginBottom: '24px', marginTop: '24px' }}>
            <div className="inline-block px-6 py-2 rounded-full font-bold text-white" style={{ backgroundColor: typeColor, fontSize: '16px' }}>
              {type}
            </div>
          </div>

          {/* タイプ名 */}
          <h1 className="text-center text-white font-bold" style={{ fontSize: '24px', marginBottom: '16px' }}>
            {typeInfo.name}
          </h1>

          {/* サブテキスト */}
          <p className="text-center text-white text-sm" style={{ marginBottom: '32px' }}>
            {typeInfo.tagline}
          </p>

          {/* 結果カード */}
          <div className="w-full bg-black rounded-2xl" style={{ marginBottom: '32px' }}>

          {/* イラスト画像 */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden" style={{ marginBottom: '32px' }}>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-6xl opacity-20">🖼️</div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/${type}.jpg`}
              alt={typeInfo.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                if (img.src.endsWith('.jpg')) {
                  img.src = `/images/${type}.png`;
                } else {
                  img.style.display = 'none';
                }
              }}
              onLoad={(e) => {
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  const placeholder = parent.querySelector('.absolute');
                  if (placeholder) (placeholder as HTMLElement).style.display = 'none';
                }
              }}
            />
          </div>

          {/* 特徴セクション */}
          <div className="w-full" style={{ marginBottom: '32px' }}>
            <div className="bg-gray-900 rounded-xl" style={{ padding: '24px', marginBottom: '16px' }}>
              <h2 className="text-lg font-bold text-white flex items-center gap-2" style={{ marginBottom: '16px' }}>
                あなたの特徴
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed" style={{ lineHeight: '1.8' }}>
                {typeInfo.description.manifest}
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl" style={{ padding: '24px' }}>
              <h2 className="text-lg font-bold text-white flex items-center gap-2" style={{ marginBottom: '16px' }}>
                {typeInfo.name}の詳細
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed" style={{ lineHeight: '1.8' }}>
                {typeInfo.description.latent}
              </p>
            </div>
          </div>

          {/* スコア詳細 */}
          <div className="w-full bg-gray-900 rounded-xl" style={{ padding: '24px', marginBottom: '32px' }}>
            <h2 className="text-lg font-bold text-white" style={{ marginBottom: '24px' }}>スコア詳細</h2>
            <div className="space-y-3">
              {Object.entries(result.scores).map(([key, value]) => {
                const labels: Record<string, string> = {
                  L: 'リビドー',
                  E: '新奇性',
                  B: 'BDSM傾向',
                  ST: '刺激重視',
                  WA: '情緒重視',
                };
                const maxValues: Record<string, number> = {
                  L: 16,
                  E: 9,
                  B: 8,
                  ST: 5,
                  WA: 5,
                };
                return (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-sm text-gray-300">{labels[key]}</span>
                    <span className="text-sm font-bold text-white">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 結果をシェアしよう! */}
          <div className="text-center" style={{ marginBottom: '32px' }}>
            <p className="text-white text-sm" style={{ marginBottom: '16px' }}>結果をシェアしよう!</p>
            <div className="flex gap-4 justify-center items-center">
              <button
                onClick={() => handleShare('twitter')}
                className="w-12 h-12 rounded-full bg-[#1DA1F2] hover:bg-[#1a8cd8] transition-all flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button
                onClick={handleCopyLink}
                className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-all flex items-center justify-center"
              >
                {copied ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 区切り線 */}
          <div className="w-full border-t border-gray-700" style={{ marginBottom: '32px' }}></div>

          {/* フッターリンク */}
          <div className="w-full flex items-center justify-between" style={{ marginBottom: '32px' }}>
            <div className="flex flex-col gap-2 text-white text-sm">
              <a href="/terms" className="hover:text-gray-300 transition-colors">
                用語解説・全タイプ一覧
              </a>
              <a href="/privacy" className="hover:text-gray-300 transition-colors">
                プライバシーポリシー
              </a>
            </div>
            <button
              onClick={() => router.push('/')}
              className="relative w-20 h-20 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 overflow-hidden"
            >
              <img src="/img/btn.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="relative z-10 text-center">
                <div className="text-white text-xs font-bold drop-shadow-lg">診断</div>
                <div className="text-white text-xs font-bold drop-shadow-lg">START</div>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
