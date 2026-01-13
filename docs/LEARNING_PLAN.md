# NestJS 10日間マスター学習プラン

NestJS公式ドキュメント(https://docs.nestjs.com/)に基づいた体系的な学習プランです。

---

## Day 1: 基礎概念とセットアップ
**目標**: NestJSの思想を理解し、開発環境を構築する

### 学習内容
- [Introduction](https://docs.nestjs.com/) - NestJSとは何か、なぜ使うのか
- [First Steps](https://docs.nestjs.com/first-steps) - プロジェクト作成と基本構造
- [Controllers](https://docs.nestjs.com/controllers) - ルーティングとリクエスト処理

### 実践課題
- NestJS CLIでプロジェクトを作成
- 簡単なGET/POSTエンドポイントを実装
- デコレータ（`@Get()`, `@Post()`, `@Body()`, `@Param()`）を使いこなす

---

## Day 2: 依存性注入とモジュール
**目標**: NestJSのDIシステムとモジュール構造を理解する

### 学習内容
- [Providers](https://docs.nestjs.com/providers) - サービスと依存性注入
- [Modules](https://docs.nestjs.com/modules) - モジュール設計とカプセル化

### 実践課題
- Serviceクラスを作成しControllerから利用
- 複数モジュールに分割したアプリケーションを構築
- `exports`/`imports`でモジュール間の依存関係を管理

---

## Day 3: ミドルウェアとパイプ
**目標**: リクエスト処理パイプラインを理解する

### 学習内容
- [Middleware](https://docs.nestjs.com/middleware) - リクエスト前処理
- [Pipes](https://docs.nestjs.com/pipes) - データ変換とバリデーション
- [Validation](https://docs.nestjs.com/techniques/validation) - class-validatorを使った検証

### 実践課題
- ロギング用ミドルウェアを作成
- DTOとValidationPipeでリクエストバリデーションを実装
- カスタムパイプを作成

---

## Day 4: 例外処理とガード
**目標**: エラーハンドリングと認可を実装できるようになる

### 学習内容
- [Exception Filters](https://docs.nestjs.com/exception-filters) - 例外処理
- [Guards](https://docs.nestjs.com/guards) - 認可処理

### 実践課題
- カスタム例外フィルターを作成
- HTTPエラーレスポンスをカスタマイズ
- ロールベースのGuardを実装

---

## Day 5: インターセプターとカスタムデコレータ
**目標**: 横断的関心事を実装する

### 学習内容
- [Interceptors](https://docs.nestjs.com/interceptors) - リクエスト/レスポンスの変換
- [Custom Decorators](https://docs.nestjs.com/custom-decorators) - カスタムデコレータ作成

### 実践課題
- レスポンス変換インターセプター作成
- 実行時間計測インターセプター作成
- `@CurrentUser()`のようなカスタムデコレータを作成

---

## Day 6: データベース連携
**目標**: TypeORMまたはPrismaでDBを操作する

### 学習内容
- [Database](https://docs.nestjs.com/techniques/database) - TypeORM連携
- [Configuration](https://docs.nestjs.com/techniques/configuration) - 環境変数管理

### 実践課題
- TypeORM（またはPrisma）でPostgreSQLに接続
- Entity/Repositoryパターンでのデータアクセス
- ConfigModuleで環境変数を管理

---

## Day 7: 認証とセキュリティ
**目標**: JWT認証を実装できるようになる

### 学習内容
- [Authentication](https://docs.nestjs.com/security/authentication) - Passport連携
- [Authorization](https://docs.nestjs.com/security/authorization) - 認可の実装
- [Encryption and Hashing](https://docs.nestjs.com/security/encryption-and-hashing) - パスワードハッシュ

### 実践課題
- JWTベースの認証システムを実装
- Passport Local/JWT戦略を使用
- bcryptでパスワードハッシュ化

---

## Day 8: テストとドキュメント
**目標**: 品質の高いコードを書けるようになる

### 学習内容
- [Testing](https://docs.nestjs.com/fundamentals/testing) - ユニット/E2Eテスト
- [OpenAPI (Swagger)](https://docs.nestjs.com/openapi/introduction) - APIドキュメント生成

### 実践課題
- サービスのユニットテストを作成
- Controllerのe2eテストを作成
- Swagger UIでAPIドキュメントを自動生成

---

## Day 9: 高度なテクニック
**目標**: 実践的な機能を実装する

### 学習内容
- [Caching](https://docs.nestjs.com/techniques/caching) - キャッシュ戦略
- [Task Scheduling](https://docs.nestjs.com/techniques/task-scheduling) - 定期実行タスク
- [Queues](https://docs.nestjs.com/techniques/queues) - 非同期ジョブ処理
- [File Upload](https://docs.nestjs.com/techniques/file-upload) - ファイルアップロード

### 実践課題
- Redis/インメモリキャッシュを導入
- cronジョブでバッチ処理を実装
- Bullを使ったキュー処理

---

## Day 10: 応用と総合プロジェクト
**目標**: 学んだ知識を統合してアプリケーションを完成させる

### 学習内容
- [WebSockets](https://docs.nestjs.com/websockets/gateways) - リアルタイム通信
- [Microservices](https://docs.nestjs.com/microservices/basics) - マイクロサービス概要
- [Performance (Fastify)](https://docs.nestjs.com/techniques/performance) - パフォーマンス最適化

### 総合プロジェクト
以下の機能を持つREST APIを構築:
- ユーザー登録/ログイン（JWT認証）
- CRUD操作（TypeORM/Prisma）
- バリデーション/エラーハンドリング
- Swagger APIドキュメント
- ユニット/E2Eテスト

---

## 学習のコツ

1. **毎日コードを書く** - 読むだけでなく手を動かす
2. **公式ドキュメントを読む** - 最も信頼できる情報源
3. **エラーを恐れない** - エラーメッセージから学ぶ
4. **小さく始める** - 複雑な機能は分解して実装

## 推奨リソース

- 公式ドキュメント: https://docs.nestjs.com/
- NestJS GitHub: https://github.com/nestjs/nest
- 公式サンプル: https://github.com/nestjs/nest/tree/master/sample
