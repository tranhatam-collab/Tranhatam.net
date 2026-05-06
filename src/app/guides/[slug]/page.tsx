import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllGuides } from '@/lib/content'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getAllGuides().find((g) => g.slug === slug)
  if (!guide) return {}
  return { title: guide.title, description: guide.description }
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getAllGuides().find((g) => g.slug === slug)
  if (!guide) notFound()

  const { default: Content } = await import(`@/content/guides/${slug}.mdx`)

  const categoryLabel: Record<string, string> = {
    freelance: 'Freelance',
    creator: 'Creator',
    tools: 'Tools',
    mindset: 'Tư duy',
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
          <Link href="/guides" className="hover:text-brand-600 transition-colors">
            Hướng dẫn
          </Link>
          <span>/</span>
          <span className="text-gray-600">{guide.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">
              {categoryLabel[guide.category] ?? guide.category}
            </span>
            <span className="text-xs text-gray-400">🕐 {guide.readingTime}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
            {guide.title}
          </h1>
          <p className="text-gray-600 leading-relaxed">{guide.description}</p>
        </div>

        {/* Content */}
        <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
          <Content />
        </article>

        {/* Newsletter CTA inline */}
        <div className="mt-12 bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-8 text-white text-center">
          <p className="font-bold text-lg mb-2">Thấy bài này hữu ích? 💌</p>
          <p className="text-brand-100 text-sm mb-5">
            Đăng ký newsletter để nhận thêm hướng dẫn mới hàng tuần.
          </p>
          <Link
            href="/newsletter"
            className="inline-block bg-white text-brand-700 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-50 transition-colors"
          >
            Đăng ký miễn phí →
          </Link>
        </div>

        {/* Back */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <Link
            href="/guides"
            className="text-sm text-brand-600 hover:text-brand-800 font-medium transition-colors"
          >
            ← Xem tất cả hướng dẫn
          </Link>
        </div>
      </div>
    </div>
  )
}
