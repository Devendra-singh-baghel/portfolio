import { ImageResponse } from "next/og";

export const alt = "Devendra Singh Baghel - Full-Stack Developer";
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0B0B",
          border: "1px solid #262626",
          fontFamily: "sans-serif",
          padding: "40px",
          textAlign: "center",
        }}
      >
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
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1.08,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "88px",
                fontWeight: 700,
                color: "#F4F2EC",
                letterSpacing: "-0.02em",
              }}
            >
              Devendra
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "88px",
                fontWeight: 700,
                color: "#F4F2EC",
                letterSpacing: "-0.02em",
              }}
            >
              Singh Baghel
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "120px",
              height: "6px",
              borderRadius: "3px",
              backgroundColor: "#C9F56A",
              marginTop: "36px",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
