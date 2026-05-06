import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentRoot = path.join(process.cwd(), 'src/content')

export interface ToolMeta {
  slug: string
  title: string
  description: string
  category: string
  affiliateUrl?: string
  price: string
  rating?: number
  featured?: boolean
  publishedAt: string
  tags?: string[]
  icon?: string
}

export interface GuideMeta {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
  publishedAt: string
  featured?: boolean
  tags?: string[]
}

export interface TemplateMeta {
  slug: string
  title: string
  description: string
  category: string
  price: number
  downloadUrl?: string
  previewUrl?: string
  publishedAt: string
  tags?: string[]
}

function readDir<T extends { publishedAt: string }>(
  type: string,
  transform: (slug: string, data: Record<string, unknown>) => T,
): T[] {
  const dir = path.join(contentRoot, type)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data } = matter(raw)
      return transform(slug, data)
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
}

export function getAllTools(): ToolMeta[] {
  return readDir<ToolMeta>('tools', (slug, data) => ({
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as string,
    affiliateUrl: data.affiliateUrl as string | undefined,
    price: data.price as string,
    rating: data.rating as number | undefined,
    featured: data.featured as boolean | undefined,
    publishedAt: data.publishedAt as string,
    tags: data.tags as string[] | undefined,
    icon: data.icon as string | undefined,
  }))
}

export function getAllGuides(): GuideMeta[] {
  return readDir<GuideMeta>('guides', (slug, data) => ({
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as string,
    readingTime: data.readingTime as string,
    publishedAt: data.publishedAt as string,
    featured: data.featured as boolean | undefined,
    tags: data.tags as string[] | undefined,
  }))
}

export function getAllTemplates(): TemplateMeta[] {
  return readDir<TemplateMeta>('templates', (slug, data) => ({
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as string,
    price: data.price as number,
    downloadUrl: data.downloadUrl as string | undefined,
    previewUrl: data.previewUrl as string | undefined,
    publishedAt: data.publishedAt as string,
    tags: data.tags as string[] | undefined,
  }))
}

export function getFeaturedTools(n = 3): ToolMeta[] {
  return getAllTools()
    .filter((t) => t.featured)
    .slice(0, n)
}

export function getFeaturedGuides(n = 3): GuideMeta[] {
  return getAllGuides()
    .filter((g) => g.featured)
    .slice(0, n)
}
