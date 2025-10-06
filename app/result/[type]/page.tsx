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

// 重要なキーワードを強調する関数
function highlightText(text: string, color: string) {
  // 句点で分割して、各文の重要部分を太字にする
  const sentences = text.split('。').filter(s => s.trim());

  return sentences.map((sentence, index) => {
    // 重要なキーワードパターン
    const keywords = [
      /(\S+型)/g,
      /(主導|受け|協働|バランス|柔軟|安心|信頼|満足|冒険|探索|王道|新奇|頻度|強度|段取り|配慮|温もり|刺激)/g,
      /(得意|苦手|強み|弱点|価値|武器|魅力)/g,
    ];

    let highlightedSentence = sentence;
    keywords.forEach(pattern => {
      highlightedSentence = highlightedSentence.replace(pattern, '<strong>$1</strong>');
    });

    return (
      <span key={index}>
        <span dangerouslySetInnerHTML={{ __html: highlightedSentence }} />
        {index < sentences.length - 1 && '。'}
      </span>
    );
  });
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
      <style jsx global>{`
        strong {
          font-weight: 700;
          background: linear-gradient(transparent 60%, #ffd700 60%);
          padding: 0 2px;
        }
      `}</style>
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffe9f0 50%, #ffd6e7 100%)',
        paddingTop: '80px',
      }}>
      <div className="px-6 py-12 flex justify-center">
        <div className="w-full max-w-3xl">
          {/* タイプヒーロー */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl p-10 lg:p-12 mb-10 text-white text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${typeColor} 0%, ${typeColor}dd 100%)`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6"
              >
                <span className="text-xl">🎉</span>
                <span className="text-sm font-bold tracking-wide">診断結果</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl lg:text-7xl font-black mb-6 tracking-tight"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              >
                {type}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl lg:text-3xl font-black mb-4"
              >
                {typeInfo.name}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base lg:text-lg opacity-95 max-w-2xl mx-auto leading-relaxed"
              >
                {typeInfo.tagline}
              </motion.div>

              {/* バッジ */}
              {result.badges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3 justify-center mt-8"
                >
                  {result.badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, type: 'spring', bounce: 0.4 }}
                      className="bg-white/30 backdrop-blur-lg px-5 py-2 rounded-full text-sm lg:text-base font-bold border border-white/20"
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
            style={{ margin: '15px 5px' }}
          >
            <h3 className="text-xl lg:text-2xl font-black mb-12 text-center" style={{ color: 'var(--text-primary)' }}>
              あなたのスコア
            </h3>
            <div className="grid grid-cols-5 gap-5" style={{ margin: '5px 5px 15px 5px' }}>
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
                  className="bg-white rounded-xl p-7 text-center relative overflow-hidden"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                       style={{
                         background: `linear-gradient(90deg, ${typeColor} 0%, ${typeColor}99 100%)`,
                         width: `${(score.value / score.max) * 100}%`,
                       }}
                  />
                  <div className="text-xs font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {score.label}
                  </div>
                  <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                    {score.sublabel}
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <div className="text-3xl lg:text-4xl font-black" style={{ color: typeColor }}>
                      {score.value}
                    </div>
                    <div className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
                      / {score.max}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
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
            className="space-y-8 mb-16"
            style={{ marginTop: '15px' }}
          >
            {/* 顕在的な特徴 */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 relative overflow-hidden"
                 style={{
                   boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                   border: `2px solid ${typeColor}20`,
                   margin: '20px 10px'
                 }}>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: `2px solid ${typeColor}20` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                       style={{ background: `${typeColor}20` }}>
                    👁️
                  </div>
                  <h2 className="text-xl lg:text-2xl font-black" style={{ color: typeColor }}>
                    顕在的な特徴
                  </h2>
                </div>
                <div className="px-4 lg:px-6 py-2">
                  <p className="text-base lg:text-lg leading-loose" style={{
                    color: 'var(--text-primary)',
                    opacity: 0.9,
                    lineHeight: '2.2',
                    letterSpacing: '0.03em'
                  }}>
                    {highlightText(typeInfo.description.manifest, typeColor)}
                  </p>
                </div>
              </div>
            </div>

            {/* 潜在的な特徴 */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 relative overflow-hidden"
                 style={{
                   boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                   border: `2px solid ${typeColor}20`,
                   margin: '20px 10px'
                 }}>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: `2px solid ${typeColor}20` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                       style={{ background: `${typeColor}20` }}>
                    🔮
                  </div>
                  <h2 className="text-xl lg:text-2xl font-black" style={{ color: typeColor }}>
                    潜在的な特徴
                  </h2>
                </div>
                <div className="px-4 lg:px-6 py-2">
                  <p className="text-base lg:text-lg leading-loose" style={{
                    color: 'var(--text-primary)',
                    opacity: 0.9,
                    lineHeight: '2.2',
                    letterSpacing: '0.03em'
                  }}>
                    {highlightText(typeInfo.description.latent, typeColor)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* シェアボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mb-12"
          >
            <h3 className="text-lg lg:text-xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
              結果をシェアする
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleShare('twitter')}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                style={{ border: `2px solid #1DA1F2` }}
                title="Xでシェア"
              >
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="#1DA1F2" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button
                onClick={() => handleShare('line')}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                style={{ border: `2px solid #06C755` }}
                title="LINEでシェア"
              >
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="#06C755" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
              </button>
              <button
                onClick={handleCopyLink}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                style={{ border: `2px solid ${typeColor}` }}
                title={copied ? 'コピー済み' : 'リンクをコピー'}
              >
                {copied ? (
                  <svg className="w-8 h-8 lg:w-10 lg:h-10" fill={typeColor} viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 lg:w-10 lg:h-10" fill={typeColor} viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                )}
              </button>
            </div>
          </motion.div>

          {/* アクションボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="space-y-4 pb-12"
          >
            <button
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
              className="w-full py-5 lg:py-6 rounded-xl text-lg lg:text-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${typeColor} 0%, ${typeColor}dd 100%)`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}
            >
              🔄 もう一度診断する
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full py-5 lg:py-6 rounded-xl text-lg lg:text-xl font-bold bg-white transition-all hover:scale-[1.02] active:scale-[0.98]"
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
