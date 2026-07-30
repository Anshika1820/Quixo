export const categories = ["AI", "Web", "Images", "Videos", "News"];
export const trending = [
    { q: "Best local AI models for laptops", tag: "AI", delta: "+412%" },
    { q: "Arc vs Opera One in 2026", tag: "Browsers", delta: "+188%" },
    { q: "How reasoning models plan", tag: "Research", delta: "+96%" },
    { q: "Design systems in Tailwind v4", tag: "Design", delta: "+74%" },
    { q: "Quiet luxury interior palettes", tag: "Style", delta: "+61%" },
    { q: "Fastest edge runtimes benchmarked", tag: "Infra", delta: "+52%" },
];
export const recent = [
    { q: "framer motion spring presets", when: "12m ago" },
    { q: "oklch color space explained", when: "1h ago" },
    { q: "vector database comparison", when: "yesterday" },
    { q: "espresso ratio for light roast", when: "2d ago" },
];
export const relatedQuestions = [
    "What makes an answer engine different from a search engine?",
    "How does Quixo rank its sources?",
    "Can retrieval reduce hallucinations?",
    "Which models are best for long-context search?",
];
export const sources = [
    { name: "arxiv.org", title: "Retrieval-augmented generation survey", letter: "A" },
    { name: "stanford.edu", title: "Neural IR foundations", letter: "S" },
    { name: "theverge.com", title: "The new answer engines", letter: "T" },
    { name: "wired.com", title: "Search after the ten blue links", letter: "W" },
];
export const webResults = [
    {
        site: "arxiv.org",
        letter: "A",
        title: "Retrieval-Augmented Generation for Knowledge-Intensive Search",
        url: "arxiv.org › cs › ir › 2405.01123",
        snippet: "A dense retriever narrows a corpus to a handful of passages, then a generator conditions on those passages to produce a grounded answer with citations.",
    },
    {
        site: "stanford.edu",
        letter: "S",
        title: "Neural Information Retrieval: from BM25 to late interaction",
        url: "web.stanford.edu › class › neural-ir",
        snippet: "Lexical scoring still anchors recall, while learned embeddings capture intent. Hybrid pipelines consistently outperform either approach alone.",
    },
    {
        site: "theverge.com",
        letter: "T",
        title: "Answer engines are quietly replacing the results page",
        url: "theverge.com › answer-engines",
        snippet: "Instead of ten blue links, the modern surface is a synthesized answer with legible provenance — and links become evidence rather than destinations.",
    },
    {
        site: "wired.com",
        letter: "W",
        title: "Inside the race to make search feel instant again",
        url: "wired.com › search-latency",
        snippet: "Streaming tokens, speculative retrieval, and edge caching combine to keep perceived latency under 300ms for most conversational queries.",
    },
];
export const imageResults = [
    { label: "Vector index map", from: "arxiv.org", hue: 18 },
    { label: "Embedding clusters", from: "huggingface.co", hue: 8 },
    { label: "Ranking pipeline", from: "stanford.edu", hue: 28 },
    { label: "Latency heatmap", from: "cloudflare.com", hue: 2 },
    { label: "Query intent tree", from: "quixo.ai", hue: 12 },
    { label: "Citation graph", from: "semanticscholar.org", hue: 22 },
];
