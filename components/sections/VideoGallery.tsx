'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import logo from '@/public/images/site/logo-daxinh-dark.png'
import Icon from '@/components/ui/Icon'
import { site, type SpaVideo } from '@/lib/site-data'
import { nw } from '@/lib/no-widow'

/** Độ dài đoạn preview khi hover (giây) */
const PREVIEW_SECONDS = 6

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

/**
 * Lưới 5 video dọc (9:16) trên một hàng (desktop); mobile cuộn ngang.
 * Bấm thẻ → mở popup (<dialog> native: tự giữ focus, Esc để đóng) phát video lớn + chú thích có "Xem thêm".
 */
export default function VideoGallery({ videos }: { videos: SpaVideo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const lastIndex = useRef(0)

  const open = (i: number) => {
    lastIndex.current = i
    setExpanded(false)
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const close = useCallback(() => dialogRef.current?.close(), [])
  const step = useCallback(
    (d: number) => {
      setExpanded(false)
      setIndex((cur) => (cur === null ? cur : (cur + d + videos.length) % videos.length))
    },
    [videos.length],
  )

  // Đóng dialog (Esc / nút đóng / bấm nền) → dừng video, trả focus về thẻ đã mở
  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    const onClose = () => {
      setIndex(null)
      triggerRefs.current[lastIndex.current]?.focus()
    }
    dlg.addEventListener('close', onClose)
    return () => dlg.removeEventListener('close', onClose)
  }, [])

  // Phím ← → để chuyển video khi popup đang mở
  useEffect(() => {
    if (index === null) return
    lastIndex.current = index
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'VIDEO' || t.tagName === 'BUTTON') return
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, step])

  // Preview khi hover (chỉ chuột trên máy có hover, tôn trọng giảm chuyển động)
  const [preview, setPreview] = useState<number | null>(null)
  const [previewReady, setPreviewReady] = useState(false)
  const startPreview = (i: number, pointerType: string) => {
    if (pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setPreviewReady(false)
    setPreview(i)
  }
  const stopPreview = () => {
    setPreview(null)
    setPreviewReady(false)
  }

  const v = index === null ? null : videos[index]

  return (
    <>
      <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
        {videos.map((it, i) => (
          <li key={it.id} className="w-[58vw] max-w-[240px] shrink-0 snap-start lg:w-auto lg:max-w-none" data-reveal="up">
            <button
              ref={(el) => {
                triggerRefs.current[i] = el
              }}
              type="button"
              onClick={() => {
                stopPreview()
                open(i)
              }}
              onPointerEnter={(e) => startPreview(i, e.pointerType)}
              onPointerLeave={stopPreview}
              aria-haspopup="dialog"
              aria-label={`Xem video: ${it.title} (${fmt(it.duration)})`}
              className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-ink shadow-card transition-shadow duration-300 hover:shadow-soft"
            >
              <Image
                src={it.poster}
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, 58vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Preview khi hover: chỉ gắn video lúc đang hover (không tải trước), tắt tiếng, lặp đoạn đầu */}
              {preview === i && (
                <video
                  src={it.src}
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  aria-hidden="true"
                  tabIndex={-1}
                  onPlaying={() => setPreviewReady(true)}
                  onTimeUpdate={(e) => {
                    if (e.currentTarget.currentTime >= PREVIEW_SECONDS) e.currentTarget.currentTime = 0
                  }}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    previewReady ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
              <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
              <span
                aria-hidden="true"
                className={`absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-brand-dark shadow-soft backdrop-blur-sm transition-[transform,opacity] duration-300 group-hover:scale-110 ${
                  preview === i && previewReady ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Icon name="play" size={22} className="translate-x-0.5" />
              </span>
              <span aria-hidden="true" className="absolute bottom-3 left-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {fmt(it.duration)}
              </span>
            </button>
            <p className="mt-3 line-clamp-2 text-[15px] leading-snug font-medium text-ink">{nw(it.title)}</p>
          </li>
        ))}
      </ul>

      {/* Popup xem video */}
      <dialog
        ref={dialogRef}
        aria-label={v ? `Video: ${v.title}` : 'Video'}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        {v && (
          // Bấm vào vùng mờ quanh video (khung phủ toàn màn hình) → đóng popup. Esc vẫn đóng được.
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
            className="relative flex h-[100svh] w-[100vw] cursor-zoom-out items-center justify-center p-3 sm:p-6"
          >
            {/* Video + thông tin đè lên video (kiểu reels) */}
            <div className="relative aspect-[9/16] h-[min(calc(100svh-1.5rem),calc((100vw-1.5rem)*16/9))] cursor-auto overflow-hidden rounded-[20px] bg-ink sm:h-[min(90svh,860px)]">
              <video
                key={v.id}
                src={v.src}
                poster={v.poster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              >
                <track kind="captions" />
              </video>

              {/* Thông tin đè lên video, nằm phía trên thanh điều khiển của video (~56px) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-14 bg-linear-to-t from-ink/80 via-ink/45 to-transparent px-4 pt-16 pb-3 text-left text-white sm:px-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white p-1">
                    <Image src={logo} alt="" className="h-auto w-full" />
                  </span>
                  <p className="text-sm font-semibold [text-shadow:0_1px_3px_rgb(0_0_0/0.5)]">
                    {site.name}
                    <span className="block text-xs font-normal opacity-85">
                      Video {index! + 1}/{videos.length} · {fmt(v.duration)}
                    </span>
                  </p>
                </div>
                <h3 className="mt-2.5 font-serif text-[1.45rem] leading-tight font-semibold [text-shadow:0_1px_4px_rgb(0_0_0/0.55)] sm:text-[1.6rem]">
                  {nw(v.title)}
                </h3>
                {/* TODO(content): video chưa có chú thích gốc thì không hiện phần mô tả */}
                {v.caption && (
                  <div className={`pointer-events-auto mt-2 ${expanded ? 'max-h-[38svh] overflow-y-auto pr-1' : ''}`}>
                    <p
                      className={`text-[15px] leading-relaxed whitespace-pre-line text-white/95 [text-shadow:0_1px_3px_rgb(0_0_0/0.6)] ${
                        expanded ? '' : 'line-clamp-2'
                      }`}
                    >
                      {v.caption}
                    </p>
                    <button
                      type="button"
                      onClick={() => setExpanded((x) => !x)}
                      aria-expanded={expanded}
                      className="min-h-11 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
                    >
                      {expanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </dialog>
    </>
  )
}
