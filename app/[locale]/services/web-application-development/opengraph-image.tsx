import { generateServiceOgImage, ogSize, ogContentType } from "@/lib/og-utils";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Web Application Development — GoQode";

export default async function Image() {
  return generateServiceOgImage("Web Application Development");
}
