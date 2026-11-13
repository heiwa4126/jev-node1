# jev-node1

Bun で @typesafe-ai/sdk 0.7.0 を使うとエラーになるので、一時的に pnpm と node でやる版。

- 元プロジェクト - [heiwa4126/jev-bun1](https://github.com/heiwa4126/jev-bun1)
- SDK の issue #20 - [0.7.0 fails every request on Bun with "TypeError: Body already used" (bufferResponse) · Issue #20 · typesafe-ai/typesafe-sdk-js](https://github.com/typesafe-ai/typesafe-sdk-js/issues/20)

0.6.0 では "[box](https://docs.typesafe.ai/primitives/box)" が無いんで、しばらくこっちで。

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

### BOXサンプルコード

[box](https://docs.typesafe.ai/primitives/box) は CV っぽいやつ。画面から指定した物体の位置を得る。

```sh
# 画像内の対象を Box で検索し、結果の JSON と注釈付き画像を出力
pnpm box1 # 画像は tmp/ex1.jpg に保存
```

入力`example/imgs/ex1.jpg`に対して  
![example/imgs/ex1.jpg](docs/imgs/ex1-i.jpg)

`tmp/ex1.jpg`のような画像が出力される。  
![tmp/ex1.jpg](docs/imgs/ex1-o.jpg)

### 画像サンプルコード

上と同じ画像で

- Noul -「猫が写っている?」→ 0〜1
- Choice -「写っている動物は?」→ cat/dog/bird
- Score -「パンの焼け具合?」→ pale/medium/dark

を問い合わせる例:

```sh
# 画像に対して Noul、Choice、Score を問い合わせる
pnpm run img1
```

- 猫の Noul は 0.97
- Choice は cat (0.98), dog(0.02)
- パンの Score は medium (0.77)

になりました。

## メモ

`@typesafe-ai/sdk`は 0.7.0 を使用しています。

0.7.0 は Bun で
`TypeError: Body already used`になる問題がありますが（[typesafe-sdk-js#20](https://github.com/typesafe-ai/typesafe-sdk-js/issues/20)）、
Node.js では発生しません。
