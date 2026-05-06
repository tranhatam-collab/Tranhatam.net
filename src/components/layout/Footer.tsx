import Link from 'next/link'

const links = [
  { href: '/tools', label: 'Tools' },
  { href: '/guides', label: 'Hướng dẫn' },
  { href: '/templates', label: 'Templates' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/about', label: 'Về Trầm' },
]

export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <Link href="/" className="font-bold text-lg text-brand-700">
              tranhatam<span className="text-brand-400">.net</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Kho tài nguyên cá nhân — tools, templates và hướng dẫn Trầm thực
              sự dùng hàng ngày.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-500 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Trầm Hà Tâm. All rights reserved.</p>
          <p>Làm với ♥ tại Sài Gòn</p>
        </div>
      </div>
    </footer>
  )
}
