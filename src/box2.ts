import { readFile } from "node:fs/promises";
import { annotateBoxes } from "./box-annotate.ts";

// 入力画像、出力先、画像内で探す対象。
const inputPath = "example/imgs/ex2.jpg";
const outputPath = "tmp/ex2.jpg";
const items = [
	"Any cat",
	"The orange cat",
	"The tabby cat",
	"The tuxedo cat",
	"The black sheep",
	"Abraham Lincoln"
];

const photo = await readFile(inputPath);
await annotateBoxes(
	photo,
	Object.fromEntries(items.map((item) => [item, `${item} in \`photo\``])),
	outputPath
);
