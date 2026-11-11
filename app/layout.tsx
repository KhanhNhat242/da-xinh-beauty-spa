import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Suspense } from 'react'

// Font hỗ trợ tiếng Việt (R2.4)
const heading = Cormorant_Garamond({
  variable: '--font-heading',
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const body = Be_Vietnam_Pro({
  variable: '--font-body',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  // TODO(content): đổi sang domain thật khi deploy (NEXT_PUBLIC_SITE_URL).
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Da Xinh Beauty Spa – Chăm sóc da mụn chuẩn y khoa',
  description:
    'Da Xinh Beauty Spa – chuỗi chăm sóc da chuyên nghiệp: lấy nhân mụn 15 bước chuẩn y khoa, combo 198K, soi da bằng máy miễn phí. Cơ sở Dĩ An, Thuận An, Buôn Ma Thuột. Hotline 0935 884 688.',
  openGraph: {
    title: 'Da Xinh Beauty Spa – Chăm sóc da mụn chuẩn y khoa',
    description:
      'Không upsale – không chèo kéo. Soi da bằng máy miễn phí, combo 198K lấy nhân mụn.',
    locale: 'vi_VN',
    type: 'website',
    images: [{ url: '/images/logo/main-logo.jpg', width: 2000, height: 2000, alt: 'Logo Da Xinh Beauty Spa' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFDF9',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <AntdRegistry>{children}</AntdRegistry>
        </Suspense>
      </body>
    </html>
  )
}
