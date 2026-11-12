'use client'

import Image from 'next/image'
import { useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import logo from '@/public/images/site/logo-daxinh-dark.png'
import Icon, { type IconKey } from '@/components/ui/Icon'
import { branches, combo, site } from '@/lib/site-data'
import { nw } from '@/lib/no-widow'

type Delta = { dx: number; dy: number }

const FLY_QUERY =
  '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)'
const subscribeFly = (cb: () => void) => {
  const mq = window.matchMedia(FLY_QUERY)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getFly = () => window.matchMedia(FLY_QUERY).matches

/** Đường kẻ trang trí có hình thoi nhỏ ở giữa (như mẫu danh thiếp). */
function Ornament({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex items-center gap-2 text-brand ${className}`}>
      <span className="h-px w-12 bg-current opacity-60" />
      <svg viewBox="0 0 12 12" className="size-2.5" fill="currentColor">
        <path d="M6 0 12 6 6 12 0 6Z" />
      </svg>
      <span className="h-px w-12 bg-current opacity-60" />
    </span>
  )
}

/** Vệt màu nước hồng loang ở góc thẻ + nét viền mảnh uốn cong (thay cho lá xanh trong mẫu). */
function WatercolorCorner({ position }: { position: 'tl' | 'br' }) {
  const flip = position === 'br' ? 'rotate-180' : ''
  const place = position === 'tl' ? '-top-6 -left-6' : '-right-6 -bottom-6'
  return (
    <svg aria-hidden="true" viewBox="0 0 220 160" className={`pointer-events-none absolute ${place} ${flip} w-[46%]`}>
      <defs>
        <filter id={`wc-${position}`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={position === 'tl' ? 3 : 8} />
          <feDisplacementMap in="SourceGraphic" scale="18" />
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
      <g filter={`url(#wc-${position})`}>
        <path d="M0 0H170C150 30 120 38 96 58S52 104 22 120 0 150 0 160Z" fill="var(--color-blush)" opacity=".45" />
        <path d="M0 0H120C104 20 80 30 60 44S26 80 0 92Z" fill="var(--color-pink)" opacity=".9" />
      </g>
      <path
        d="M4 150C30 118 46 92 78 72S136 40 168 6"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity=".75"
      />
    </svg>
  )
}

/**
 * Hai tấm card visit (khổ danh thiếp 9:5).
 * - Khi chưa hover: thẻ bồng bềnh như nổi trên mặt nước (nhấp nhô + lắc nhẹ, bóng dưới co giãn theo nhịp).
 * - Hover/focus (desktop có chuột): thẻ ngừng bồng bềnh, phóng nhẹ, xoay thẳng, bay về giữa màn hình; rời ra thì về chỗ cũ.
 * Vùng nhận hover là khung đứng yên (slot) → thẻ di chuyển không làm mất hover.
 */
export default function OfferCards() {
  const [active, setActive] = useState<number | null>(null)
  const [delta, setDelta] = useState<Delta>({ dx: 0, dy: 0 })
  const canFly = useSyncExternalStore(subscribeFly, getFly, () => false)
  const slots = useRef<(HTMLDivElement | null)[]>([])

  const activate = (i: number) => {
    const slot = slots.current[i]
    if (slot && canFly) {
      const r = slot.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const headerH = 80
      const scale = 1.12
      const targetY = headerH + (vh - headerH) / 2
      let dy = targetY - (r.top + r.height / 2)
      const scaledH = r.height * scale
      const newTop = r.top + r.height / 2 + dy - scaledH / 2
      if (newTop < headerH + 12) dy += headerH + 12 - newTop
      if (newTop + scaledH > vh - 12) dy -= newTop + scaledH - (vh - 12)
      setDelta({ dx: vw / 2 - (r.left + r.width / 2), dy })
    }
    setActive(i)
  }
  const deactivate = (i: number) => setActive((cur) => (cur === i ? null : cur))

  const cardStyle = (i: number, tilt: number, offsetY: string): CSSProperties =>
    active === i && canFly
      ? { transform: `translate(${delta.dx}px, ${delta.dy}px) rotate(0deg) scale(1.12)`, transitionDuration: '650ms' }
      : { transform: canFly ? `translateY(${offsetY}) rotate(${tilt}deg)` : undefined, transitionDuration: '550ms' }

  const slot = (i: number, children: ReactNode, tilt: number, offsetY: string) => {
    const isActive = active === i && canFly
    return (
      <div
        ref={(el) => {
          slots.current[i] = el
        }}
        onPointerEnter={() => activate(i)}
        onPointerLeave={() => deactivate(i)}
        onFocus={() => activate(i)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) deactivate(i)
        }}
        className={`relative ${active === i ? 'z-30' : 'z-10'}`}
      >
        {/* Bóng mờ "trên mặt nước": co giãn theo nhịp bồng bềnh, ẩn khi thẻ bay lên */}
        <div
          aria-hidden="true"
          style={{ transform: canFly ? `translateY(${offsetY})` : undefined }}
          className={`pointer-events-none absolute inset-x-[8%] -bottom-7 h-8 transition-opacity duration-500 ${
            isActive ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Ẩn/hiện đặt ở lớp ngoài vì keyframe water-shadow đã điều khiển opacity của lớp trong */}
          <div className={`water-shadow h-full rounded-[50%] bg-brand-dark/25 blur-xl ${i === 1 ? 'float-delay' : ''}`} />
        </div>

        <div
          style={cardStyle(i, tilt, offsetY)}
          className={`transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            active !== null && active !== i && canFly ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {/* Lớp bồng bềnh tách riêng để không đụng transform nghiêng/bay */}
          <div
            className={`float-water rounded-[18px] transition-shadow duration-500 ${i === 1 ? 'float-delay' : ''} ${
              isActive
                ? 'is-paused shadow-[0_42px_80px_-28px_rgb(122_85_70/0.6),0_6px_14px_-6px_rgb(122_85_70/0.3)]'
                : 'shadow-[0_18px_36px_-22px_rgb(122_85_70/0.5),0_2px_6px_-2px_rgb(122_85_70/0.2)]'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Khung chung: khổ danh thiếp 9:5, góc bo 18px, mặt giấy kem có hạt nhiễu nhẹ
  const cardBase =
    'grain relative isolate flex overflow-hidden rounded-[18px] bg-cream focus-visible:outline-offset-4 sm:aspect-[9/5] lg:aspect-[16/10] xl:aspect-[9/5]'

  const contacts: { icon: IconKey; text: string }[] = [
    { icon: 'phone', text: site.phoneDisplay },
    { icon: 'facebook', text: 'facebook.com/daxinhbeautyspa' },
    { icon: 'pin', text: branches.map((b) => b.area).join(' · ') },
    { icon: 'clock', text: `${site.hours.display} (${site.hours.note.toLowerCase()})` },
  ]

  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-12 md:mt-14 lg:mt-20 lg:grid-cols-2 lg:gap-16">
      {/* Mặt trước: ưu đãi — bố cục căn giữa, màu nước ở 2 góc chéo */}
      {slot(
        0,
        <a
          href="#dat-lich"
          aria-label={`${combo.title}. ${combo.gift} Bấm để đặt lịch.`}
          className={`${cardBase} flex-col items-center justify-center px-8 py-7 text-center`}
        >
          <WatercolorCorner position="tl" />
          <WatercolorCorner position="br" />
          <Image src={logo} alt="" className="relative h-9 w-auto" />
          <p className="relative mt-2 font-serif text-[4.25rem] leading-none font-semibold text-brand-dark sm:text-[4.75rem]">
            {combo.price}
          </p>
          <Ornament className="relative mt-2" />
          <p className="relative mt-2 text-sm font-semibold tracking-[0.18em] text-brand-dark uppercase">Combo lấy nhân mụn</p>
          <p className="relative mt-1.5 max-w-[19rem] text-sm leading-snug text-ink/80">{nw(combo.gift)}</p>
        </a>,
        -7,
        '2.5rem',
      )}

      {/* Mặt sau: soi da miễn phí — panel hồng mép lượn sóng + thông tin liên hệ có icon */}
      {slot(
        1,
        <a
          href={site.facebookHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Soi da bằng máy miễn phí 100%. Inbox Facebook Da Xinh để được tư vấn."
          className={`${cardBase} flex-col sm:flex-row`}
        >
          {/* Panel trái với mép phải lượn sóng */}
          <div className="relative flex shrink-0 flex-col items-center justify-center px-6 py-6 text-center sm:w-[38%] sm:py-0 sm:pr-8">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 hidden h-full w-[calc(100%+1.5rem)] sm:block"
            >
              <path d="M0 0H86C76 18 96 34 88 50S76 82 92 100H0Z" fill="var(--color-pink)" />
              <path
                d="M86 0C76 18 96 34 88 50S76 82 92 100"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="absolute inset-0 bg-pink sm:hidden" />
            <Image src={logo} alt="" className="relative h-9 w-auto" />
            <Ornament className="relative mt-3 [&>span:first-child]:w-6 [&>span:last-child]:w-6" />
            <p className="relative mt-2 text-xs font-semibold tracking-[0.18em] text-brand-dark uppercase">Soi da bằng máy</p>
            <p className="relative mt-1 font-serif text-[1.6rem] leading-none font-semibold text-brand-dark italic">Miễn phí 100%</p>
          </div>

          {/* Thông tin liên hệ */}
          <div className="relative flex flex-1 flex-col justify-center gap-2.5 px-6 py-5 sm:py-0 sm:pr-6 sm:pl-4">
            {contacts.map((c) => (
              <p key={c.icon} className="flex items-center gap-3 text-sm leading-snug text-ink/85">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-dark text-white">
                  <Icon name={c.icon} size={15} />
                </span>
                {c.text}
              </p>
            ))}
            <Ornament className="mt-1 self-center sm:self-start sm:pl-11" />
          </div>
        </a>,
        5,
        '-1rem',
      )}
    </div>
  )
}
