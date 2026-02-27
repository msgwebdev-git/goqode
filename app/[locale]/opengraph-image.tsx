import { ImageResponse } from "next/og";

export const alt = "GoQode — Web Development & Digital Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const taglines: Record<string, string> = {
    ro: "Dezvoltare Web & Soluții Digitale",
    en: "Web Development & Digital Solutions",
    ru: "Веб-разработка и Цифровые решения",
  };

  const tagline = taglines[locale] || taglines.en;

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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 800,
              color: "white",
            }}
          >
            G
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            GoQode
          </div>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#a0a0a0",
            fontWeight: 400,
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "16px",
            color: "#666",
          }}
        >
          goqode.agency
        </div>
      </div>
    ),
    { ...size }
  );
}
