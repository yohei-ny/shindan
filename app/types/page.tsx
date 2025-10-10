'use client';

import { useRouter } from 'next/navigation';
import { DiagnosisType } from '@/types';
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
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-purple-50 pt-20 sm:pt-24 md:pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* ページタイトル */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              全12タイプ紹介
            </h1>
            <p className="text-lg text-gray-600">
              あなたの性愛スタイルを見つけましょう
            </p>
          </div>

          {/* カテゴリーごとのタイプ表示 */}
          {categories.map((category) => (
            <div key={category.key} className="mb-20">
              {/* カテゴリーヘッダー */}
              <div className="text-center mb-10">
                <div className="inline-block px-10 py-4 rounded-full shadow-lg"
                     style={{
                       backgroundColor: getCategoryColor(category.key),
                       color: 'white'
                     }}>
                  <span className="text-2xl font-bold mr-3">
                    {category.name}
                  </span>
                  <span className="text-lg font-medium">
                    {category.subtitle}
                  </span>
                </div>
              </div>

              {/* タイプカードグリッド */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.types.map((type) => {
                  const typeInfo = getTypeDescription(type);
                  const color = getTypeColor(type);

                  return (
                    <div
                      key={type}
                      className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl shadow-lg"
                      onClick={() => handleTypeClick(type)}
                    >
                      {/* 画像エリア */}
                      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden border-b-4"
                           style={{ borderBottomColor: color }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-7xl opacity-10">🖼️</div>
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

                      {/* テキストエリア */}
                      <div className="p-6">
                        {/* タイプコード */}
                        <div className="text-center mb-4">
                          <div className="inline-block px-6 py-2 rounded-full text-base font-bold text-white shadow-md"
                               style={{ backgroundColor: color }}>
                            {type}
                          </div>
                        </div>

                        {/* タイプ名 */}
                        <h3 className="text-xl font-bold text-center mb-3 text-gray-900">
                          {typeInfo.name}
                        </h3>

                        {/* キャッチコピー */}
                        <p className="text-sm text-center mb-6 leading-relaxed text-gray-600 min-h-[3rem]">
                          {typeInfo.tagline}
                        </p>

                        {/* 詳しく見るボタン */}
                        <button
                          className="w-full py-3 rounded-xl text-base font-bold text-white transition-all hover:scale-105 shadow-md"
                          style={{ backgroundColor: color }}
                        >
                          詳しく見る
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* CTAセクション */}
          <div className="text-center mt-20">
            <div className="bg-white rounded-3xl p-12 sm:p-16 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                あなたはどのタイプ？
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                10個の質問に答えて、あなたの性愛タイプを発見しよう
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-16 py-5 rounded-2xl text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-105 shadow-xl"
              >
                診断を始める →
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
