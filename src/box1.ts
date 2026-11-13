import { readFile } from "node:fs/promises";
import { annotateBoxes } from "./box-annotate.ts";

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

const photo = await readFile(inputPath);
await annotateBoxes(
	photo,
	Object.fromEntries(items.map((item) => [item, `The ${item} in \`photo\``])),
	outputPath
);
