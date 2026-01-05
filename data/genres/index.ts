import { Genre } from "../types";
import { aiBasics } from "./ai-basics";
import { llm } from "./llm";
import { aiAgent } from "./ai-agent";
import { promptEngineering } from "./prompt-engineering";
import { businessCases } from "./business-cases";
import { apiIntegration } from "./api-integration";
import { securityEthics } from "./security-ethics";
import { salesSkills } from "./sales-skills";
import { implementation } from "./implementation";
import { industryTerms } from "./industry-terms";

export const genres: Genre[] = [
  aiBasics,
  llm,
  aiAgent,
  promptEngineering,
  businessCases,
  apiIntegration,
  securityEthics,
  salesSkills,
  implementation,
  industryTerms,
];

export function getGenreById(id: string): Genre | undefined {
  return genres.find((genre) => genre.id === id);
}

export function getRandomQuestions(genre: Genre, count: number) {
  const shuffled = [...genre.questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
