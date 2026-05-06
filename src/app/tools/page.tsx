import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTools } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Danh sách tools Trầm thực sự dùng hàng ngày — được chọn lọc kỹ càng.',
}

const categoryLabel: Record<string, string> = {
  productivity: 'Năng suất',
  ai: 'AI',
  design: 'Thiết kế',
  writing: 'Viết lách',
  marketing: 'Marketing',
}

export default function ToolsPage() {
  const tools = getAllTools()
  const categories = [...new Set(tools.map((t) => t.category))]

  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">🛠 Tools</h1>
          <p className="text-gray-500 max-w-xl">
            Không review tất cả mọi thứ — chỉ những gì Trầm thực sự dùng và tin tưởng.
          </p>
        </div>

        {/* Category filter labels */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-xs bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-full font-medium"
              >
                {categoryLabel[cat] ?? cat}
              </span>
            ))}
          </div>
        )}

        {tools.length === 0 ? (
          <p className="text-gray-400 py-20 text-center">Đang cập nhật…</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{tool.icon ?? '🔧'}</span>
                  <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                    {categoryLabel[tool.category] ?? tool.category}
                  </span>
                </div>
                <h2 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-brand-600">{tool.price}</span>
                  {tool.rating && <span>{'⭐'.repeat(tool.rating)}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
