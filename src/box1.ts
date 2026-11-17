import { readFile } from "node:fs/promises";
import { annotateBoxes } from "./box-annotate.ts";

import { ex1Items } from "./items.ts";
// 入力画像、出力先、画像内で探す対象。
const inputPath = "example/imgs/ex1.jpg";
const outputPath = "tmp/ex1.jpg";

const photo = await readFile(inputPath);
await annotateBoxes(
	photo,
	Object.fromEntries(ex1Items.map((item) => [item, `The ${item} in \`photo\``])),
	outputPath
);
