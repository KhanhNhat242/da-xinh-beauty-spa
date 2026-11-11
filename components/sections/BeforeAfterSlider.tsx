'use client'

import Image from 'next/image'
import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import Icon from '@/components/ui/Icon'
import type { BeforeAfterCase } from '@/lib/site-data'
import { nw } from '@/lib/no-widow'

type Props = {
  cases: BeforeAfterCase[]
  tabs: readonly { value: string; label: string }[]
}

export default function BeforeAfterSlider({ cases, tabs }: Props) {
  const [tab, setTab] = useState(tabs[0]?.value ?? '')
  const [activeId, setActiveId] = useState(cases.find((c) => c.service === tabs[0]?.value)?.id)
  const [position, setPosition] = useState(50)
  const frameRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const dragging = useRef(false)
  const uid = useId()

  const visible = cases.filter((c) => c.service === tab)
  const active = visible.find((c) => c.id === activeId) ?? visible[0]

  const updateFromPointer = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect) return
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromPointer(e.clientX)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) updateFromPointer(e.clientX)
  }
  const stopDragging = () => {
    dragging.current = false
  }

  const chooseTab = (index: number) => {
    const i = (index + tabs.length) % tabs.length
    const next = tabs[i]
    setTab(next.value)
    setActiveId(cases.find((c) => c.service === next.value)?.id)
    setPosition(50)
    tabRefs.current[i]?.focus()
  }

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const map: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 }
    if (e.key in map) {
      e.preventDefault()
      chooseTab(map[e.key])
    }
  }

  if (!active) return null
  const activeTabIndex = tabs.findIndex((t) => t.value === tab)
  const caseNo = visible.findIndex((c) => c.id === active.id) + 1

  return (
    <div>
      {/* Tab dịch vụ */}
      <div role="tablist" aria-label="Chọn dịch vụ" className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-card">
        {tabs.map((t, index) => {
          const selected = t.value === tab
          return (
            <button
              key={t.value}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              id={`${uid}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => chooseTab(index)}
              onKeyDown={(e) => onTabKey(e, index)}
              className={`press min-h-11 cursor-pointer rounded-full px-6 text-[15px] font-semibold whitespace-nowrap sm:px-8 ${
                selected ? 'bg-brand-dark text-white' : 'text-ink hover:bg-pink'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${activeTabIndex}`}
        className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12"
      >
        {/* Khung so sánh (ảnh dọc) */}
        <div className="mx-auto w-full max-w-[440px] lg:col-span-5 lg:max-w-none">
          <div
            ref={frameRef}
            className="group/frame relative aspect-[4/5] cursor-ew-resize touch-pan-y overflow-hidden rounded-[28px] border-[6px] border-white bg-ink shadow-soft select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            <Image
              key={`${active.id}-sau`}
              src={active.after}
              alt={`Da khách hàng sau ${active.treatment} (ca ${caseNo})`}
              fill
              sizes="(min-width: 1024px) 440px, 90vw"
              className="fade-in pointer-events-none object-cover"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
              <Image
                key={`${active.id}-truoc`}
                src={active.before}
                alt={`Da khách hàng trước ${active.treatment} (ca ${caseNo})`}
                fill
                sizes="(min-width: 1024px) 440px, 90vw"
                className="fade-in pointer-events-none object-cover"
                draggable={false}
              />
            </div>

            <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-dark">Trước</span>
            <span className="absolute top-3 right-3 rounded-full bg-brand-dark px-3 py-1 text-sm font-semibold text-white">Sau</span>

            {/* Đường chia + tay kéo */}
            <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }} aria-hidden="true">
              <div className="absolute inset-y-0 -ml-px w-0.5 bg-white" />
              <div className="absolute top-1/2 -ml-6 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-brand-dark text-white shadow-soft ring-4 ring-white transition-shadow group-has-[input:focus-visible]/frame:ring-blush">
                <Icon name="slider" size={22} strokeWidth={2} />
              </div>
            </div>

            <label htmlFor={`${uid}-range`} className="sr-only">
              Kéo để so sánh làn da trước và sau liệu trình
            </label>
            <input
              id={`${uid}-range`}
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(position)}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="sr-only"
            />
          </div>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted">
            <Icon name="slider" size={16} className="text-brand" />
            Kéo thanh trượt để so sánh
          </p>
        </div>

        {/* Thông tin ca + danh sách ca */}
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold text-brand-dark">Ca {caseNo} · {active.treatment}</p>
          <dl className="mt-3 divide-y divide-brand/20 border-y border-brand/20">
            {active.facts.map((f) => (
              <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="text-lg leading-snug font-medium text-ink">{nw(f.value)}</dd>
              </div>
            ))}
          </dl>

          {visible.length > 1 && (
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Chọn ca">
              {visible.map((c, index) => {
                const selected = c.id === active.id
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-label={`Ca ${index + 1} · ${c.treatment}`}
                      onClick={() => {
                        setActiveId(c.id)
                        setPosition(50)
                      }}
                      className={`press group w-full cursor-pointer rounded-[18px] p-1 text-left ${
                        selected ? 'bg-brand-dark' : 'bg-white hover:bg-pink'
                      }`}
                    >
                      <span className="relative block aspect-square overflow-hidden rounded-[14px]">
                        <Image src={c.after} alt="" fill sizes="120px" className="object-cover" />
                      </span>
                      <span className={`block px-2 py-1.5 text-sm font-semibold ${selected ? 'text-white' : 'text-ink'}`}>
                        Ca {index + 1}
                        <span className={`block text-xs font-normal ${selected ? 'text-white/85' : 'text-muted'}`}>{c.treatment}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          <p className="mt-6 text-sm leading-relaxed text-muted">
            {nw('Ảnh khách hàng thực tế do Da Xinh cung cấp, đã che mắt để bảo vệ quyền riêng tư. Kết quả tuỳ tình trạng da của mỗi người.')}
          </p>
        </div>
      </div>
    </div>
  )
}
