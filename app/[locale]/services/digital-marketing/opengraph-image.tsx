import { generateServiceOgImage, ogSize, ogContentType } from "@/lib/og-utils";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Digital Marketing — GoQode";

export default async function Image() {
  return generateServiceOgImage("Digital Marketing");
}
