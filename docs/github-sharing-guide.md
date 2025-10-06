# GitHubリポジトリの共有ガイド

このドキュメントでは、GitHubリポジトリを他の人と共有する方法を説明します。

## リポジトリ情報

- **リポジトリ名**: `shindan`
- **オーナー**: `yohei-ny`
- **リポジトリURL**: https://github.com/yohei-ny/shindan
- **SSH URL**: git@github.com:yohei-ny/shindan.git

---

## 共有方法

### 方法1: コラボレーターとして招待する（推奨）

他の人に**書き込み権限**を与えて、直接コミット・プッシュできるようにします。

#### 手順:

1. **GitHubにアクセス**
   - https://github.com/yohei-ny/shindan にアクセス

2. **Settings（設定）に移動**
   - リポジトリページの上部メニューから「Settings」をクリック

3. **Collaborators（コラボレーター）を選択**
   - 左サイドバーから「Collaborators」をクリック
   - パスワード認証が求められる場合があります

4. **Add people（人を追加）**
   - 「Add people」ボタンをクリック
   - 招待したい人の**GitHubユーザー名**または**メールアドレス**を入力
   - 候補が表示されたら選択して「Add to this repository」をクリック

5. **招待を送信**
   - 相手に招待メールが送信されます
   - 相手が招待を承認すると、リポジトリにアクセスできるようになります

#### 権限:
- **Write（書き込み）権限**: コミット、プッシュ、プルリクエストのマージが可能
- **Admin（管理者）権限**: リポジトリの設定変更も可能（必要に応じて）

---

### 方法2: リポジトリを公開する

リポジトリを**パブリック（公開）**にすると、誰でも閲覧・クローンできます。

⚠️ **注意**: 公開すると世界中の誰でもコードを見ることができます。

#### 手順:

1. **Settings（設定）に移動**
   - https://github.com/yohei-ny/shindan/settings

2. **Danger Zone（危険ゾーン）まで下にスクロール**
   - ページの一番下にある「Danger Zone」セクション

3. **Change visibility（可視性を変更）**
   - 「Change visibility」ボタンをクリック
   - 「Change to public」を選択
   - リポジトリ名を入力して確認

#### 公開後:
- URLを知っている人は誰でもアクセス可能
- 検索エンジンにインデックスされる可能性あり
- 書き込みはできない（読み取り専用）

---

### 方法3: 特定のブランチだけ共有する

特定のブランチやフォルダだけを共有したい場合。

#### 手順:

1. **新しいブランチを作成**
   ```bash
   git checkout -b share-branch
   git push -u origin share-branch
   ```

2. **Branch protection（ブランチ保護）を設定**
   - Settings → Branches → Add rule
   - `share-branch` を保護対象に設定

3. **URLを共有**
   - https://github.com/yohei-ny/shindan/tree/share-branch

---

## クローン方法（相手側）

### HTTPS（推奨）
```bash
git clone https://github.com/yohei-ny/shindan.git
cd shindan
npm install
npm run dev
```

### SSH（GitHubにSSH鍵を登録している場合）
```bash
git clone git@github.com:yohei-ny/shindan.git
cd shindan
npm install
npm run dev
```

---

## 共同作業のワークフロー

### コラボレーターが追加されたら

#### 1. リポジトリをクローン
```bash
git clone https://github.com/yohei-ny/shindan.git
cd shindan
npm install
```

#### 2. 新しいブランチで作業
```bash
# 最新のmainブランチを取得
git checkout main
git pull origin main

# 作業用ブランチを作成
git checkout -b feature/my-new-feature

# ファイルを編集...

# 変更をコミット
git add .
git commit -m "Add new feature"

# GitHubにプッシュ
git push -u origin feature/my-new-feature
```

#### 3. プルリクエストを作成
1. GitHubのリポジトリページにアクセス
2. 「Compare & pull request」ボタンをクリック
3. タイトルと説明を入力
4. 「Create pull request」をクリック

#### 4. レビューとマージ
1. オーナーがコードをレビュー
2. 問題なければ「Merge pull request」
3. ローカルのmainブランチを更新
   ```bash
   git checkout main
   git pull origin main
   ```

---

## アクセス権限の種類

| 権限 | できること |
|------|-----------|
| **Read** | リポジトリの閲覧、クローン、Issue作成 |
| **Write** | Readの権限 + コミット、プッシュ、プルリクエストのマージ |
| **Admin** | Writeの権限 + リポジトリ設定の変更、コラボレーター管理 |

---

## トラブルシューティング

### Q1: 招待メールが届かない
- スパムフォルダを確認
- GitHubのNotification設定を確認
- GitHubにログインして https://github.com/yohei-ny/shindan を直接開く

### Q2: プッシュできない（Permission denied）
- コラボレーターとして追加されているか確認
- SSH鍵が正しく設定されているか確認（SSH使用時）
- HTTPSでアクセストークンを使用しているか確認（HTTPS使用時）

### Q3: コンフリクト（競合）が発生した
```bash
# 最新のmainを取得
git checkout main
git pull origin main

# 作業ブランチにマージ
git checkout feature/my-branch
git merge main

# コンフリクトを手動で解決
# ファイルを編集して競合を解消

# 解決後、コミット
git add .
git commit -m "Resolve conflicts"
git push
```

---

## セキュリティ上の注意

### ⚠️ 絶対にコミットしてはいけないもの

- **APIキー、シークレットキー**
- **パスワード**
- **データベースの接続情報**
- **`.env` ファイル**（環境変数）
- **個人情報**

### 安全な共有のために

1. **`.gitignore` を確認**
   ```
   .env
   .env.local
   *.key
   secrets/
   ```

2. **機密情報はGitHub Secretsを使用**
   - Settings → Secrets and variables → Actions

3. **公開前に履歴をチェック**
   ```bash
   git log --all --full-history --source -- .env
   ```

---

## おすすめの運用方法

### 小規模チーム（2-5人）
- **コラボレーター招待**を使用
- **プルリクエスト**でコードレビュー
- **main ブランチを保護**（直接プッシュ禁止）

### オープンソース
- **リポジトリを公開**
- **Forkして開発**
- **プルリクエスト**で貢献を受け付ける

### 個人プロジェクトの共有
- **Read権限**で共有
- 必要に応じて**コラボレーター追加**

---

## GitHub上でのリポジトリURLの見つけ方

1. リポジトリページにアクセス: https://github.com/yohei-ny/shindan
2. 緑色の「Code」ボタンをクリック
3. HTTPSまたはSSHのURLをコピー

![GitHub Code Button](https://docs.github.com/assets/cb-20363/images/help/repository/https-url-clone-cli.png)

---

## まとめ

### すぐに共有したい場合
1. GitHubで Settings → Collaborators
2. 相手のユーザー名を入力して招待
3. 相手が承認すればすぐに共同作業可能

### リポジトリURL
```
https://github.com/yohei-ny/shindan
```

このURLを相手に教えて、上記の招待手順を実行してください！
