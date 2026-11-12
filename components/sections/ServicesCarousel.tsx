'use client'

import Image, { type StaticImageData } from 'next/image'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import Icon, { type IconKey } from '@/components/ui/Icon'
import { nw } from '@/lib/no-widow'

export type CarouselItem = {
  id: string
  /** Nhãn ngắn trên thẻ */
  label: string
  /** Tiêu đề hiển thị dưới thẻ khi thẻ ở giữa */
  title: string
  description: string
  bullets?: readonly string[]
  note?: string
  cta: string
  icon: IconKey
  image?: string | StaticImageData
  imageAlt?: string
}

/** Quãng cuộn (tính theo % chiều cao màn hình) để chuyển sang thẻ kế tiếp */
const STEP_VH = 55

/**
 * Coverflow dịch vụ điều khiển bằng cuộn trang:
 * section cao = 1 màn hình + (n-1) bước; phần bên trong được ghim (sticky),
 * tiến độ cuộn → vị trí liên tục `progress` (0 … n-1) → thẻ trượt, nghiêng, thu nhỏ theo khoảng cách tới giữa.
 */
export default function ServicesCarousel({ items, footnote }: { items: CarouselItem[]; footnote?: string }) {
  const n = items.length
  const outerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = outerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      setProgress(ratio * (n - 1))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [n])

  const active = Math.round(progress)

  /** Cuộn trang tới vị trí làm thẻ `i` nằm giữa */
  const goTo = useCallback(
    (i: number) => {
      const el = outerRef.current
      if (!el) return
      const target = Math.min(n - 1, Math.max(0, i))
      const scrollable = el.offsetHeight - window.innerHeight
      const top = el.getBoundingClientRect().top + window.scrollY + (scrollable * target) / (n - 1)
      window.scrollTo({ top, behavior: 'smooth' })
    },
    [n],
  )

  /**
   * Vòng lặp: khoảng cách tới thẻ giữa được quy về (-n/2, n/2] → luôn có 2 thẻ mỗi bên (tổng 5 thẻ),
   * kể cả khi đang ở thẻ đầu/cuối. Thẻ ở vị trí ±3 ẩn hẳn nên lúc "nhảy vòng" không nhìn thấy.
   */
  const cardStyle = (i: number): CSSProperties => {
    let o = (((i - progress) % n) + n) % n
    if (o > n / 2) o -= n
    const a = Math.min(Math.abs(o), 3)
    const fadeOut = a > 2 ? Math.max(0, 3 - a) : 1
    return {
      transform: `translateX(${o * 64}%) translateY(${Math.min(a, 2) * 6}%) rotate(${Math.max(-1, Math.min(1, o)) * Math.min(a, 1.6) * 6}deg) scale(${1 - Math.min(a, 2.5) * 0.14})`,
      zIndex: 100 - Math.round(a * 10),
      opacity: (1 - Math.max(0, Math.min(a, 2) - 1) * 0.2) * fadeOut,
      // Thẻ giữa giữ nguyên màu gốc; thẻ phụ mờ nhẹ dần theo khoảng cách
      filter: a < 0.02 ? 'none' : `blur(${(Math.min(a, 2) * 1.5).toFixed(2)}px)`,
    }
  }

  const item = items[active]

  return (
    <div ref={outerRef} style={{ height: `calc(100svh + ${(n - 1) * STEP_VH}svh)` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden pt-16 pb-6 lg:pt-20">
        {/* Dải thẻ */}
        <div
          className="relative mx-auto aspect-square w-[min(68vw,50svh,420px)]"
          role="group"
          aria-roledescription="băng chuyền"
          aria-label="Danh sách dịch vụ"
        >
          {items.map((it, i) => {
            const isActive = i === active
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => goTo(i)}
                tabIndex={isActive ? -1 : 0}
                aria-label={isActive ? `${it.label} (đang xem)` : `Xem dịch vụ ${it.label}`}
                aria-current={isActive ? 'true' : undefined}
                style={cardStyle(i)}
                className={`absolute inset-0 overflow-hidden rounded-[24px] border-[5px] border-white bg-pink text-left shadow-soft transition-shadow duration-300 will-change-transform ${isActive ? 'cursor-default shadow-[0_34px_70px_-30px_rgb(122_85_70/0.6)]' : 'cursor-pointer'
                  }`}
              >
                {it.image ? (
                  <Image src={it.image} alt={it.imageAlt ?? it.label} fill sizes="420px" className="object-cover" />
                ) : (
                  // TODO(content): chờ khách cung cấp ảnh thực tế cho dịch vụ này
                  <span className="grain absolute inset-0 flex flex-col items-center justify-center gap-3 bg-pink p-6 text-center">
                    <Icon name={it.icon} size={44} strokeWidth={1.3} className="text-brand-dark" />
                    <span className="text-xs font-medium tracking-[0.14em] text-brand-dark/80 uppercase">Ảnh đang cập nhật</span>
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Nội dung dịch vụ đang ở giữa */}
        <div key={item.id} className="fade-in mt-[min(6svh,3rem)] w-full max-w-xl px-4 text-center" aria-live="polite">
          <h3 className="font-serif text-[1.75rem] leading-tight font-semibold text-ink sm:text-[2.1rem]">{nw(item.title)}</h3>
        </div>
        {/* Ghi chú giá nằm ngay dưới tiêu đề, trong khung được ghim → không còn khoảng trống thừa */}
        {footnote && <p className="mt-4 px-4 text-center text-sm text-muted">{nw(footnote)}</p>}
      </div>
    </div>
  )
}
