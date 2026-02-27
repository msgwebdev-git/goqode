import { generateServiceOgImage, ogSize, ogContentType } from "@/lib/og-utils";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Landing Page Development — GoQode";

export default async function Image() {
  return generateServiceOgImage("Landing Page Development");
}
