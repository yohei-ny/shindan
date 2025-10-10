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
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
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
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-purple-50 pt-32 sm:pt-36 md:pt-40 pb-24 px-4 flex justify-center">
        <div className="max-w-3xl w-full flex flex-col items-center">
          {/* 結果カード */}
          <div className="w-full bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
            {/* タイプバッジ */}
            <div className="text-center mb-12">
              <div className="px-6 py-2 rounded-full font-bold shadow-md"
                   style={{ backgroundColor: typeColor, color: 'white', marginTop: '60px', fontSize: '55px' }}>
                {type}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {typeInfo.name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                {typeInfo.tagline}
              </p>
            </div>

            {/* イラスト画像 */}
            <div className="relative w-full max-w-sm mx-auto aspect-square mb-10 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-20">🖼️</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/${type}.png`}
                alt={typeInfo.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
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
            <div className="space-y-6 mb-10">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl" style={{ padding: '15px', margin: '10px' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span>📊</span> あなたの特徴
                </h2>
                <p className="text-base text-gray-700 leading-relaxed" style={{ lineHeight: '2' }}>
                  {typeInfo.description.manifest}
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl" style={{ padding: '15px', margin: '10px' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span>💡</span> 内面の傾向
                </h2>
                <p className="text-base text-gray-700 leading-relaxed" style={{ lineHeight: '2' }}>
                  {typeInfo.description.latent}
                </p>
              </div>

              {result.badges && result.badges.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🏆</span> あなたの特性バッジ
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {result.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 text-gray-700"
                      >
                        {badge.icon} {badge.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* スコアグラフ */}
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">📈 スコア詳細</h2>
              <div className="space-y-5">
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
                  const percentage = (value / maxValues[key]) * 100;
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-2">
                        <span className="text-base font-semibold text-gray-700">{labels[key]}</span>
                        <span className="text-base font-bold text-gray-900">{value}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: typeColor,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* シェアボタン */}
            <div className="text-center border-t border-gray-200 pt-8">
              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-14 h-14 rounded-full bg-[#1DA1F2] hover:bg-[#1a8cd8] transition-all shadow-md flex items-center justify-center"
                  title="Twitterでシェア"
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('line')}
                  className="w-14 h-14 rounded-full bg-[#06C755] hover:bg-[#05b34c] transition-all shadow-md flex items-center justify-center"
                  title="LINEでシェア"
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-14 h-14 rounded-full bg-gray-600 hover:bg-gray-700 transition-all shadow-md flex items-center justify-center"
                  title="リンクをコピー"
                >
                  {copied ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push('/types')}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-base text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-all shadow-md"
            >
              他のタイプを見る
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-all shadow-md"
            >
              もう一度診断する
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
