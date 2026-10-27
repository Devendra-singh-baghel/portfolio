import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Devendra Singh Baghel - Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const portraitPath = path.join(
    process.cwd(),
    "public",
    "images",
    "og-portrait.png"
  );
  const portraitBuffer = fs.readFileSync(portraitPath);
  const portraitBase64 = `data:image/png;base64,${portraitBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0B0B",
          border: "1px solid #262626",
          fontFamily: "sans-serif",
        }}
      >
        {/* Central 600px composition container (safe for WhatsApp ~630px square crop) */}
        <div
          style={{
            position: "relative",
            width: "600px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "88px",
          }}
        >
          {/*
            Portrait:
            - Positioned at bottom: 114px, height: 420px -> top sits at y = 96px (630 - 114 - 420 = 96px)
            - Horizontally centered in the 600px column
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitBase64}
            width={310}
            height={420}
            alt=""
            style={{
              position: "absolute",
              bottom: "114px",
              left: "145px",
            }}
          />

          {/*
            Name and Lime Accent Bar:
            - Name: 64px bold, fits on one line within 600px width
            - Positioned over lower chest where portrait fades to #0B0B0B
            - Lime accent bar: 120x6px, bottom margin 88px balances top margin 96px
          */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "64px",
                fontWeight: 700,
                color: "#F4F2EC",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              Devendra Singh
            </div>

            <div
              style={{
                display: "flex",
                width: "120px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: "#C9F56A",
                marginTop: "16px",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
