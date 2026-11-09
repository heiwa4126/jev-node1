import { readFile } from "node:fs/promises";
import { choice, image, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

const photo = await readFile("example/imgs/ex1.jpg");
const client = new TypeSafeClient({
	defaultHeaders: { "TypeSafe-Danger-Zone-Images": "true" }
});

const response = await client.systemOne({
	state: { photo: image(photo) },
	questions: {
		cat_present: noul("Is there a cat in `photo`?"),
		animal: choice("Which animal is in `photo`?", {
			cat: null,
			dog: null,
			bird: null
		}),
		bread_browning: score("How browned is the bread in `photo`?", ["pale", "medium", "dark"])
	}
});

console.log(JSON.stringify(response, null, 2));
