import Image from 'next/image'
import whyUs from '@/public/images/site/why-us.webp'
import { ButtonLink, Container, revealDelay } from '@/components/ui/primitives'
import { usps } from '@/lib/site-data'
import { nw } from '@/lib/no-widow'

/*
 * Bố cục "Vì sao chọn" (theo mẫu): tiêu đề ở trên, 5 cam kết rải theo vòng cung — cao thấp xen kẽ,
 * mỗi cam kết có chấm tròn + đường gạch nối xuống vòng cung lớn phía sau người ở giữa.
 * Toạ độ tính trong khung 1000 × 760 (SVG co giãn theo tỉ lệ), nhãn đặt theo %.
 */
const VB_W = 1000
const VB_H = 760
const ARCH = { cx: 500, cy: VB_H, rOuter: 470, stroke: 84 }

// Vị trí ngang + độ cao của từng nhãn (cao – thấp – cao – thấp – cao)
const SPOTS = [
  { x: 95, high: true },
  { x: 292, high: false },
  { x: 500, high: true },
  { x: 708, high: false },
  { x: 905, high: true },
]
const DOT_Y = { high: 118, low: 238 }

/** Điểm trên mép ngoài vòng cung ứng với hoành độ x */
const archEdgeY = (x: number) => {
  const dx = Math.abs(x - ARCH.cx)
  return ARCH.cy - Math.sqrt(Math.max(0, ARCH.rOuter ** 2 - dx ** 2))
}

const pct = (v: number, total: number) => `${(v / total) * 100}%`

export default function Commitments() {
  const r = ARCH.rOuter - ARCH.stroke / 2
  const archPath = `M ${ARCH.cx - r} ${ARCH.cy} A ${r} ${r} 0 0 1 ${ARCH.cx + r} ${ARCH.cy}`

  return (
    <section id="cam-ket" aria-labelledby="cam-ket-title" className="relative overflow-hidden bg-cream pt-14 md:pt-16 lg:pt-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center" data-reveal="up">
          <h2 id="cam-ket-title" className="font-serif text-[2.3rem] leading-[1.1] font-semibold text-ink sm:text-[2.8rem] lg:text-[3.3rem]">
            Vì sao chọn <span className="text-brand-dark italic">Da Xinh</span>?
          </h2>
        </div>

        {/* Mobile / tablet: danh sách cam kết */}
        <ul className="mx-auto mt-8 max-w-md space-y-3 lg:hidden">
          {usps.map((u, i) => (
            <li key={u} data-reveal="up" style={revealDelay(i * 60)} className="flex items-start gap-3 text-[17px] leading-snug font-medium text-ink">
              <span aria-hidden="true" className="mt-1.5 size-3 shrink-0 rounded-full border-[3px] border-cream bg-brand-dark ring-1 ring-brand-dark" />
              {nw(u)}
            </li>
          ))}
        </ul>

        {/* Sân khấu: vòng cung + người + (desktop) nhãn rải theo vòng cung */}
        <div className="relative mx-auto mt-8 w-full max-w-[1000px] lg:mt-2" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
          <svg aria-hidden="true" viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full overflow-visible">
            {/* Vòng cung lớn phía sau */}
            <path d={archPath} fill="none" stroke="var(--color-pink)" strokeWidth={ARCH.stroke} />
            <path d={archPath} fill="none" stroke="var(--color-blush)" strokeOpacity=".55" strokeWidth={ARCH.stroke * 0.42} />
            {/* Đường gạch nối từ chấm xuống vòng cung (chỉ desktop) */}
            <g className="hidden lg:inline">
              {SPOTS.map((s) => (
                <line
                  key={s.x}
                  x1={s.x}
                  y1={s.high ? DOT_Y.high : DOT_Y.low}
                  x2={s.x}
                  y2={archEdgeY(s.x)}
                  stroke="var(--color-brand)"
                  strokeWidth="1.4"
                  strokeDasharray="3 5"
                  strokeLinecap="round"
                />
              ))}
            </g>
          </svg>

          {/* Người ở giữa (ảnh đã tách nền) */}
          <div className="absolute bottom-0 left-1/2 h-[84%] -translate-x-1/2">
            <Image
              src={whyUs}
              alt="Nhân viên Da Xinh Beauty Spa trong áo blouse trắng"
              sizes="(min-width: 1024px) 460px, 60vw"
              className="h-full w-auto max-w-none"
            />
          </div>

          {/* Nhãn cam kết theo vòng cung (desktop) */}
          <ul className="hidden lg:block">
            {usps.map((u, i) => {
              const s = SPOTS[i]
              const dotY = s.high ? DOT_Y.high : DOT_Y.low
              return (
                <li
                  key={u}
                  data-reveal="up"
                  style={{ ...revealDelay(i * 90), left: pct(s.x, VB_W), top: pct(dotY, VB_H) }}
                  className="absolute w-[200px] -translate-x-1/2 -translate-y-full pb-4 text-center"
                >
                  <span className="block text-[17px] leading-snug font-medium text-ink">{nw(u)}</span>
                  {/* Chấm tròn đặt đúng điểm đầu đường gạch */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 size-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border-[3px] border-cream bg-brand-dark ring-1 ring-brand-dark"
                  />
                </li>
              )
            })}
          </ul>
        </div>

        {/* CTA cho mobile / tablet */}
        <div className="flex justify-center pt-6 pb-14 lg:hidden">
          <ButtonLink href="#dat-lich" trailingArrow>
            Đặt lịch tư vấn ngay
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
