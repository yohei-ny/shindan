'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export function Header() {
  const router = useRouter();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                 style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' }}>
              💕
            </div>
            <div>
              <div className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                性愛タイプ診断
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                SEX Type Diagnosis
              </div>
            </div>
          </button>

          {/* ナビゲーション（デスクトップ） */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => router.push('/')}
              className="text-sm font-bold hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              診断をする
            </button>
            <button
              className="text-sm font-bold hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              診断について
            </button>
          </nav>

          {/* CTAボタン */}
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' }}
          >
            診断を始める
          </button>
        </div>
      </div>
    </motion.header>
  );
}
