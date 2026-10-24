import { ImageResponse } from "next/og";

export const alt = "Devendra Singh Baghel - Backend-focused Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0B0B",
          padding: "80px",
          border: "1px solid #262626",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#C9F56A",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#A09D96",
            }}
          >
            Portfolio
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 700,
              color: "#F4F2EC",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Devendra Singh Baghel
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              fontWeight: 400,
              color: "#A09D96",
              lineHeight: 1.3,
            }}
          >
            Backend-focused Full-Stack Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "80px",
            height: "4px",
            borderRadius: "2px",
            backgroundColor: "#C9F56A",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
