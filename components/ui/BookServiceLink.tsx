'use client'

import type { ReactNode } from 'react'

export const BOOKING_SELECT_EVENT = 'daxinh:booking-select'

/** Link tới form đặt lịch, đồng thời chọn sẵn dịch vụ tương ứng. */
export default function BookServiceLink({
  serviceId,
  className,
  children,
}: {
  serviceId: string
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href="#dat-lich"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(BOOKING_SELECT_EVENT, { detail: serviceId }))}
    >
      {children}
    </a>
  )
}
