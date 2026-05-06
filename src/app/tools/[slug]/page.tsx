import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTools } from '@/lib/content'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getAllTools().find((t) => t.slug === slug)
  if (!tool) return {}
  return {
    title: tool.title,
    description: tool.description,
  }
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getAllTools().find((t) => t.slug === slug)
  if (!tool) notFound()

  const { default: Content } = await import(`@/content/tools/${slug}.mdx`)

  const categoryLabel: Record<string, string> = {
    productivity: 'Năng suất',
    ai: 'AI',
    design: 'Thiết kế',
    writing: 'Viết lách',
    marketing: 'Marketing',
  }

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-brand-600 transition-colors">
            Tools
          </Link>
          <span>/</span>
          <span className="text-gray-600">{tool.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{tool.icon ?? '🔧'}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                  {categoryLabel[tool.category] ?? tool.category}
                </span>
                <span className="text-xs text-gray-400">{tool.price}</span>
                {tool.rating && (
                  <span className="text-xs">{'⭐'.repeat(tool.rating)}</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{tool.title}</h1>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">{tool.description}</p>
        </div>

        {/* Affiliate CTA */}
        {tool.affiliateUrl && (
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900 text-sm mb-1">
                Dùng thử {tool.title}
              </p>
              <p className="text-xs text-gray-500">
                Link affiliate — Trầm nhận hoa hồng nhỏ nếu bạn đăng ký, không
                ảnh hưởng chi phí của bạn.
              </p>
            </div>
            <a
              href={tool.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="shrink-0 bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-700 transition-colors"
            >
              Dùng thử miễn phí →
            </a>
          </div>
        )}

        {/* Content */}
        <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
          <Content />
        </article>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/tools"
            className="text-sm text-brand-600 hover:text-brand-800 font-medium transition-colors"
          >
            ← Xem tất cả tools
          </Link>
        </div>
      </div>
    </div>
  )
}
