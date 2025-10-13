'use client';

import { useRouter } from 'next/navigation';
import { DiagnosisType } from '@/types';
import { getTypeDescription } from '@/lib/types';

function getTypeColor(type: DiagnosisType): string {
  const colors: Record<string, string> = {
    'S-HE': '#ef4444', 'S-HC': '#f97316', 'S-LE': '#f59e0b', 'S-LC': '#eab308',
    'N-HE': '#a855f7', 'N-HC': '#9333ea', 'N-LE': '#3b82f6', 'N-LC': '#2563eb',
    'M-HE': '#14b8a6', 'M-HC': '#10b981', 'M-LE': '#22c55e', 'M-LC': '#84cc16',
  };
  return colors[type] || '#3b82f6';
}

function getCategoryColor(category: 'S' | 'N' | 'M'): string {
  const colors = {
    'S': '#ef4444',
    'N': '#a855f7',
    'M': '#14b8a6',
  };
  return colors[category];
}

export default function TypesPage() {
  const router = useRouter();

  const handleTypeClick = (type: DiagnosisType) => {
    router.push(`/result/${type}`);
  };

  const categories = [
    {
      key: 'S' as const,
      name: 'S系',
      subtitle: '主導型',
      types: ['S-HE', 'S-HC', 'S-LE', 'S-LC'] as DiagnosisType[],
    },
    {
      key: 'N' as const,
      name: 'N系',
      subtitle: '中立型',
      types: ['N-HE', 'N-HC', 'N-LE', 'N-LC'] as DiagnosisType[],
    },
    {
      key: 'M' as const,
      name: 'M系',
      subtitle: '受容型',
      types: ['M-HE', 'M-HC', 'M-LE', 'M-LC'] as DiagnosisType[],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-6 py-4 bg-black">
        <div className="text-2xl">🔥</div>
        <h1 className="text-xl font-bold text-[#D4AF77] tracking-wider">性愛診断</h1>
        <div className="text-2xl">🎁</div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1" style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '48px' }}>
        <div className="max-w-md mx-auto">
          {/* 用語解説タイトル */}
          <div className="text-center" style={{ marginTop: '32px', marginBottom: '24px' }}>
            <h2 className="text-white text-lg font-bold">用語解説</h2>
          </div>

          {/* タイプ一覧 */}
          <div className="bg-white rounded-xl text-center" style={{ padding: '16px', marginBottom: '24px' }}>
            <h3 className="text-gray-900 font-bold">タイプ一覧</h3>
          </div>

          {/* タイプカード */}
          <div className="space-y-4">
            {categories.flatMap((category) => category.types).map((type) => {
              const typeInfo = getTypeDescription(type);

              return (
                <div
                  key={type}
                  className="bg-white rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => handleTypeClick(type)}
                >
                  {/* 画像エリア */}
                  <div className="relative aspect-video bg-gray-800 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
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

                  {/* コンテンツエリア */}
                  <div style={{ padding: '16px' }}>
                    {/* タイプバッジ */}
                    <div style={{ marginBottom: '12px' }}>
                      <div className="inline-block px-4 py-1 rounded text-sm font-bold text-white" style={{ backgroundColor: '#ef4444' }}>
                        {type}
                      </div>
                    </div>

                    {/* タイプ名 */}
                    <h3 className="text-lg font-bold text-gray-900" style={{ marginBottom: '8px' }}>
                      {typeInfo.name}
                    </h3>

                    {/* 説明文 */}
                    <p className="text-sm text-gray-600 leading-relaxed" style={{ marginBottom: '16px' }}>
                      {typeInfo.tagline}
                    </p>

                    {/* 詳しく見るボタン */}
                    <button
                      className="w-full py-2 rounded text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: '#ef4444' }}
                    >
                      詳しく見る
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* フッターセクション */}
          <div className="w-full" style={{ marginTop: '48px' }}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <a href="/terms" className="text-white text-sm hover:text-gray-300 transition-colors">
                  用語解説・全タイプ一覧
                </a>
                <a href="/privacy" className="text-white text-sm hover:text-gray-300 transition-colors">
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
        </div>
      </main>
    </div>
  );
}
