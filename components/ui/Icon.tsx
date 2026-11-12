import type { ReactNode, SVGProps } from 'react'

export type IconKey =
  | 'drop'
  | 'sparkle'
  | 'layers'
  | 'light'
  | 'laser'
  | 'hair'
  | 'scan'
  | 'phone'
  | 'chat'
  | 'calendar'
  | 'clock'
  | 'pin'
  | 'arrow'
  | 'check'
  | 'heart'
  | 'shield'
  | 'leaf'
  | 'coin'
  | 'handshake'
  | 'menu'
  | 'close'
  | 'play'
  | 'volume'
  | 'facebook'
  | 'search'
  | 'chart'
  | 'users'
  | 'gift'
  | 'slider'

const paths: Record<IconKey, ReactNode> = {
  drop: <path d="M12 3.5c3 3.6 6 7.1 6 10.4a6 6 0 1 1-12 0c0-3.3 3-6.8 6-10.4Z M9.5 14.5a2.6 2.6 0 0 0 2.5 2.5" />,
  sparkle: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M12 7.5c.6 2.4 2.1 3.9 4.5 4.5-2.4.6-3.9 2.1-4.5 4.5-.6-2.4-2.1-3.9-4.5-4.5 2.4-.6 3.9-2.1 4.5-4.5Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 4 8.5 4.5L12 13 3.5 8.5 12 4Z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>
  ),
  laser: (
    <>
      <rect x="4" y="9" width="10" height="6" rx="2" />
      <path d="M14 12h6M17 8.5l3-1.5M17 15.5l3 1.5" />
    </>
  ),
  hair: (
    <>
      <path d="M6 20c0-6 2.5-11 6-11s6 5 6 11" />
      <path d="M8.5 6.5C9.5 4.8 10.6 4 12 4s2.5.8 3.5 2.5M9.5 20c0-3.5 1-6.5 2.5-6.5s2.5 3 2.5 6.5" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M7.5 17.5c1-1.8 2.6-2.7 4.5-2.7s3.5.9 4.5 2.7" />
    </>
  ),
  phone: (
    <path d="M5.5 4h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.7 6.7l1.3-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3.5 6a2 2 0 0 1 2-2Z" />
  ),
  chat: <path d="M4.5 12a7.5 7 0 1 1 3.4 5.9L4 19l1.1-3.6A6.8 6.8 0 0 1 4.5 12Z M9 11h6M9 14h4" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
      <path d="M8 3.5v4M16 3.5v4M4 10h16M8.5 14h2M13.5 14h2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  arrow: <path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  heart: <path d="M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z" />,
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13.5 14-14 0 9-5.5 14-13 14H5Z" />
      <path d="M5 19c3-4 6-6.5 9.5-8.5" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.9 2.5 2.1-1 2-2.5 2c-1.2 0-2.1-.5-2.6-1.3M12 6.5V8M12 16v1.5" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 11.5 6.5 8l3 1.5L12 8l3.5-1 5.5 5" />
      <path d="m7 13.5 3.5 3.5a1.5 1.5 0 0 0 2.1 0l4.9-4.9M9.5 15.5l1.6-1.6M12 18l1.4-1.4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />,
  volume: <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4v-5ZM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  facebook: <path d="M14 8.5h2.5V5h-2.5A3.5 3.5 0 0 0 10.5 8.5v2H8V14h2.5v6.5H14V14h2.5l.5-3.5h-3v-1.5c0-.3.2-.5.5-.5Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
    </>
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c.7-3.2 3-5 6-5s5.3 1.8 6 5M16 5.5a3.2 3.2 0 0 1 0 6.2M18 14.8c1.6.7 2.6 2.3 3 4.7" />
    </>
  ),
  slider: <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />,
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3 9h18M12 9v11M12 9S10.5 4.5 8 4.5a2.2 2.2 0 0 0 0 4.5M12 9s1.5-4.5 4-4.5a2.2 2.2 0 0 1 0 4.5" />
    </>
  ),
}

type Props = SVGProps<SVGSVGElement> & { name: IconKey; size?: number }

export default function Icon({ name, size = 20, strokeWidth = 1.6, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
