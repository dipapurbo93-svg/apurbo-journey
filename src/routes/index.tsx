import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apurbo Kumar Dip — EEE, AI & Automation" },
      { name: "description", content: "The personal portfolio of Apurbo Kumar Dip, an EEE student exploring artificial intelligence, automation, electronics, and emerging technology." },
      { property: "og:title", content: "Apurbo Kumar Dip — EEE, AI & Automation" },
      { property: "og:description", content: "EEE student building at the intersection of engineering, AI, and intelligent automation." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <PortfolioPage />;
}
