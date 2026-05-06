import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllGuides } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Hướng dẫn',
  description: 'Hướng dẫn thực chiến về freelance, tools và làm việc độc lập.',
}

const categoryLabel: Record<string, string> = {
  freelance: 'Freelance',
  creator: 'Creator',
  tools: 'Tools',
  mindset: 'Tư duy',
}

export default function GuidesPage() {
  const guides = getAllGuides()

  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">📖 Hướng dẫn</h1>
          <p className="text-gray-500">
            Thực chiến từ kinh nghiệm thực tế — không lý thuyết suông.
          </p>
        </div>

        {guides.length === 0 ? (
          <p className="text-gray-400 py-20 text-center">Đang cập nhật…</p>
        ) : (
          <div className="flex flex-col gap-4">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100 transition-all flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                      {categoryLabel[guide.category] ?? guide.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      🕐 {guide.readingTime}
                    </span>
                  </div>
                  <h2 className="font-semibold text-gray-900 mb-1 group-hover:text-brand-700 transition-colors leading-snug">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {guide.description}
                  </p>
                </div>
                <span className="text-brand-400 group-hover:text-brand-600 text-lg shrink-0 transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
