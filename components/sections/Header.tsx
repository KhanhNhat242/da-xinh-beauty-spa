'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
// Bản logo màu brand-dark: tương phản tốt hơn khi nằm trên ảnh Hero
import logo from '@/public/images/site/logo-daxinh-dark.png'
import Icon from '@/components/ui/Icon'
import { navLinks, site } from '@/lib/site-data'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Trang mở ở đầu → mặc định đang trong Hero (tránh nút nháy hiện rồi ẩn)
  const [inHero, setInHero] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hero còn lộ ra dưới header → ẩn nút "Đặt lịch soi da" (Hero đã có nút đặt lịch chính)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero || !('IntersectionObserver' in window)) {
      // Trình duyệt cũ: luôn hiện nút (đặt trong callback, không setState đồng bộ trong effect)
      const id = requestAnimationFrame(() => setInHero(false))
      return () => cancelAnimationFrame(id)
    }
    const io = new IntersectionObserver(([entry]) => setInHero(entry.isIntersecting), {
      rootMargin: '-96px 0px 0px 0px',
    })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  const showCta = !inHero || open

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? 'bg-cream/90 shadow-[0_8px_30px_-20px_rgb(122_85_70/0.45)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" className="relative shrink-0" aria-label={`${site.name} – về đầu trang`}>
          {/* Quầng kem mờ phía sau logo khi nằm trên ảnh Hero */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -inset-x-7 -inset-y-4 rounded-full bg-cream/85 blur-xl transition-opacity duration-300 ${
              inHero && !scrolled && !open ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <Image
            src={logo}
            alt={site.name}
            className={`relative w-auto transition-[height] duration-300 ${inHero && !open ? 'h-11 lg:h-14' : 'h-9 lg:h-11'}`}
            preload
          />
        </a>

        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative py-2 text-base font-medium text-ink/80 transition-colors hover:text-brand-dark after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#dat-lich"
            aria-hidden={!showCta}
            tabIndex={showCta ? undefined : -1}
            className={`press inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-dark px-4 text-sm font-semibold text-white shadow-button hover:-translate-y-0.5 hover:brightness-110 sm:px-5 lg:min-h-12 lg:px-6 lg:text-base ${
              showCta ? 'opacity-100' : 'pointer-events-none invisible translate-y-[-6px] opacity-0'
            }`}
          >
            <Icon name="calendar" size={17} className="hidden sm:block" />
            Đặt lịch soi da
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            className={`press grid size-11 place-items-center rounded-full text-brand-dark hover:bg-pink active:bg-pink lg:hidden ${
              inHero && !scrolled && !open ? 'bg-cream/85 shadow-card backdrop-blur-sm' : ''
            }`}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 lg:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <nav aria-label="Điều hướng di động" className="min-h-0">
          <ul className="space-y-1 border-t border-line px-4 py-4 sm:px-6">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex min-h-12 items-center justify-between rounded-2xl px-4 text-base font-medium text-ink transition-colors hover:bg-pink/60"
                >
                  {l.label}
                  <Icon name="arrow" size={18} className="text-brand" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
