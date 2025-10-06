'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffe9f0 100%)',
        paddingTop: '80px',
      }}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            <h1 className="text-3xl lg:text-4xl font-black mb-8" style={{ color: 'var(--text-primary)' }}>
              このサイトについて
            </h1>

            <div className="space-y-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  サービス概要
                </h2>
                <p>
                  「性愛タイプ診断」は、10問の質問に答えることで、あなたの性愛スタイルを12タイプから診断するサービスです。自分の傾向を知ることで、より良いパートナーシップを築くための気づきを得ることができます。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  12のタイプ分類
                </h2>
                <p className="mb-4">
                  本診断では、以下の3つの軸で性愛スタイルを分類しています。
                </p>

                <div className="bg-pink-50 rounded-xl p-6 mb-4">
                  <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    1. 主導性（S / N / M）
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li><strong>S（主導型）</strong>：主導権を握ることを好む</li>
                    <li><strong>N（協働型）</strong>：バランスを取りながら柔軟に対応</li>
                    <li><strong>M（受容型）</strong>：相手に委ねることを好む</li>
                  </ul>
                </div>

                <div className="bg-pink-50 rounded-xl p-6 mb-4">
                  <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    2. 頻度（H / L）
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li><strong>H（高頻度）</strong>：頻繁な関わりを好む</li>
                    <li><strong>L（低頻度）</strong>：質を重視し、頻度は控えめ</li>
                  </ul>
                </div>

                <div className="bg-pink-50 rounded-xl p-6">
                  <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    3. 新奇性（E / C）
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li><strong>E（探索型）</strong>：新しい体験を求める</li>
                    <li><strong>C（安定型）</strong>：王道の心地よさを大切にする</li>
                  </ul>
                </div>

                <p className="mt-4">
                  これらの組み合わせにより、<strong>S-HE、S-HC、S-LE、S-LC、N-HE、N-HC、N-LE、N-LC、M-HE、M-HC、M-LE、M-LC</strong>の12タイプに分類されます。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  診断の特徴
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-pink-100 rounded-xl p-5">
                    <div className="text-3xl mb-3">⏱️</div>
                    <h3 className="font-bold mb-2">3分で完了</h3>
                    <p className="text-sm">10問の簡単な質問に答えるだけで、すぐに結果が分かります。</p>
                  </div>
                  <div className="bg-white border-2 border-pink-100 rounded-xl p-5">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="font-bold mb-2">精度の高い分析</h3>
                    <p className="text-sm">複数の指標から総合的に判定し、詳細な結果を提供します。</p>
                  </div>
                  <div className="bg-white border-2 border-pink-100 rounded-xl p-5">
                    <div className="text-3xl mb-3">🔐</div>
                    <h3 className="font-bold mb-2">プライバシー保護</h3>
                    <p className="text-sm">完全匿名で、個人情報の入力は一切不要です。</p>
                  </div>
                  <div className="bg-white border-2 border-pink-100 rounded-xl p-5">
                    <div className="text-3xl mb-3">📱</div>
                    <h3 className="font-bold mb-2">シェア機能</h3>
                    <p className="text-sm">結果をSNSで簡単にシェアできます。</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  ご利用にあたっての注意事項
                </h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded">
                  <ul className="space-y-2 text-sm">
                    <li>• 本診断は、医学的・心理学的な診断ではありません。</li>
                    <li>• 診断結果は参考情報としてご活用ください。</li>
                    <li>• 個人差があるため、すべての人に当てはまるわけではありません。</li>
                    <li>• 診断結果に基づく行動については、自己責任でお願いします。</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  技術スタック
                </h2>
                <p className="mb-3">本サービスは、以下の技術を使用して開発されています。</p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Next.js 15</strong> - Reactフレームワーク</li>
                  <li>• <strong>TypeScript</strong> - 型安全な開発</li>
                  <li>• <strong>Tailwind CSS v4</strong> - スタイリング</li>
                  <li>• <strong>Framer Motion</strong> - アニメーション</li>
                  <li>• <strong>Vercel</strong> - ホスティング</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  フィードバック・お問い合わせ
                </h2>
                <p>
                  本サービスに関するご意見、ご要望、不具合報告等がございましたら、TwitterのDMまたはリプライにてお気軽にお知らせください。皆様のフィードバックをもとに、サービスの改善を続けてまいります。
                </p>
              </section>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-block px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
                  boxShadow: '0 4px 12px rgba(255, 107, 157, 0.3)',
                }}
              >
                診断を始める
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
