# Vercelデプロイガイド

このドキュメントでは、性愛タイプ診断サイトをVercelにデプロイする手順を説明します。

## 前提条件

- GitHubリポジトリが準備できている（https://github.com/yohei-ny/shindan）
- Vercelアカウントを持っている（なければ無料で作成可能）

---

## デプロイ手順

### 方法1: Vercelダッシュボードから（推奨・最も簡単）

#### 1. Vercelにログイン
https://vercel.com にアクセスして、GitHubアカウントでログイン

#### 2. 新しいプロジェクトを作成
1. ダッシュボードの「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションで、GitHubリポジトリを選択
3. `yohei-ny/shindan` を検索して「Import」をクリック

#### 3. プロジェクト設定
以下の設定を確認（デフォルトのままでOK）：

```
Project Name: shindan（または任意の名前）
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 4. 環境変数（必要な場合）
現時点では環境変数は不要です。

#### 5. デプロイ実行
「Deploy」ボタンをクリック

→ 2-3分でデプロイが完了します！

#### 6. デプロイ完了
- デプロイが成功すると、`https://shindan-xxx.vercel.app` のようなURLが発行されます
- 「Visit」ボタンをクリックしてサイトを確認

---

### 方法2: Vercel CLIを使用

#### 1. Vercel CLIをインストール
```bash
npm install -g vercel
```

#### 2. ログイン
```bash
vercel login
```

#### 3. プロジェクトディレクトリに移動
```bash
cd /Users/noumiyouhei/Desktop/sindan/sex-type-diagnosis
```

#### 4. デプロイ
```bash
vercel
```

初回デプロイ時の質問：
```
? Set up and deploy "~/Desktop/sindan/sex-type-diagnosis"? [Y/n] y
? Which scope do you want to deploy to? (自分のアカウント名)
? Link to existing project? [y/N] n
? What's your project's name? shindan
? In which directory is your code located? ./
```

#### 5. 本番デプロイ
```bash
vercel --prod
```

---

## 自動デプロイの設定

### GitHubとの連携（自動デプロイ）

Vercelダッシュボードから設定すると、GitHubにプッシュするたびに自動でデプロイされます。

#### 手順:
1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」→「Git」タブ
3. 「Connected Git Repository」が表示されていることを確認

#### 動作:
- **mainブランチにプッシュ** → 本番環境に自動デプロイ
- **他のブランチにプッシュ** → プレビュー環境に自動デプロイ

---

## カスタムドメインの設定

### 独自ドメインを使用する場合

#### 1. Vercelダッシュボードでドメインを追加
1. プロジェクトの「Settings」→「Domains」
2. 「Add」ボタンをクリック
3. 使用したいドメイン名を入力（例: `sex-type-diagnosis.com`）

#### 2. DNSレコードを設定
ドメインレジストラ（お名前.com、ムームードメイン等）で以下を設定：

**Aレコード:**
```
Type: A
Name: @ (または空欄)
Value: 76.76.21.21
```

**CNAMEレコード（www用）:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### 3. SSL証明書の自動発行
Vercelが自動的にSSL証明書（Let's Encrypt）を発行します。

---

## デプロイ後の確認事項

### ✅ チェックリスト

1. **トップページが表示される**
   - https://your-site.vercel.app/

2. **診断が正しく動作する**
   - 性別選択 → 質問回答 → 結果表示

3. **結果ページが表示される**
   - 12タイプすべて確認

4. **シェア機能が動作する**
   - Twitter、LINE、リンクコピー

5. **法的ページが表示される**
   - /terms（利用規約）
   - /privacy（プライバシーポリシー）
   - /about（このサイトについて）

6. **レスポンシブデザインが正しい**
   - モバイル、タブレット、PCで確認

---

## トラブルシューティング

### ビルドエラーが発生する

#### 確認事項:
```bash
# ローカルでビルドを確認
npm run build
```

#### よくあるエラー:
1. **TypeScriptエラー**: 型の不一致を修正
2. **ESLintエラー**: `npm run lint`で確認
3. **依存関係エラー**: `package.json`を確認

---

### デプロイは成功したが、ページが表示されない

#### 確認事項:
1. Vercelのデプロイログを確認
2. ブラウザのコンソール（F12）でエラーを確認
3. Next.jsのルーティングが正しいか確認

---

### 環境変数が反映されない

#### 対処法:
1. Vercelダッシュボード → Settings → Environment Variables
2. 変数を追加後、再デプロイが必要
3. `vercel --prod`で再デプロイ

---

## パフォーマンス最適化

### 画像最適化
Next.js Imageコンポーネントを使用すると自動で最適化されます。

### キャッシュ設定
Vercelが自動的に最適なキャッシュ設定を行います。

### Analytics設定
Vercelダッシュボード → Analytics で利用状況を確認できます。

---

## デプロイの更新方法

### コードを変更した場合

#### 1. ローカルで変更
```bash
# ファイルを編集...

# テスト
npm run dev

# ビルド確認
npm run build
```

#### 2. GitHubにプッシュ
```bash
git add .
git commit -m "変更内容の説明"
git push
```

#### 3. 自動デプロイ
GitHubにプッシュすると、Vercelが自動的に検知してデプロイを開始します。

---

## デプロイの監視

### Vercelダッシュボードで確認できる情報

1. **デプロイメント履歴**
   - 各デプロイの成功/失敗
   - デプロイ時刻とコミット情報

2. **ビルドログ**
   - ビルドの詳細ログ
   - エラーメッセージ

3. **アナリティクス**
   - ページビュー
   - ユニークビジター
   - 地域別アクセス

4. **パフォーマンス**
   - ページの読み込み速度
   - Core Web Vitals

---

## ロールバック（前のバージョンに戻す）

### 手順:
1. Vercelダッシュボード → Deployments
2. 戻したいデプロイメントを選択
3. 「...」メニュー → 「Promote to Production」

---

## コスト

### Vercel無料プラン（Hobby）
- **月間リクエスト**: 100 GB
- **ビルド時間**: 100時間/月
- **チームメンバー**: 1人
- **カスタムドメイン**: 無制限
- **SSL証明書**: 自動発行

**十分な容量です！**

---

## セキュリティ

### 推奨設定

1. **HTTPS強制**: Vercelがデフォルトで有効
2. **セキュリティヘッダー**: next.config.jsで設定可能
3. **環境変数の暗号化**: Vercelが自動で暗号化

---

## まとめ

### デプロイの流れ
1. GitHubにコードをプッシュ
2. Vercelでプロジェクトをインポート
3. 「Deploy」ボタンをクリック
4. 2-3分で完了！

### 自動デプロイの流れ
1. ローカルでコードを編集
2. `git push`でGitHubにプッシュ
3. Vercelが自動検知して再デプロイ
4. 完了通知がSlackやメールで届く

### 次のステップ
1. カスタムドメインを設定
2. Google Analyticsを追加
3. OGP画像を最適化
4. SEO対策を実施

---

## 参考リンク

- **Vercel公式ドキュメント**: https://vercel.com/docs
- **Next.jsデプロイガイド**: https://nextjs.org/docs/app/building-your-application/deploying
- **Vercelダッシュボード**: https://vercel.com/dashboard

---

## サポート

デプロイに関する質問や問題がある場合：
- Vercel公式ドキュメントを確認
- Vercel Communityで質問
- TwitterでVercelサポートに問い合わせ

デプロイ成功を祈っています！ 🚀
