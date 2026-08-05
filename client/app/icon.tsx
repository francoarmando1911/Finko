import { ImageResponse } from "next/og";

/** @description Favicon dinámico — cuadrado burgundy con "F." en blanco */
export const size = { width: 32, height: 32 };
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
          borderRadius: 8,
          background: "#5c1a24",
        }}
      >
        <span
          style={{
            fontSize: 18,
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