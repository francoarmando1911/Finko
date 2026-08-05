import { ImageResponse } from "next/og";

/** @description Apple touch icon — versión grande para pantalla de inicio iOS */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background: "#5c1a24",
        }}
      >
        <span
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "sans-serif",
          }}
        >
          F.
        </span>
      </div>
    ),
    { ...size }
  );
}