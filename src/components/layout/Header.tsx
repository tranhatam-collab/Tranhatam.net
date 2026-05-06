import Link from 'next/link'

const navLinks = [
  { href: '/tools', label: 'Tools' },
  { href: '/guides', label: 'Hướng dẫn' },
  { href: '/templates', label: 'Templates' },
  { href: '/about', label: 'Về Trầm' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-bold text-lg text-brand-700 hover:text-brand-900 transition-colors shrink-0"
        >
          tranhatam<span className="text-brand-400">.net</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-brand-600 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/newsletter"
          className="shrink-0 bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          Đăng ký nhận tin
        </Link>
      </div>
    </header>
  )
}
