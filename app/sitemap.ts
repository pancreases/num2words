import { MetadataRoute } from "next";
import { popularNumbers } from "@/lib/converter";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://num2words.in"; // change to your domain

  const numberPages = popularNumbers.map((n) => ({
    url: `${base}/${n}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...numberPages,
  ];
}
