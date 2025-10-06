'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function TermsPage() {
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
              利用規約
            </h1>

            <div className="space-y-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  第1条（適用）
                </h2>
                <p>
                  本規約は、本サービスの利用に関する条件を、本サービスを利用するすべてのユーザーと当サイト運営者との間で定めるものです。本サービスを利用される方は、本規約に同意したものとみなします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  第2条（サービスの内容）
                </h2>
                <p>
                  本サービスは、ユーザーに対して性愛に関する傾向を診断し、その結果を提供するサービスです。診断結果はあくまで参考情報であり、医学的・心理学的な診断ではありません。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  第3条（利用資格）
                </h2>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>本サービスは、どなたでも利用できます。</li>
                  <li>ユーザーは、本サービスを適切に利用する責任を負います。</li>
                  <li>未成年者が本サービスを利用する場合は、保護者の同意を得た上で利用してください。</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  第4条（禁止事項）
                </h2>
                <p className="mb-2">ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>他のユーザーまたは第三者の権利を侵害する行為</li>
                  <li>本サービスの運営を妨害する行為</li>
                  <li>本サービスの信用を毀損する行為</li>
                  <li>不正アクセス、クラッキング等の行為</li>
                  <li>その他、当サイト運営者が不適切と判断する行為</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  第5条（免責事項）
                </h2>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>本サービスの診断結果は、あくまで参考情報であり、その正確性、完全性、有用性について保証するものではありません。</li>
                  <li>診断結果に基づいてユーザーが行った行動により生じた損害について、当サイト運営者は一切の責任を負いません。</li>
                  <li>本サービスの提供の中断、終了、変更により生じた損害について、当サイト運営者は一切の責任を負いません。</li>
                  <li>本サービスに関連して、ユーザーと第三者との間で生じたトラブルについて、当サイト運営者は一切の責任を負いません。</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  第6条（プライバシー）
                </h2>
                <p>
                  当サイト運営者は、ユーザーのプライバシーを尊重します。個人情報の取り扱いについては、
                  <Link href="/privacy" className="text-primary hover:underline mx-1">
                    プライバシーポリシー
                  </Link>
                  をご確認ください。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  第7条（サービスの変更・終了）
                </h2>
                <p>
                  当サイト運営者は、ユーザーへの事前通知なく、本サービスの内容を変更、または提供を終了することができます。これによりユーザーに生じた損害について、当サイト運営者は一切の責任を負いません。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  第8条（規約の変更）
                </h2>
                <p>
                  当サイト運営者は、必要に応じて本規約を変更することができます。規約の変更は、本サイト上に掲示した時点で効力を生じるものとします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  第9条（準拠法・管轄裁判所）
                </h2>
                <p>
                  本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合は、当サイト運営者の所在地を管轄する裁判所を専属的合意管轄裁判所とします。
                </p>
              </section>

              <section className="pt-8 border-t border-gray-200">
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  制定日：2025年1月1日<br />
                  最終更新日：2025年1月1日
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
                トップに戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
