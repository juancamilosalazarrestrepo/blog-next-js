// Genera public/images/locosc-dark.webp: la palabra "SALAZAR" (navy) pasa a claro para fondos oscuros.
// El isotipo (x < 200) y "CODE" (azul brillante, verde > 80) no se tocan.
import sharp from "sharp";

const SRC = "public/images/locosc.webp";
const OUT = "public/images/locosc-dark.webp";
const LIGHT = [232, 237, 247]; // --ink oscuro (#e8edf7)

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let y = 0; y < info.height; y++) {
  for (let x = 200; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a > 0 && r < 60 && g < 80 && b > r) {
      data[i] = LIGHT[0];
      data[i + 1] = LIGHT[1];
      data[i + 2] = LIGHT[2];
    }
  }
}
await sharp(data, { raw: info }).webp({ quality: 95 }).toFile(OUT);
console.log("ok", OUT);
