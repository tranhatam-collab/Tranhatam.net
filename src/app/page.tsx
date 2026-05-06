import Link from 'next/link'
import { getFeaturedTools, getFeaturedGuides } from '@/lib/content'

const categoryLabel: Record<string, string> = {
  productivity: 'Năng suất',
  ai: 'AI',
  design: 'Thiết kế',
  writing: 'Viết lách',
  marketing: 'Marketing',
  freelance: 'Freelance',
  creator: 'Creator',
  tools: 'Tools',
  mindset: 'Tư duy',
}

export default function HomePage() {
  const tools = getFeaturedTools(3)
  const guides = getFeaturedGuides(2)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            Resource Hub
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Những thứ tôi dùng hàng ngày để{' '}
            <span className="text-brand-600">làm việc hiệu quả hơn</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Tools, templates và hướng dẫn Trầm thực sự dùng — không phải review
            tổng hợp, mà là curation có chọn lọc dành cho freelancer, creator
            và người làm việc độc lập.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/tools"
              className="bg-brand-600 text-white px-6 py-3 rounded-full font-medium hover:bg-brand-700 transition-colors"
            >
              Xem Tools →
            </Link>
            <Link
              href="/newsletter"
              className="bg-white text-brand-600 border border-brand-200 px-6 py-3 rounded-full font-medium hover:bg-brand-50 transition-colors"
            >
              Đăng ký nhận tin
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      {tools.length > 0 && (
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">🛠 Tools nổi bật</h2>
              <Link
                href="/tools"
                className="text-sm text-brand-600 hover:text-brand-800 font-medium"
              >
                Xem tất cả →
              </Link>
            </div>
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
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="font-medium text-brand-600">{tool.price}</span>
                    {tool.rating && <span>{'⭐'.repeat(tool.rating)}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Guides */}
      {guides.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-brand-50/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">📖 Hướng dẫn mới nhất</h2>
              <Link
                href="/guides"
                className="text-sm text-brand-600 hover:text-brand-800 font-medium"
              >
                Xem tất cả →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100 transition-all"
                >
                  <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                    {categoryLabel[guide.category] ?? guide.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mt-3 mb-2 group-hover:text-brand-700 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                    {guide.description}
                  </p>
                  <p className="text-xs text-gray-400">🕐 {guide.readingTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl p-10 text-white">
            <h2 className="text-2xl font-bold mb-3">Nhận tài nguyên mới hàng tuần 💌</h2>
            <p className="text-brand-100 mb-6 text-sm leading-relaxed">
              Mỗi tuần Trầm gửi 1 email ngắn — 1 tool hay, 1 tip hữu ích, đôi
              khi là 1 câu chuyện làm việc. Không spam.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-white text-brand-700 px-6 py-3 rounded-full font-semibold hover:bg-brand-50 transition-colors text-sm"
            >
              Đăng ký miễn phí →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
