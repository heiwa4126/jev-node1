import { readFile } from "node:fs/promises";
import { annotateBoxes } from "./box-annotate.ts";
import { coco80Items } from "./coco80.ts";

// 入力画像、出力先、画像内で探す対象。
const inputPath = "example/imgs/ex3.jpg";
const outputPath = "tmp/ex3.jpg";

const photo = await readFile(inputPath);
await annotateBoxes(
	photo,
	Object.fromEntries(coco80Items.map((item) => [item, `${item} in \`photo\``])),
	outputPath
);
