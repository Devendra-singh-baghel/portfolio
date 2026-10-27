import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const inputPath = process.argv[2] || path.resolve("public/images/profile2.png");
const outputPath = process.argv[3] || path.resolve("public/images/og-portrait.png");
const targetHeight = Number.parseInt(process.argv[4] || "420", 10);

async function makeOgPortrait() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  console.log(`Reading source: ${inputPath}`);
  const img = sharp(inputPath);
  const meta = await img.metadata();
  console.log(`Source dimensions: ${meta.width}x${meta.height}`);

  // Calculate target width keeping aspect ratio
  const targetWidth = Math.round(targetHeight * (meta.width / meta.height));
  console.log(`Target dimensions: ${targetWidth}x${targetHeight}`);

  // Resize with lanczos3 filter and convert to grayscale/brightness
  const { data, info } = await sharp(inputPath)
    .resize(targetWidth, targetHeight, { fit: "contain" })
    .modulate({ saturation: 0, brightness: 0.88 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Parameters for radial elliptical mask
  const cx = 0.5 * width;
  const cy = 0.38 * height;
  const rx = 0.52 * width;
  const ry = 0.62 * height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const originalAlpha = data[idx + 3];

      // Never touch or raise transparent pixels
      if (originalAlpha === 0) {
        continue;
      }

      // 1. Tonal adjustment (contrast 1.1 + 25% background dimming with #0B0B0B = rgb(11, 11, 11))
      // Only affects RGB channels
      let lum = data[idx];
      lum = Math.round((lum - 128) * 1.1 + 128);
      lum = Math.round(lum * 0.75 + 11 * 0.25);
      lum = Math.min(255, Math.max(0, lum));

      data[idx] = lum;
      data[idx + 1] = lum;
      data[idx + 2] = lum;

      // 2. Radial elliptical fade factor
      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;
      const rDist = Math.sqrt(nx * nx + ny * ny);
      let rFactor = 1.0;
      if (rDist > 0.48) {
        if (rDist >= 0.85) {
          rFactor = 0;
        } else {
          rFactor = 1 - (rDist - 0.48) / (0.85 - 0.48);
        }
      }

      // 3. Bottom linear fade factor (fades lower 35% to 0)
      const yNorm = y / height;
      let bFactor = 1.0;
      if (yNorm > 0.65) {
        if (yNorm >= 0.96) {
          bFactor = 0;
        } else {
          bFactor = 1 - (yNorm - 0.65) / (0.96 - 0.65);
        }
      }

      // Combined alpha (always <= originalAlpha, never increases)
      const finalAlpha = Math.min(originalAlpha, Math.round(originalAlpha * rFactor * bFactor));
      data[idx + 3] = finalAlpha;
    }
  }

  // Save optimized PNG
  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  // Verification & statistics
  const outStat = fs.statSync(outputPath);
  const { data: outData, info: outInfo } = await sharp(outputPath).raw().toBuffer({ resolveWithObject: true });

  // Four corner alpha values
  const getCornerAlpha = (px, py) => outData[(py * outInfo.width + px) * outInfo.channels + 3];
  const cornerTopLeft = getCornerAlpha(0, 0);
  const cornerTopRight = getCornerAlpha(outInfo.width - 1, 0);
  const cornerBottomLeft = getCornerAlpha(0, outInfo.height - 1);
  const cornerBottomRight = getCornerAlpha(outInfo.width - 1, outInfo.height - 1);

  // Histogram
  const bins = {
    "0": 0,
    "1-20": 0,
    "21-40": 0,
    "41-60": 0,
    "61-120": 0,
    "121-254": 0,
    "255": 0,
  };

  for (let i = 3; i < outData.length; i += outInfo.channels) {
    const a = outData[i];
    if (a === 0) bins["0"]++;
    else if (a <= 20) bins["1-20"]++;
    else if (a <= 40) bins["21-40"]++;
    else if (a <= 60) bins["41-60"]++;
    else if (a <= 120) bins["61-120"]++;
    else if (a < 255) bins["121-254"]++;
    else bins["255"]++;
  }

  console.log(`\nCleaned portrait written to: ${outputPath}`);
  console.log(`Dimensions: ${outInfo.width}x${outInfo.height}`);
  console.log(`File size: ${(outStat.size / 1024).toFixed(2)} KB (${outStat.size} bytes)`);
  console.log("\nCorner alpha values:");
  console.log(`  Top-Left (0, 0): ${cornerTopLeft}`);
  console.log(`  Top-Right (${outInfo.width - 1}, 0): ${cornerTopRight}`);
  console.log(`  Bottom-Left (0, ${outInfo.height - 1}): ${cornerBottomLeft}`);
  console.log(`  Bottom-Right (${outInfo.width - 1}, ${outInfo.height - 1}): ${cornerBottomRight}`);
  console.log("\nAlpha histogram of output:");
  console.log(bins);
}

makeOgPortrait().catch((err) => {
  console.error("Error making OG portrait:", err);
  process.exit(1);
});
