'use client'

import Image from 'next/image'
import { useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import logo from '@/public/images/site/logo-daxinh-dark.png'
import Icon from '@/components/ui/Icon'
import { combo, site, skinScanReasons } from '@/lib/site-data'
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

/**
 * Hai tấm card visit (danh thiếp khổ 9:5) đặt nghiêng như trên mặt bàn.
 * Cả tấm thiếp là một liên kết (không có nút kiểu web).
 * Hover/focus (desktop có chuột): thiếp phóng nhẹ, xoay thẳng, bay về giữa màn hình; rời ra thì về chỗ cũ.
 * Vùng nhận hover là khung đứng yên (slot) → thiếp di chuyển không làm mất hover.
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

  const slot = (i: number, children: ReactNode, tilt: number, offsetY: string) => (
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
      <div
        style={cardStyle(i, tilt, offsetY)}
        className={`rounded-[14px] transition-[transform,box-shadow,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
          active === i
            ? 'shadow-[0_42px_80px_-28px_rgb(122_85_70/0.6),0_6px_14px_-6px_rgb(122_85_70/0.3)]'
            : 'shadow-[0_22px_40px_-22px_rgb(122_85_70/0.55),0_2px_6px_-2px_rgb(122_85_70/0.25)]'
        } ${active !== null && active !== i && canFly ? 'opacity-60' : 'opacity-100'}`}
      >
        {children}
      </div>
    </div>
  )

  // Khung chung của một tấm danh thiếp: khổ 9:5, góc bo nhỏ, mặt giấy có hạt nhiễu nhẹ
  const cardBase =
    'grain relative isolate flex flex-col overflow-hidden rounded-[14px] focus-visible:outline-offset-4 sm:aspect-[9/5] lg:aspect-[16/10] xl:aspect-[9/5]'

  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:mt-14 lg:mt-20 lg:grid-cols-2 lg:gap-16">
      {/* Mặt trước: ưu đãi */}
      {slot(
        0,
        <a href="#dat-lich" aria-label={`${combo.title}. ${combo.gift} Bấm để đặt lịch.`} className={`${cardBase} bg-pink`}>
          <div className="flex flex-1 flex-col items-center justify-center px-6 pt-6 pb-4 text-center">
            <p className="font-serif text-[4.5rem] leading-[0.9] font-semibold text-brand-dark sm:text-[5rem]">{combo.price}</p>
            <p className="mt-1 font-serif text-[1.6rem] leading-tight text-ink italic">combo lấy nhân mụn</p>
            <p className="mt-3 flex max-w-[20rem] items-start gap-1.5 text-sm leading-snug text-ink/80">
              <Icon name="gift" size={16} className="mt-0.5 shrink-0 text-brand" />
              <span>{nw(combo.gift)}</span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 bg-brand-dark px-5 py-3 text-sm text-white">
            <span className="flex items-center gap-1.5 font-medium">
              <Icon name="phone" size={15} />
              {site.phoneDisplay}
            </span>
            <span className="flex items-center gap-1 font-semibold">
              Đặt lịch
              <Icon name="arrow" size={15} />
            </span>
          </div>
        </a>,
        -7,
        '2.5rem',
      )}

      {/* Mặt thông tin: soi da miễn phí */}
      {slot(
        1,
        <a
          href={site.facebookHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Soi da bằng máy miễn phí. Inbox Facebook Da Xinh để được tư vấn."
          className={`${cardBase} bg-white`}
        >
          <div className="flex flex-col items-center bg-pink px-6 pt-3 pb-2 text-center">
            <Image src={logo} alt="" className="h-8 w-auto" />
            <p className="mt-2 w-full border-t border-brand/30 pt-2 text-[11px] font-semibold tracking-[0.2em] text-brand-dark uppercase">
              Soi da bằng máy · Miễn phí 100%
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-2 text-center">
            <ul className="w-full max-w-[20rem] divide-y divide-brand/20">
              {skinScanReasons.map((r) => (
                <li key={r.title} className="py-1 text-sm leading-snug text-ink/80">
                  <strong className="font-semibold text-ink">{r.title}</strong> {nw(r.text)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between gap-3 bg-brand-dark px-5 py-3 text-sm text-white">
            <span className="flex min-w-0 items-center gap-1.5 truncate font-medium">
              <Icon name="facebook" size={15} className="shrink-0" />
              /daxinhbeautyspa
            </span>
            <span className="flex shrink-0 items-center gap-1 font-semibold">
              Inbox tư vấn
              <Icon name="arrow" size={15} />
            </span>
          </div>
        </a>,
        5,
        '-1rem',
      )}
    </div>
  )
}
