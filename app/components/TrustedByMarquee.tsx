import Image from "next/image";

const aiTools = [
  { name: "ChatGPT", logo: "/logos/chatgpt.svg" },
  { name: "Claude", logo: "/logos/claude.svg" },
  { name: "Midjourney", logo: "/logos/midjourney.svg" },
  { name: "Gemini", logo: "/logos/gemini.svg" },
  { name: "Notion AI", logo: "/logos/notion.svg" },
  { name: "Perplexity", logo: "/logos/perplexity.svg" },
  { name: "Runway", logo: "/logos/runway.svg" },
  { name: "GitHub Copilot", logo: "/logos/copilot.svg" },
];

export function TrustedByMarquee() {
  return (
    <section className="bg-background px-6 py-16 sm:px-10">
      <p className="mb-7 text-center font-body text-[13px] font-medium  tracking-wide text-foreground-muted">
        Les outils que tu apprendras à maîtriser
      </p>

      <div className="relative mx-auto max-w-4xl overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-marquee items-center gap-4">
          {[...aiTools, ...aiTools].map((tool, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2.5"
            >
              <Image
                src={tool.logo}
                alt={tool.name}
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain"
              />
              <span className="font-body text-sm font-medium text-foreground">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}