import { ImageResponse } from "next/og";

export const alt = "GoQode Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          fontFamily: "sans-serif",
          padding: "48px",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#3b82f6",
            textTransform: "uppercase",
            letterSpacing: "4px",
            marginBottom: "24px",
          }}
        >
          Case Study
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: "-1px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: 800,
              color: "white",
            }}
          >
            G
          </div>
          <div style={{ fontSize: "18px", color: "#666" }}>goqode.agency</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
