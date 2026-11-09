import { readFile, mkdir } from "node:fs/promises";
import { box, image, TypeSafeClient } from "@typesafe-ai/sdk";
import sharp from "sharp";

// 入力画像、出力先、画像内で探す対象。
const inputPath = "example/imgs/ex1.jpg";
const outputPath = "tmp/ex1.jpg";
const items = [
	"coffee mug",
	"cat",
	"croissant",
	"bread loaf",
	"apple",
	"orange",
	"fruit bowl",
	"knife",
	"utensil holder",
	"potted plant"
];

// 画像機能を有効にし、各対象の Box をまとめて問い合わせる。
// Box は対象が画像内にない場合でも矩形を返すため、結果の確認が必要。
const photo = await readFile(inputPath);
const client = new TypeSafeClient({
	defaultHeaders: { "TypeSafe-Danger-Zone-Images": "true" }
});
const response = await client.systemOne({
	state: { photo: image(photo) },
	questions: Object.fromEntries(items.map((item) => [item, box(`The ${item} in \`photo\``)])),
	model: "jev-preview"
});

// API の応答全体を JSON として標準出力に表示する。
console.log(JSON.stringify(response, null, 2));

// 割合で返される座標をピクセル座標に変換するため、画像の寸法を取得する。
const { width, height } = await sharp(photo).metadata();
if (!width || !height) {
	throw new Error("Could not read the image dimensions");
}

// 緑色の矩形と左上のラベルを SVG で作成する。文字の黒い縁取りは視認性のため。
const annotations = Object.entries(response.answers)
	.map(([item, answer]) => {
		const { left, top, right, bottom } = answer.box;
		const x = left * width;
		const y = top * height;
		return `<rect x="${x}" y="${y}" width="${(right - left) * width}" height="${(bottom - top) * height}" fill="none" stroke="lime" stroke-width="2" />
<text x="${x + 2}" y="${Math.min(y + 16, height - 2)}" font-family="sans-serif" font-size="16" fill="lime" stroke="black" stroke-width="3" paint-order="stroke">${item}</text>`;
	})
	.join("\n");

// 注釈を元画像に重ね、出力ディレクトリを作成して JPEG で保存する。
const overlay = Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${annotations}</svg>`
);
await mkdir("tmp", { recursive: true });
await sharp(photo)
	.composite([{ input: overlay }])
	.jpeg()
	.toFile(outputPath);
