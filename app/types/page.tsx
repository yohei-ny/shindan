'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DiagnosisType } from '@/types';
import { getTypeDescription } from '@/lib/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

function getTypeColor(type: DiagnosisType): string {
  const colors: Record<string, string> = {
    'S-HE': '#e74c3c', 'S-HC': '#e67e22', 'S-LE': '#f39c12', 'S-LC': '#f1c40f',
    'N-HE': '#9b59b6', 'N-HC': '#8e44ad', 'N-LE': '#3498db', 'N-LC': '#2980b9',
    'M-HE': '#1abc9c', 'M-HC': '#16a085', 'M-LE': '#27ae60', 'M-LC': '#2ecc71',
  };
  return colors[type] || '#4298b4';
}

function getCategoryColor(category: 'S' | 'N' | 'M'): string {
  const colors = {
    'S': '#e74c3c',
    'N': '#9b59b6',
    'M': '#1abc9c',
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
      <div className="min-h-screen" style={{
        background: 'linear-gradient(180deg, #f8f4f9 0%, #e8d5ed 50%, #d4b5dc 100%)',
        paddingTop: '100px',
        paddingBottom: '80px',
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* ページタイトル */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6" style={{
              color: '#2d3748',
              letterSpacing: '-0.02em'
            }}>
              全12タイプ紹介
            </h1>
            <p className="text-base sm:text-lg" style={{ color: '#4a5568' }}>
              あなたの性愛スタイルを見つけましょう
            </p>
          </motion.div>

          {/* カテゴリーごとのタイプ表示 */}
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + catIndex * 0.2 }}
              className="mb-20"
            >
              {/* カテゴリーヘッダー */}
              <div className="text-center mb-10">
                <div className="inline-block px-8 py-4 rounded-full"
                     style={{
                       background: `${getCategoryColor(category.key)}20`,
                       border: `3px solid ${getCategoryColor(category.key)}40`
                     }}>
                  <span className="text-xl sm:text-2xl font-black" style={{ color: getCategoryColor(category.key) }}>
                    {category.name}
                  </span>
                  <span className="text-base sm:text-lg ml-3" style={{ color: '#4a5568' }}>
                    {category.subtitle}
                  </span>
                </div>
              </div>

              {/* タイプカードグリッド */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {category.types.map((type, index) => {
                  const typeInfo = getTypeDescription(type);
                  const color = getTypeColor(type);

                  return (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + catIndex * 0.2 + index * 0.05 }}
                      className="bg-white rounded-3xl overflow-hidden cursor-pointer transition-all hover:-translate-y-3 hover:shadow-2xl"
                      style={{
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        border: '2px solid rgba(255,255,255,0.8)'
                      }}
                      onClick={() => handleTypeClick(type)}
                    >
                      {/* 画像エリア */}
                      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-white overflow-hidden"
                           style={{ borderBottom: `3px solid ${color}` }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl opacity-10">🖼️</div>
                        </div>
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
                      <div className="p-6 lg:p-8">
                        {/* タイプコード */}
                        <div className="text-center mb-4">
                          <div className="inline-block px-5 py-2 rounded-full text-base font-bold"
                               style={{
                                 background: `${color}20`,
                                 color: color,
                                 border: `2px solid ${color}40`
                               }}>
                            {type}
                          </div>
                        </div>

                        {/* タイプ名 */}
                        <h3 className="text-lg sm:text-xl font-black text-center mb-4" style={{
                          color: '#2d3748',
                          lineHeight: '1.4'
                        }}>
                          {typeInfo.name}
                        </h3>

                        {/* キャッチコピー */}
                        <p className="text-sm sm:text-base text-center mb-6 leading-relaxed" style={{
                          color: '#4a5568',
                          minHeight: '3.5rem'
                        }}>
                          {typeInfo.tagline}
                        </p>

                        {/* 詳しく見るボタン */}
                        <button
                          className="w-full py-4 rounded-2xl text-base font-bold transition-all hover:scale-105"
                          style={{
                            background: color,
                            color: 'white',
                            boxShadow: `0 4px 16px ${color}40`
                          }}
                        >
                          詳しく見る
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* CTAセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center mt-20 mb-10"
          >
            <div className="bg-white rounded-[40px] p-12 sm:p-16"
                 style={{
                   boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                   border: '2px solid rgba(255,255,255,0.8)'
                 }}>
              <h2 className="text-3xl sm:text-4xl font-black mb-6" style={{ color: '#2d3748' }}>
                あなたはどのタイプ？
              </h2>
              <p className="text-base sm:text-lg mb-10" style={{ color: '#4a5568' }}>
                10個の質問に答えて、あなたの性愛タイプを発見しよう
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-16 py-6 rounded-2xl text-lg font-bold text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
                  border: '3px solid #2d5f8d',
                  boxShadow: '0 8px 24px rgba(74,144,226,0.4)',
                }}
              >
                診断を始める →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
