import { ImageResponse } from "next/og";
export const alt = "Naoki Yoshida — AI・自動化・Webの相談と制作";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "88px",
        background: "linear-gradient(120deg, #f7f9fc, #e4effb 70%, #ede8fa)",
        color: "#182b45",
      }}
    >
      <div style={{ fontSize: 24, letterSpacing: 5, color: "#406487" }}>
        NAOKI YOSHIDA
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 48,
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.18,
        }}
      >
        <span>Think together.</span>
        <span style={{ color: "#376c9f" }}>Make it simpler.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          fontSize: 23,
          color: "#52677f",
        }}
      >
        AI / AUTOMATION / WEB / DATA
      </div>
      <div
        style={{
          position: "absolute",
          right: 90,
          bottom: 75,
          display: "flex",
          fontSize: 18,
        }}
      >
        Freelance Engineer / Technology Partner
      </div>
    </div>,
    size,
  );
}
