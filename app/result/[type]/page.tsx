'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DiagnosisResult, DiagnosisType } from '@/types';
import { getTypeDescription } from '@/lib/types';
import { Header } from '@/components/Header';

function getTypeColor(type: DiagnosisType): string {
  const colors: Record<string, string> = {
    'S-HE': '#e74c3c', 'S-HC': '#e67e22', 'S-LE': '#f39c12', 'S-LC': '#f1c40f',
    'N-HE': '#9b59b6', 'N-HC': '#8e44ad', 'N-LE': '#3498db', 'N-LC': '#2980b9',
    'M-HE': '#1abc9c', 'M-HC': '#16a085', 'M-LE': '#27ae60', 'M-LC': '#2ecc71',
  };
  return colors[type] || '#4298b4';
}

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const type = params.type as DiagnosisType;
  const typeInfo = getTypeDescription(type);
  const typeColor = getTypeColor(type);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('diagnosisResult');
      if (savedResult) {
        setResult(JSON.parse(savedResult));
      } else {
        router.push('/');
      }
    }
  }, [router]);

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

  if (!result) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffe9f0 50%, #ffd6e7 100%)',
        paddingTop: '80px',
      }}>
        {/* シェアボタン */}
        <div className="bg-white/98 backdrop-blur-xl shadow-sm py-8">
          <div className="max-w-4xl mx-auto px-8">
          <div className="flex justify-center gap-4 lg:gap-5">
            <button
              onClick={() => handleShare('twitter')}
              className="px-6 lg:px-8 py-4 lg:py-4 bg-white rounded-xl lg:rounded-2xl font-bold text-sm lg:text-base shadow-sm hover:shadow-lg transition-all flex items-center gap-2"
              style={{ color: typeColor, border: `2px solid ${typeColor}` }}
            >
              <span className="text-lg">🐦</span>
              <span className="hidden sm:inline">Xでシェア</span>
              <span className="sm:hidden">X</span>
            </button>
            <button
              onClick={() => handleShare('line')}
              className="px-6 lg:px-8 py-4 lg:py-4 bg-white rounded-xl lg:rounded-2xl font-bold text-sm lg:text-base shadow-sm hover:shadow-lg transition-all flex items-center gap-2"
              style={{ color: typeColor, border: `2px solid ${typeColor}` }}
            >
              <span className="text-lg">📱</span>
              <span className="hidden sm:inline">LINEでシェア</span>
              <span className="sm:hidden">LINE</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="px-6 lg:px-8 py-4 lg:py-4 bg-white rounded-xl lg:rounded-2xl font-bold text-sm lg:text-base shadow-sm hover:shadow-lg transition-all flex items-center gap-2"
              style={{ color: typeColor, border: `2px solid ${typeColor}` }}
            >
              <span className="text-lg">{copied ? '✓' : '🔗'}</span>
              <span>{copied ? 'コピー済み' : 'リンク'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-20 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* タイプヒーロー */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-[36px] lg:rounded-[44px] p-16 lg:p-24 mb-20 text-white text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${typeColor} 0%, ${typeColor}dd 100%)`,
              boxShadow: '0 24px 60px rgba(0,0,0,0.15)'
            }}
          >
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md rounded-full mb-10"
              >
                <span className="text-3xl">🎉</span>
                <span className="text-base lg:text-lg font-bold tracking-wide">診断結果</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-8xl lg:text-9xl font-black mb-10 tracking-tight"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              >
                {type}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-5xl font-black mb-6"
              >
                {typeInfo.name}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl lg:text-2xl opacity-95 max-w-2xl mx-auto leading-relaxed"
              >
                {typeInfo.tagline}
              </motion.div>

              {/* バッジ */}
              {result.badges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4 justify-center mt-12"
                >
                  {result.badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, type: 'spring', bounce: 0.4 }}
                      className="bg-white/30 backdrop-blur-lg px-6 py-3 rounded-full text-base lg:text-lg font-bold border border-white/20"
                    >
                      {badge.icon} {badge.text}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* 背景装飾 */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
            </div>
          </motion.div>

          {/* スコアグリッド */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-20"
          >
            <h3 className="text-2xl lg:text-3xl font-black mb-12 text-center" style={{ color: 'var(--text-primary)' }}>
              あなたのスコア
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-7">
              {[
                { label: 'L', sublabel: '性欲', value: result.scores.L, max: 16 },
                { label: 'E', sublabel: '新奇性', value: result.scores.E, max: 9 },
                { label: 'B', sublabel: 'BDSM', value: result.scores.B, max: 8 },
                { label: 'ST', sublabel: '刺激', value: result.scores.ST, max: 5 },
                { label: 'WA', sublabel: '温もり', value: result.scores.WA, max: 5 },
              ].map((score, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.08, type: 'spring', bounce: 0.4 }}
                  className="bg-white rounded-[28px] p-8 text-center relative overflow-hidden"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[28px]"
                       style={{
                         background: `linear-gradient(90deg, ${typeColor} 0%, ${typeColor}99 100%)`,
                         width: `${(score.value / score.max) * 100}%`,
                       }}
                  />
                  <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {score.label}
                  </div>
                  <div className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                    {score.sublabel}
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <div className="text-4xl lg:text-5xl font-black" style={{ color: typeColor }}>
                      {score.value}
                    </div>
                    <div className="text-lg font-bold" style={{ color: 'var(--text-muted)' }}>
                      / {score.max}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(score.value / score.max) * 100}%` }}
                      transition={{ delay: 1 + index * 0.08, duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${typeColor} 0%, ${typeColor}cc 100%)` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 詳細カード */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-12 mb-20"
          >
            {/* 顕在的な特徴 */}
            <div className="bg-white rounded-[32px] lg:rounded-[36px] p-12 lg:p-16 relative overflow-hidden group"
                 style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div className="absolute top-0 left-0 w-2 h-full rounded-l-[32px] lg:rounded-l-[36px]"
                   style={{ background: `linear-gradient(180deg, ${typeColor} 0%, ${typeColor}aa 100%)` }}
              />
              <div className="pl-8">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                       style={{ background: `${typeColor}15` }}>
                    👁️
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black" style={{ color: 'var(--text-primary)' }}>
                    顕在的な特徴
                  </h2>
                </div>
                <p className="text-lg lg:text-xl leading-loose" style={{ color: 'var(--text-primary)', opacity: 0.85 }}>
                  {typeInfo.description.manifest}
                </p>
              </div>
            </div>

            {/* 潜在的な特徴 */}
            <div className="bg-white rounded-[32px] lg:rounded-[36px] p-12 lg:p-16 relative overflow-hidden group"
                 style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div className="absolute top-0 left-0 w-2 h-full rounded-l-[32px] lg:rounded-l-[36px]"
                   style={{ background: `linear-gradient(180deg, ${typeColor} 0%, ${typeColor}aa 100%)` }}
              />
              <div className="pl-8">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                       style={{ background: `${typeColor}15` }}>
                    🔮
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black" style={{ color: 'var(--text-primary)' }}>
                    潜在的な特徴
                  </h2>
                </div>
                <p className="text-lg lg:text-xl leading-loose" style={{ color: 'var(--text-primary)', opacity: 0.85 }}>
                  {typeInfo.description.latent}
                </p>
              </div>
            </div>
          </motion.div>

          {/* アクションボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="space-y-5 pb-16"
          >
            <button
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
              className="w-full py-6 lg:py-7 rounded-2xl lg:rounded-[28px] text-xl lg:text-2xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${typeColor} 0%, ${typeColor}dd 100%)`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}
            >
              🔄 もう一度診断する
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full py-6 lg:py-7 rounded-2xl lg:rounded-[28px] text-xl lg:text-2xl font-bold bg-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                border: `2px solid ${typeColor}`,
                color: typeColor,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              }}
            >
              🏠 トップに戻る
            </button>
          </motion.div>
        </div>
      </div>
      </div>
    </>
  );
}
