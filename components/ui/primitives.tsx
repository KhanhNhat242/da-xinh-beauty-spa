import type { CSSProperties, ReactNode } from 'react'
import Icon, { type IconKey } from './Icon'
import { nw } from '@/lib/no-widow'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

/** Khung chứa chuẩn: max-w-6xl + lề 2 bên. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

/** Nhãn phụ 2–4 từ, chữ in hoa nhỏ, bo tròn, nền hồng nhạt. */
export function Badge({
  children,
  icon,
  className,
}: {
  children: string
  icon?: IconKey
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full bg-pink px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark',
        className,
      )}
    >
      {icon && <Icon name={icon} size={14} strokeWidth={1.8} />}
      {children}
    </span>
  )
}

/** Cụm tiêu đề section: badge + H2 + mô tả (giới hạn max-w-2xl). */
export function SectionHeading({
  id,
  badge,
  badgeIcon,
  title,
  subtitle,
  align = 'center',
  className,
}: {
  id?: string
  badge?: string
  badgeIcon?: IconKey
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}) {
  const center = align === 'center'
  return (
    <div className={cx(center ? 'mx-auto text-center' : 'text-left', 'max-w-2xl', className)} data-reveal="up">
      {badge && <Badge icon={badgeIcon}>{badge}</Badge>}
      <h2 id={id} className="mt-4 font-serif text-[2.15rem] leading-[1.12] font-semibold text-ink sm:text-[2.6rem] lg:text-5xl">
        {nw(title)}
      </h2>
      {subtitle && (
        <p className={cx('mt-4 text-base leading-relaxed text-muted sm:text-base', center && 'mx-auto')}>
          {nw(subtitle)}
        </p>
      )}
    </div>
  )
}

type BtnVariant = 'primary' | 'outline' | 'soft' | 'white'

const btnBase =
  'press group inline-flex min-h-12 items-center whitespace-nowrap justify-center gap-2 rounded-full px-6 text-base font-semibold'

const btnVariants: Record<BtnVariant, string> = {
  primary:
    'bg-brand-dark text-white shadow-button hover:brightness-110 hover:-translate-y-0.5',
  outline: 'border border-brand/40 bg-white/70 text-brand-dark hover:border-brand hover:bg-white hover:-translate-y-0.5',
  soft: 'bg-pink text-brand-dark hover:bg-blush/60 hover:-translate-y-0.5',
  white: 'bg-white text-brand-dark shadow-card hover:-translate-y-0.5 hover:shadow-soft',
}

/** Link dạng nút. Link ngoài tự mở tab mới với rel an toàn (R4.9). */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  icon,
  trailingArrow,
  className,
}: {
  href: string
  children: ReactNode
  variant?: BtnVariant
  icon?: IconKey
  trailingArrow?: boolean
  className?: string
}) {
  const external = /^https?:/.test(href)
  return (
    <a
      href={href}
      className={cx(btnBase, btnVariants[variant], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {trailingArrow && (
        <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  )
}

/**
 * Đường chuyển mềm giữa 2 section: đặt ở đáy section trên, tô màu của section dưới.
 */
export function WaveDivider({ fill, flip }: { fill: 'cream' | 'beige'; flip?: boolean }) {
  return (
    <div aria-hidden="true" className={cx('pointer-events-none absolute inset-x-0 bottom-0 leading-none', flip && '-scale-x-100')}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cx('block h-10 w-full sm:h-14 lg:h-20', fill === 'cream' ? 'text-cream' : 'text-beige')}
      >
        <path
          fill="currentColor"
          d="M0 48C180 18 360 6 560 22s360 50 560 46 240-30 320-44v56H0Z"
        />
      </svg>
    </div>
  )
}

/** Delay so le cho hiệu ứng reveal. */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties

export { cx }
