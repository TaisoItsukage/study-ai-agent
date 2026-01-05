export interface Textbook {
  id: string;
  genreId: string;
  title: string;
  description: string;
  icon: string;
  filename: string;
}

export const textbooks: Textbook[] = [
  {
    id: "ai-basics",
    genreId: "ai-basics",
    title: "AI基礎知識",
    description: "AIの基本概念から機械学習、深層学習、ニューラルネットワークまで体系的に学びます。",
    icon: "🤖",
    filename: "01-ai-basics.md",
  },
  {
    id: "llm",
    genreId: "llm",
    title: "LLMの仕組みと特徴",
    description: "大規模言語モデルの仕組み、トークン、コンテキストウィンドウなどの概念を学びます。",
    icon: "🧠",
    filename: "02-llm.md",
  },
  {
    id: "ai-agent",
    genreId: "ai-agent",
    title: "AIエージェント",
    description: "自律的に目標を達成するAIエージェントの仕組みと活用方法を学びます。",
    icon: "🎯",
    filename: "03-ai-agent.md",
  },
  {
    id: "prompt-engineering",
    genreId: "prompt-engineering",
    title: "プロンプトエンジニアリング",
    description: "AIから最適な回答を引き出すためのプロンプト設計技法を学びます。",
    icon: "✨",
    filename: "04-prompt-engineering.md",
  },
  {
    id: "business-cases",
    genreId: "business-cases",
    title: "ビジネス活用事例",
    description: "13の業界別AI活用事例と導入効果、ROI計算方法を学びます。",
    icon: "💼",
    filename: "05-business-cases.md",
  },
  {
    id: "api-integration",
    genreId: "api-integration",
    title: "API・システム連携",
    description: "REST API、認証方式、クラウドサービス連携など技術的な知識を学びます。",
    icon: "🔗",
    filename: "06-api-integration.md",
  },
  {
    id: "security-ethics",
    genreId: "security-ethics",
    title: "セキュリティと倫理",
    description: "プロンプトインジェクション対策、プライバシー保護、AI倫理を学びます。",
    icon: "🔒",
    filename: "07-security-ethics.md",
  },
  {
    id: "sales-skills",
    genreId: "sales-skills",
    title: "AI営業スキル",
    description: "AI製品の提案、顧客対応、ROI説明、クロージング技術を学びます。",
    icon: "🤝",
    filename: "08-sales-skills.md",
  },
  {
    id: "implementation",
    genreId: "implementation",
    title: "導入・運用知識",
    description: "AI導入プロジェクトの進め方、PoC、チェンジマネジメントを学びます。",
    icon: "🚀",
    filename: "09-implementation.md",
  },
  {
    id: "industry-terms",
    genreId: "industry-terms",
    title: "業界用語・トレンド",
    description: "AI業界の最新用語、技術トレンド、主要企業について学びます。",
    icon: "📚",
    filename: "10-industry-terms.md",
  },
];

export function getTextbookById(id: string): Textbook | undefined {
  return textbooks.find((textbook) => textbook.id === id);
}

export function getTextbookByGenreId(genreId: string): Textbook | undefined {
  return textbooks.find((textbook) => textbook.genreId === genreId);
}
