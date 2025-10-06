'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function PrivacyPage() {
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
              プライバシーポリシー
            </h1>

            <div className="space-y-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <section>
                <p>
                  性愛タイプ診断（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーは、本サービスにおける個人情報の取り扱いについて説明するものです。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  1. 収集する情報
                </h2>
                <p className="mb-2">本サービスでは、以下の情報を収集する場合があります。</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong>診断データ</strong>: 質問への回答内容（ブラウザのローカルストレージに一時保存）</li>
                  <li><strong>アクセス情報</strong>: IPアドレス、ブラウザの種類、アクセス日時、参照元URL等</li>
                  <li><strong>Cookie情報</strong>: サービスの利便性向上のために使用</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  2. 情報の利用目的
                </h2>
                <p className="mb-2">収集した情報は、以下の目的で利用します。</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>診断結果の提供</li>
                  <li>サービスの品質向上・改善</li>
                  <li>アクセス解析・統計データの作成</li>
                  <li>不正利用の防止</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  3. 個人情報の保護
                </h2>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>本サービスでは、氏名、メールアドレス、電話番号等の個人を特定できる情報は一切収集しません。</li>
                  <li>診断の回答データは、ブラウザのローカルストレージに保存され、サーバーには送信されません。</li>
                  <li>ユーザーが意図的に共有しない限り、診断結果が第三者に公開されることはありません。</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  4. Cookie（クッキー）について
                </h2>
                <p>
                  本サービスでは、サービスの利便性向上のためにCookieを使用する場合があります。Cookieは、ユーザーのブラウザに保存される小さなテキストファイルです。ユーザーは、ブラウザの設定でCookieを無効にすることができますが、その場合、本サービスの一部機能が正常に動作しない可能性があります。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  5. アクセス解析ツールについて
                </h2>
                <p>
                  本サービスでは、サービスの改善のためにGoogle Analytics等のアクセス解析ツールを使用する場合があります。これらのツールは、Cookieを使用してユーザーのアクセス情報を収集しますが、個人を特定する情報は含まれません。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  6. 第三者への情報提供
                </h2>
                <p>
                  本サービスは、法令に基づく場合を除き、ユーザーの同意なく収集した情報を第三者に提供することはありません。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  7. セキュリティ
                </h2>
                <p>
                  本サービスは、収集した情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を講じます。ただし、インターネット上での情報送信の完全な安全性を保証することはできません。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  8. 外部サービスへのリンク
                </h2>
                <p>
                  本サービスには、外部サイトへのリンクが含まれる場合があります。リンク先のサイトにおける個人情報の取り扱いについては、各サイトのプライバシーポリシーをご確認ください。当サイトは、リンク先サイトにおける個人情報の取り扱いについて責任を負いません。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  9. お子様の個人情報
                </h2>
                <p>
                  本サービスは、未成年者の利用を想定していません。未成年者が本サービスを利用する場合は、保護者の同意を得た上でご利用ください。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  10. プライバシーポリシーの変更
                </h2>
                <p>
                  本サービスは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、本サイト上に掲示した時点で効力を生じるものとします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  11. お問い合わせ
                </h2>
                <p>
                  本プライバシーポリシーに関するお問い合わせは、TwitterのDMまたはリプライにてお願いいたします。
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
