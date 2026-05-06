import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Đăng ký nhận email hàng tuần — 1 tool hay, 1 tip hữu ích, không spam.',
}

export default function NewsletterPage() {
  return (
    <div className="py-20 px-4 sm:px-6">
      <div className="max-w-xl mx-auto text-center">
        <span className="text-4xl mb-6 block">💌</span>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Newsletter của Trầm
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          Mỗi tuần 1 email ngắn — 1 tool đáng dùng, 1 tip tiết kiệm thời gian,
          đôi khi là 1 câu chuyện thật từ công việc. Không spam, unsubscribe bất
          cứ lúc nào.
        </p>

        {/* What you get */}
        <div className="bg-brand-50 rounded-2xl p-6 mb-8 text-left">
          <p className="font-semibold text-gray-900 mb-4 text-sm">
            Khi đăng ký, bạn nhận được:
          </p>
          <ul className="space-y-3">
            {[
              '🛠  1 tool hoặc resource hay mỗi tuần',
              '💡  Tips thực chiến từ kinh nghiệm thực tế',
              '📋  Templates mới khi ra mắt (ưu tiên subscribers)',
              '🎁  Thỉnh thoảng có quà/ưu đãi riêng cho subscribers',
            ].map((item) => (
              <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form placeholder — swap with Resend/ConvertKit embed */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-sm text-gray-500 mb-4">
            Nhập email để đăng ký (form sẽ kết nối với newsletter service sớm):
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="email@cua ban.com"
              className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              disabled
            />
            <button
              type="submit"
              disabled
              className="bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-medium opacity-50 cursor-not-allowed"
            >
              Đăng ký
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            🔒 Email của bạn an toàn. Không bao giờ chia sẻ cho bên thứ ba.
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Hiện có ... subscribers — cùng tham gia nhé!
        </p>
      </div>
    </div>
  )
}
