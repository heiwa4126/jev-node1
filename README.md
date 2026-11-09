# jev-node1

Bun で @typesafe-ai/sdk 0.7.0 を使うとエラーになるので、一時的に pnpm と node でやる版

[0.7.0 fails every request on Bun with "TypeError: Body already used" (bufferResponse) · Issue #20 · typesafe-ai/typesafe-sdk-js](https://github.com/typesafe-ai/typesafe-sdk-js/issues/20)

0.6.0 では "box" が無い。

## 必要なもの

- Node.js 22.18 以降、または 23.6 以降（`.ts`を直接実行するため。`--env-file-if-exists`は 22.9 以降）
- pnpm

## 開発

初期設定:

```bash
# 依存パッケージをインストール
pnpm install
# APIキーを設定
cp .env.example .env
## で .env を編集
```

最初の実行:

```bash
# https://docs.typesafe.ai/sdk/javascript にあるサンプルそのまま
pnpm ex0
```

### さらなるサンプル

```sh
# Playground の Noul のサンプル「ホットドックはサンドイッチか?」を API で
pnpm noul1
pnpm noul2 # placeholder 使用
pnpm noul3 # 並列問い合わせ
# noul1 を改造して、日本語のテスト「バナナはおやつに入りますか?」
pnpm j-noul1

# 複数タイプの問い合わせをいっぺんに
pnpm multi1
```

### フォーマッタ / リンター

[oxc](https://oxc.rs/) の [oxfmt](https://oxc.rs/docs/guide/usage/formatter) と [oxlint](https://oxc.rs/docs/guide/usage/linter) を使用。

```sh
pnpm format   # oxfmt で整形
pnpm lint     # oxlint
pnpm check    # format + lint
pnpm lint-tsc # tsc --noEmit による型チェック
```

## 注意

`@typesafe-ai/sdk`は 0.7.0 を使用しています。0.7.0 は Bun で
`TypeError: Body already used`になる問題がありますが（[typesafe-sdk-js#20](https://github.com/typesafe-ai/typesafe-sdk-js/issues/20)）、
Node.js では発生しません。
