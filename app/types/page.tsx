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

export default function TypesPage() {
  const router = useRouter();

  const handleTypeClick = (type: DiagnosisType) => {
    router.push(`/result/${type}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffe9f0 50%, #ffd6e7 100%)',
        paddingTop: '100px',
        paddingBottom: '60px',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* ページタイトル */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
              全12タイプ紹介
            </h1>
            <p className="text-base sm:text-lg lg:text-xl" style={{ color: 'var(--text-secondary)' }}>
              性愛スタイルの12タイプをご紹介します
            </p>
          </motion.div>

          {/* S系タイプ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black text-white"
                   style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #f39c12 100%)' }}>
                S
              </div>
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                S系 - 主導型
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {['S-HE', 'S-HC', 'S-LE', 'S-LC'].map((typeKey, index) => {
                const type = typeKey as DiagnosisType;
                const typeInfo = getTypeDescription(type);
                const color = getTypeColor(type);

                return (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                    onClick={() => handleTypeClick(type)}
                  >
                    <div className="p-6" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)` }}>
                      <div className="text-center mb-4">
                        <div className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4"
                             style={{ background: color }}>
                          {type}
                        </div>
                      </div>
                      <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-4"
                           style={{ border: `2px solid ${color}30` }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl opacity-20">🖼️</div>
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
                    </div>
                    <div className="p-6 pt-0">
                      <h3 className="text-xl font-black mb-2 text-center" style={{ color }}>
                        {typeInfo.name}
                      </h3>
                      <p className="text-sm text-center mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {typeInfo.tagline}
                      </p>
                      <button
                        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
                        style={{ background: color }}
                      >
                        詳しく見る
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* N系タイプ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black text-white"
                   style={{ background: 'linear-gradient(135deg, #9b59b6 0%, #3498db 100%)' }}>
                N
              </div>
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                N系 - 中立型
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {['N-HE', 'N-HC', 'N-LE', 'N-LC'].map((typeKey, index) => {
                const type = typeKey as DiagnosisType;
                const typeInfo = getTypeDescription(type);
                const color = getTypeColor(type);

                return (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                    onClick={() => handleTypeClick(type)}
                  >
                    <div className="p-6" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)` }}>
                      <div className="text-center mb-4">
                        <div className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4"
                             style={{ background: color }}>
                          {type}
                        </div>
                      </div>
                      <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-4"
                           style={{ border: `2px solid ${color}30` }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl opacity-20">🖼️</div>
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
                    </div>
                    <div className="p-6 pt-0">
                      <h3 className="text-xl font-black mb-2 text-center" style={{ color }}>
                        {typeInfo.name}
                      </h3>
                      <p className="text-sm text-center mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {typeInfo.tagline}
                      </p>
                      <button
                        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
                        style={{ background: color }}
                      >
                        詳しく見る
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* M系タイプ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black text-white"
                   style={{ background: 'linear-gradient(135deg, #1abc9c 0%, #2ecc71 100%)' }}>
                M
              </div>
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                M系 - 受容型
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {['M-HE', 'M-HC', 'M-LE', 'M-LC'].map((typeKey, index) => {
                const type = typeKey as DiagnosisType;
                const typeInfo = getTypeDescription(type);
                const color = getTypeColor(type);

                return (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                    onClick={() => handleTypeClick(type)}
                  >
                    <div className="p-6" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)` }}>
                      <div className="text-center mb-4">
                        <div className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4"
                             style={{ background: color }}>
                          {type}
                        </div>
                      </div>
                      <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-4"
                           style={{ border: `2px solid ${color}30` }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl opacity-20">🖼️</div>
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
                    </div>
                    <div className="p-6 pt-0">
                      <h3 className="text-xl font-black mb-2 text-center" style={{ color }}>
                        {typeInfo.name}
                      </h3>
                      <p className="text-sm text-center mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {typeInfo.tagline}
                      </p>
                      <button
                        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
                        style={{ background: color }}
                      >
                        詳しく見る
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 診断CTAボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl p-8 sm:p-12 inline-block"
                 style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <h3 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: 'var(--text-primary)' }}>
                あなたはどのタイプ？
              </h3>
              <p className="text-base sm:text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                診断であなたの性愛タイプを見つけましょう
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-12 py-5 rounded-xl text-lg font-bold text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
                  boxShadow: '0 8px 24px rgba(255,107,157,0.4)',
                }}
              >
                診断を始める
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
