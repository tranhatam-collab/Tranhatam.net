import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTemplates } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Templates miễn phí và trả phí để tiết kiệm thời gian làm việc.',
}

export default function TemplatesPage() {
  const templates = getAllTemplates()

  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">📋 Templates</h1>
          <p className="text-gray-500">
            Templates Trầm tự tạo — tải về dùng ngay, không cần setup từ đầu.
          </p>
        </div>

        {templates.length === 0 ? (
          <p className="text-gray-400 py-20 text-center">Đang cập nhật…</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((tmpl) => (
              <Link
                key={tmpl.slug}
                href={`/templates/${tmpl.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">📄</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      tmpl.price === 0
                        ? 'bg-green-50 text-green-700'
                        : 'bg-brand-50 text-brand-700'
                    }`}
                  >
                    {tmpl.price === 0 ? 'Miễn phí' : `${tmpl.price.toLocaleString()}đ`}
                  </span>
                </div>
                <h2 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {tmpl.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {tmpl.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
