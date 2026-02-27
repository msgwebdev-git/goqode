import { generateServiceOgImage, ogSize, ogContentType } from "@/lib/og-utils";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Corporate Website Development — GoQode";

export default async function Image() {
  return generateServiceOgImage("Corporate Website Development");
}
