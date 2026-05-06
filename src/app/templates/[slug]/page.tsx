import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTemplates } from '@/lib/content'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllTemplates().map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tmpl = getAllTemplates().find((t) => t.slug === slug)
  if (!tmpl) return {}
  return { title: tmpl.title, description: tmpl.description }
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tmpl = getAllTemplates().find((t) => t.slug === slug)
  if (!tmpl) notFound()

  const { default: Content } = await import(`@/content/templates/${slug}.mdx`)

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-8 text-sm text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link href="/templates" className="hover:text-brand-600 transition-colors">Templates</Link>
          <span>/</span>
          <span className="text-gray-600">{tmpl.title}</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              tmpl.price === 0 ? 'bg-green-50 text-green-700' : 'bg-brand-50 text-brand-700'
            }`}>
              {tmpl.price === 0 ? 'Miễn phí' : `${tmpl.price.toLocaleString()}đ`}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{tmpl.title}</h1>
          <p className="text-gray-600 leading-relaxed">{tmpl.description}</p>
        </div>

        {/* Download CTA */}
        {tmpl.downloadUrl && (
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900 text-sm mb-1">Tải template ngay</p>
              <p className="text-xs text-gray-500">
                {tmpl.price === 0 ? 'Hoàn toàn miễn phí.' : `Giá: ${tmpl.price.toLocaleString()}đ`}
              </p>
            </div>
            <a
              href={tmpl.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-700 transition-colors"
            >
              {tmpl.price === 0 ? 'Tải miễn phí →' : 'Mua ngay →'}
            </a>
          </div>
        )}

        <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-brand-600">
          <Content />
        </article>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/templates" className="text-sm text-brand-600 hover:text-brand-800 font-medium transition-colors">
            ← Xem tất cả templates
          </Link>
        </div>
      </div>
    </div>
  )
}
