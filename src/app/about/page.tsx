import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Về Trầm',
  description: 'Trầm Hà Tâm — freelancer, creator và người yêu thích làm việc hiệu quả.',
}

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Xin chào, tôi là Trầm 👋</h1>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Tôi là <strong>Trầm Hà Tâm</strong> — freelancer và creator sống và làm
              việc tại Sài Gòn. Tôi tạo ra <strong>tranhatam.net</strong> như một kho
              lưu trữ cá nhân những gì tôi thực sự dùng hàng ngày.
            </p>
            <p>
              Ý tưởng đơn giản: thay vì mỗi lần bạn bè hỏi "dùng tool gì để làm X?",
              tôi có một nơi để gửi link. Rồi nó lớn dần thành resource hub này.
            </p>
            <p>
              Mọi thứ ở đây — tools, templates, hướng dẫn — đều là những gì tôi
              thực sự dùng hoặc đã dùng qua. Không có review tài trợ hay
              recommendations tôi chưa từng chạm vào.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Site này làm gì?</h2>
          <ul className="space-y-3">
            {[
              { icon: '🛠', label: 'Tools', href: '/tools', desc: 'Danh sách tools tôi dùng, kèm review thật' },
              { icon: '📖', label: 'Hướng dẫn', href: '/guides', desc: 'Hướng dẫn thực chiến về freelance và làm việc độc lập' },
              { icon: '📋', label: 'Templates', href: '/templates', desc: 'Templates tôi tự tạo, tải về dùng ngay' },
              { icon: '💌', label: 'Newsletter', href: '/newsletter', desc: 'Email hàng tuần, không spam' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50 transition-colors group"
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-brand-700 transition-colors text-sm">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <h2 className="font-semibold text-gray-900 mb-3">Liên hệ</h2>
          <p className="text-sm text-gray-600">
            Có câu hỏi hoặc muốn hợp tác? Bạn có thể tìm thấy tôi tại{' '}
            <a
              href="https://tranhatam.com"
              className="text-brand-600 hover:text-brand-800 underline underline-offset-2"
            >
              tranhatam.com
            </a>{' '}
            — trang chính của tôi.
          </p>
        </div>
      </div>
    </div>
  )
}
