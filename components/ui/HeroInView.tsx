'use client'

import { useEffect } from 'react'

/**
 * Bật `data-inview="true"` trên #top khi Hero lọt vào màn hình (≥ 30%) → 2 ảnh hai bên trượt vào.
 * Khi Hero khuất hẳn → `data-inview="false"` (ảnh lặng lẽ về vị trí xuất phát) để lần sau cuộn tới lại chạy.
 * Không render gì; CSS nằm ở globals.css ([data-hero-slide]).
 */
export default function HeroInView() {
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    if (!('IntersectionObserver' in window)) {
      hero.dataset.inview = 'true'
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3) hero.dataset.inview = 'true'
        else if (!entry.isIntersecting) hero.dataset.inview = 'false'
      },
      { threshold: [0, 0.3] },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return null
}
