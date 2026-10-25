import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const inputPath = process.argv[2] || path.resolve("docs/reference/profile2-original.png");
const outputPath = process.argv[3] || path.resolve("public/images/profile2.png");
const threshold = Number.parseInt(process.argv[4] || "40", 10);

function computeHistogram(data, channels) {
  const bins = {
    "0": 0,
    "1-20": 0,
    "21-40": 0,
    "41-60": 0,
    "61-120": 0,
    "121-254": 0,
    "255": 0,
  };

  for (let i = 3; i < data.length; i += channels) {
    const a = data[i];
    if (a === 0) bins["0"]++;
    else if (a <= 20) bins["1-20"]++;
    else if (a <= 40) bins["21-40"]++;
    else if (a <= 60) bins["41-60"]++;
    else if (a <= 120) bins["61-120"]++;
    else if (a < 255) bins["121-254"]++;
    else bins["255"]++;
  }

  return bins;
}

async function cleanPortrait() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  console.log(`Reading: ${inputPath}`);
  console.log(`Threshold: ${threshold}`);

  const img = sharp(inputPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  console.log(`Original dimensions: ${width}x${height} (${channels} channels)`);
  const beforeHist = computeHistogram(data, channels);
  console.log("Alpha histogram BEFORE cleaning:", beforeHist);

  // 1. Threshold and remap alpha
  const alphaCleaned = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const a = data[i * channels + 3];
    if (a < threshold) {
      alphaCleaned[i] = 0;
    } else {
      alphaCleaned[i] = Math.round(((a - threshold) / (255 - threshold)) * 255);
    }
  }

  // 2. 1px feather (3x3 Gaussian smoothing on transition edge pixels)
  const alphaFeathered = new Uint8Array(width * height);
  const kernel = [
    1, 2, 1,
    2, 4, 2,
    1, 2, 1,
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;

      // Interior pixel surrounded by 255 stays solid
      if (alphaCleaned[idx] === 255) {
        let isSolid = true;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny < 0 || ny >= height || nx < 0 || nx >= width || alphaCleaned[ny * width + nx] !== 255) {
              isSolid = false;
              break;
            }
          }
          if (!isSolid) break;
        }
        if (isSolid) {
          alphaFeathered[idx] = 255;
          continue;
        }
      }

      // Outer pixel surrounded by 0 stays zero
      if (alphaCleaned[idx] === 0) {
        let isZero = true;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < height && nx >= 0 && nx < width && alphaCleaned[ny * width + nx] > 0) {
              isZero = false;
              break;
            }
          }
          if (!isZero) break;
        }
        if (isZero) {
          alphaFeathered[idx] = 0;
          continue;
        }
      }

      // Convolve transition pixels
      let sum = 0;
      let kSum = 0;
      let kIdx = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          const k = kernel[kIdx++];
          if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
            sum += alphaCleaned[ny * width + nx] * k;
            kSum += k;
          }
        }
      }
      alphaFeathered[idx] = Math.round(sum / kSum);
    }
  }

  // 3. Assemble cleaned RGBA buffer
  const outBuffer = Buffer.from(data);
  for (let i = 0; i < width * height; i++) {
    outBuffer[i * channels + 3] = alphaFeathered[i];
  }

  // 4. Add 24px transparent top padding using sharp extend
  const extendedImg = sharp(outBuffer, {
    raw: {
      width,
      height,
      channels,
    },
  }).extend({
    top: 24,
    bottom: 0,
    left: 0,
    right: 0,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  const finalPng = await extendedImg.png({ compressionLevel: 9 }).toBuffer();
  fs.writeFileSync(outputPath, finalPng);

  // 5. Verify final output
  const finalMeta = await sharp(outputPath).metadata();
  const { data: finalData, info: finalInfo } = await sharp(outputPath).raw().toBuffer({ resolveWithObject: true });
  const afterHist = computeHistogram(finalData, finalInfo.channels);

  console.log(`\nCleaned image written to: ${outputPath}`);
  console.log(`New dimensions: ${finalMeta.width}x${finalMeta.height}`);
  console.log("Alpha histogram AFTER cleaning (with 24px transparent top padding):", afterHist);
}

cleanPortrait().catch((err) => {
  console.error("Error cleaning portrait:", err);
  process.exit(1);
});
