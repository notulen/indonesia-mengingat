import { parse as parseYaml } from "yaml";
import { z } from "zod";

export type PostItem = {
  id: string; // use URL as unique id
  figureId: string;
  type: string; // e.g., "instagram"
  url: string;
};

export type FigureItem = {
  id: string; // slug
  name: string;
  role?: string;
  status?: "alive" | "deceased";
  description?: string;
  photoUrl?: string;
  posts?: PostItem[];
  content?: string;
};

// Zod schemas
const PostFrontmatterSchema = z.object({
  type: z.string(),
  url: z.string().url(),
});
const FigureFrontmatterSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string().optional(),
  status: z.enum(["alive", "deceased"]).optional(),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
  posts: z.array(PostFrontmatterSchema).default([]),
  content: z.string().optional(),
});
type FigureFrontmatter = z.infer<typeof FigureFrontmatterSchema>;

function loadAllFigureMarkdown(): {
  figures: FigureItem[];
  posts: PostItem[];
} {
  const modules = import.meta.glob("@/data/figures/*.md", {
    as: "raw",
    eager: true,
  }) as Record<string, string>;
  const aggregatedFigures: FigureItem[] = [];
  const aggregatedPosts: PostItem[] = [];

  for (const [_path, raw] of Object.entries(modules)) {
    const { data, content } = extractFrontmatter(raw);
    const parsed = FigureFrontmatterSchema.parse(
      data as unknown as FigureFrontmatter
    );

    const postsForFigure: PostItem[] = parsed.posts.map((pst) => ({
      id: pst.url,
      figureId: parsed.id,
      type: pst.type,
      url: pst.url,
    }));

    aggregatedFigures.push({
      id: parsed.id,
      name: parsed.name,
      role: parsed.role,
      description: parsed.description,
      status: parsed.status,
      photoUrl: parsed.photoUrl,
      posts: postsForFigure,
      content,
    });

    for (const pst of postsForFigure) {
      aggregatedPosts.push(pst);
    }
  }

  const figureIds = new Set(aggregatedFigures.map((f) => f.id));
  for (const e of aggregatedPosts) {
    if (!figureIds.has(e.figureId)) {
      throw new Error(`Post ${e.id} references unknown figureId ${e.figureId}`);
    }
  }

  return { figures: aggregatedFigures, posts: aggregatedPosts };
}

export const { figures, posts } = loadAllFigureMarkdown();

export function getFigureById(figureId: string): FigureItem | undefined {
  return figures.find((f) => f.id === figureId);
}

export function getPostsByFigureId(figureId: string): PostItem[] {
  return posts.filter((e) => e.figureId === figureId);
}

function extractFrontmatter(raw: string): { data: unknown; content: string } {
  const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;
  const match = raw.match(FRONTMATTER_REGEX);
  if (!match) return { data: {}, content: raw };
  const yamlBlock = match[1];
  const content = match[2] ?? "";
  const data = parseYaml(yamlBlock);
  return { data, content };
}
