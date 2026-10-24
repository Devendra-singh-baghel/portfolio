import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0B0B",
          borderRadius: "6px",
          border: "1px solid #262626",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            fontWeight: 700,
            color: "#C9F56A",
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          D
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
