const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const minikitConfig = {
  accountAssociation: { header: "", payload: "", signature: "" },
  miniapp: {
    version: "1",
    name: "Web3 Trivia",
    subtitle: "Fun Web3 Trivia Game",
    description: "Test your Web3 knowledge with this mini trivia game!",
    screenshotUrls: [`${ROOT_URL}/game/trivia-screenshot.png`],
    iconUrl: `${ROOT_URL}/game/trivia-icon.png`,
    splashImageUrl: `${ROOT_URL}/game/trivia-hero.png`,
    splashBackgroundColor: "#1a1a1a",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["web3", "crypto", "trivia", "game"],
    heroImageUrl: `${ROOT_URL}/game/trivia-hero.png`,
    tagline: "Challenge your Web3 knowledge!",
    ogTitle: "Web3 Trivia Challenge",
    ogDescription: "Play the ultimate Web3 trivia game and share your score on Farcaster!",
    ogImageUrl: `${ROOT_URL}/game/trivia-hero.png`,
  },
} as const;
 