import type { ReactNode } from 'react'

/** Khai báo kiểu cho components/ui/SplitText.jsx (React Bits – SplitText, biến thể JS-CSS). */
export interface SplitTextProps {
  text: string
  /** Nội dung có định dạng (vd. chứa <em>); nếu bỏ trống sẽ dùng `text`. */
  children?: ReactNode
  className?: string
  delay?: number
  duration?: number
  ease?: string | ((t: number) => number)
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars' | 'lines, words' | 'lines, words, chars'
  from?: Record<string, unknown>
  to?: Record<string, unknown>
  threshold?: number
  rootMargin?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  tag?: keyof HTMLElementTagNameMap
  staggerFrom?: 'start' | 'center' | 'end' | 'edges' | 'random' | number
  mask?: boolean
  effect?: 'rise' | 'fade' | 'blur' | 'flip' | 'pop' | 'skew' | 'wave'
  trigger?: 'view' | 'load' | 'hover' | 'click'
  loop?: boolean
  loopDelay?: number
  hoverEffect?: 'none' | 'lift' | 'wave'
  color?: string
  accentColor?: string
  onLetterAnimationComplete?: () => void
}

declare function SplitText(props: SplitTextProps): ReactNode
export default SplitText
