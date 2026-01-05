# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Japanese-language educational quiz application for IT professionals learning about AI for sales roles. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4.

## Common Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint (uses eslint.config.mjs flat config)
```

## Architecture

### Routing Structure
- `/` - Home page with genre selection and overall progress
- `/genres/[genreId]` - Genre detail with quiz controls
- `/genres/[genreId]/quiz` - Interactive quiz session (10 randomized questions)
- `/genres/[genreId]/results` - Quiz results with score breakdown
- `/textbooks` - Listing of all educational materials
- `/textbooks/[textbookId]` - Rendered markdown content with `generateStaticParams()`

### Data Flow
- **Quiz data**: Static TypeScript files in `data/genres/*.ts` (10 categories, ~100+ questions)
- **Textbook content**: Markdown files in `docs/textbooks/*.md` (10 subjects)
- **Progress tracking**: localStorage via `lib/storage.ts` (key: `ai-agent-quiz-progress`)
- **Quiz results**: sessionStorage for temporary state between quiz and results pages

### Key Patterns
- All interactive pages use `"use client"` directive
- Textbook pages are async server components that read markdown files at build time
- Components in `components/` are reusable UI elements (GenreCard, OptionButton, ProgressBar, etc.)
- Types defined in `data/types.ts` (Genre, Question, QuizProgress interfaces)
- Genre helpers in `data/genres/index.ts` (getGenreById, getAllGenres, getQuestionsByGenreId)

### Path Alias
TypeScript configured with `@/*` mapping to root directory (e.g., `@/components/GenreCard`).
