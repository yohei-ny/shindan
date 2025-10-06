# SEXタイプ診断サイト

MBTI風の性愛タイプ診断サービス。10問の質問から5つの指標を測定し、12タイプに分類します。

## 🚀 技術スタック

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (アニメーション)
- **@vercel/og** (OGP画像動的生成)

## 📋 主な機能

- ✅ 性別選択と年齢確認
- ✅ 10問の診断質問（プログレスバー付き）
- ✅ 12タイプ分類（S/M/N × HE/HC/LE/LC）
- ✅ 診断結果の詳細表示（顕在的・潜在的特徴）
- ✅ SNSシェア機能（X/Twitter、LINE）
- ✅ 動的OGP画像生成
- ✅ 完全レスポンシブ対応

## 🎨 12タイプ一覧

### S系（攻め）
- **S-HE**: 快感の演出家 - 高頻度で攻めて新しい遊びに挑戦
- **S-HC**: 神速のタイムキーパー - 頻繁に攻めてテンポを重視
- **S-LE**: 非日常のコレクター - 新体験を集めてたまに楽しむ
- **S-LC**: ふんわりリーダー - マイペースに穏やかリード

### N系（どちらも）
- **N-HE**: 神速の探求者 - 頻繁に楽しみ好奇心旺盛
- **N-HC**: 安らぎの共創者 - 定期的に安定した幸せを
- **N-LE**: たまに冒険家 - たまに新しい発見を楽しむ
- **N-LC**: 安らぎの創造主 - マイペースに心地よさを

### M系（受け）
- **M-HE**: 静かなる変幻者 - 頻繁に受けて新展開を待つ
- **M-HC**: 心と体の守り人 - 定期的に受けて安心を得る
- **M-LE**: 受け身のアーティスト - たまに新しい刺激を受ける
- **M-LC**: ゆったり委ねる人 - のんびり穏やかに身を任せる

## 🛠️ セットアップ

### 必要環境
- Node.js 18以上
- npm または yarn

### インストールと起動

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番環境起動
npm start
```

開発サーバーは http://localhost:3000 で起動します。

## 📁 ディレクトリ構成

```
sex-type-diagnosis/
├── app/
│   ├── page.tsx              # トップページ
│   ├── quiz/
│   │   └── page.tsx          # 診断ページ
│   ├── result/
│   │   └── [type]/
│   │       └── page.tsx      # 結果ページ（動的）
│   ├── api/
│   │   └── og/
│   │       └── [type]/
│   │           └── route.tsx # OGP画像生成API
│   ├── layout.tsx            # ルートレイアウト
│   └── globals.css           # グローバルスタイル
├── components/
│   └── ui/                   # UIコンポーネント
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Modal.tsx
├── lib/
│   ├── diagnosis.ts          # 診断ロジック
│   ├── questions.ts          # 質問データ
│   ├── types.ts              # タイプデータ
│   └── compatibility.ts      # 相性計算
└── types/
    └── index.ts              # TypeScript型定義
```

## 🚀 デプロイ

### Vercelへのデプロイ

1. GitHubにプッシュ
```bash
git add .
git commit -m "Initial commit"
git push
```

2. [Vercel](https://vercel.com)にログイン

3. 「New Project」→ リポジトリを選択

4. Framework Preset: Next.js を選択

5. 「Deploy」をクリック

### 独自ドメインの設定

1. Vercelプロジェクト設定 → Domains
2. 独自ドメインを入力
3. DNS設定を指示通りに設定
4. SSL自動発行（数分〜数時間）

## 📊 診断ロジック

### 5つの指標
- **L (Libido)**: 性欲の強さ (0-16)
- **E (Edgy)**: 新奇性への開放度 (1-9)
- **B (BDSM)**: 支配・被支配の傾向 (0-8)
- **ST (Stimulation)**: 刺激重視度 (1-5)
- **WA (Warmth)**: ぬくもり重視度 (1-5)

### タイプ判定アルゴリズム
1. **象限判定** (HE/HC/LE/LC)
   - L ≥ 9 かつ E ≥ 7 → HE（高頻度・新奇）
   - L ≥ 9 かつ E < 7 → HC（高頻度・慣習）
   - L < 9 かつ E ≥ 7 → LE（低頻度・新奇）
   - L < 9 かつ E < 7 → LC（低頻度・慣習）

2. **主導志向判定** (S/M/N)
   - S（攻め）: (E ≥ 7 && B ≥ 4) || (ST - WA ≥ 2)
   - M（受け）: (E ≤ 4 && B ≤ 3) || (WA - ST ≥ 2)
   - N（どちらも）: 上記以外

3. **最終タイプ**: `${主導志向}-${象限}`

## 🎨 カラーシステム

### タイプ別グラデーション
- **S系**: 暖色系（ピンク〜オレンジ）
- **N系**: 中間色（水色〜パープル）
- **M系**: 寒色系（ブルー〜グレー）

### デザインテーマ
- 16Personalities風のモダンなUI
- カード型レイアウト
- Framer Motionによる滑らかなアニメーション
- 完全レスポンシブデザイン

## 📄 ライセンス

このプロジェクトは個人利用・商用利用ともに自由です。

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
