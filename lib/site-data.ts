/**
 * NGUỒN DỮ LIỆU DUY NHẤT về doanh nghiệp (quy tắc R1.1).
 * Mọi chuỗi ở đây phải khớp nguyên văn Phần A của docs/REQUIREMENTS.md.
 * Không hard-code các thông tin này trong component.
 */

export const site = {
  name: 'Da Xinh Beauty Spa',
  brandUpper: 'DA XINH BEAUTY SPA',
  tagline: 'Chuỗi chăm sóc da chuyên nghiệp tại Sài Gòn, Bình Dương, Đồng Nai',
  phone: '0935884688',
  phoneDisplay: '0935 884 688',
  telHref: 'tel:0935884688',
  zaloHref: 'https://zalo.me/0935884688',
  facebookHref: 'https://www.facebook.com/daxinhbeautyspa/',
  hours: {
    display: '8h30 – 20h00',
    lastBooking: '19:30',
    note: 'Nhận lịch cuối lúc 19:30',
    open: '08:30',
    close: '20:00',
  },
  /** Lời kêu gọi gốc của khách (nguyên văn phiếu). */
  ctaQuote:
    'Inbox ngay cho Da Xinh để soi da tư vấn tình trạng da bằng máy soi da miễn phí và nhận hướng dẫn chăm sóc da khoa học hơn nhé!',
} as const

export type Branch = {
  id: string
  label: string
  area: string
  address: string
  note?: string
  mapsHref: string
}

const mapsSearch = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export const branches: Branch[] = [
  {
    id: 'co-so-1',
    label: 'Cơ sở 1',
    area: 'Dĩ An',
    address:
      '185/18 Hai Bà Trưng Nối Dài, Khu phố Tây A, Phường Đông Hoà, Tp. Hồ Chí Minh',
    note: 'Tp. Dĩ An cũ, cách Go Dĩ An khoảng 800m',
    // Link Google Maps duy nhất trong phiếu — tạm gắn cho Cơ sở 1 (REQUIREMENTS Q3).
    mapsHref: 'https://maps.app.goo.gl/HAHEy9SVMqkNjkCGA',
  },
  {
    id: 'co-so-2',
    label: 'Cơ sở 2',
    area: 'Buôn Ma Thuột',
    address: 'Số 51 Nguyễn Thị Minh Khai, TP. Buôn Ma Thuột.',
    mapsHref: mapsSearch('Da Xinh Beauty Spa 51 Nguyễn Thị Minh Khai Buôn Ma Thuột'),
  },
  {
    id: 'co-so-3',
    label: 'Cơ sở 3',
    area: 'Thuận An',
    address: '53 Đường 22 Tháng 12, khu phố 4, Thuận An, Bình Dương',
    mapsHref: mapsSearch('Da Xinh Beauty Spa 53 Đường 22 Tháng 12 Thuận An'),
  },
]

export const usps = [
  'Không upsale – không chèo kéo',
  'Tư vấn đúng tình trạng da',
  'Quy trình chuẩn y khoa',
  'Dược mỹ phẩm chính hãng',
  'Chi phí tiết kiệm, không vẽ liệu trình hét giá',
] as const

export type IconName =
  | 'drop'
  | 'sparkle'
  | 'layers'
  | 'light'
  | 'laser'
  | 'hair'
  | 'scan'

export type Service = {
  id: string
  /** Tên dịch vụ (nguyên văn phiếu). */
  name: string
  /** Mô tả ngắn hiển thị trên thẻ. */
  short: string
  icon: IconName
  image?: string
  imageAlt?: string
}

/** Dịch vụ chủ lực — luôn đứng đầu và nổi bật nhất (R3.4). */
export const featuredService = {
  id: 'tri-mun',
  name: 'Trị mụn – Lấy nhân mụn quy trình 15 bước chuẩn y khoa',
  // 3 lợi ích lấy từ ấn phẩm "Deep Clean Skin" của khách (public/images/tư liệu).
  benefits: [
    'Lấy sạch nhân mụn, giảm bí tắc',
    'Cải thiện thâm mụn rõ rệt',
    'Ngăn ngừa mụn tái phát',
  ],
  note: 'Chi tiết 15 bước sẽ được chuyên viên tư vấn trực tiếp theo tình trạng da.',
} as const

export const services: Service[] = [
  {
    id: 'tri-tham',
    name: 'Trị thâm',
    short: 'Chăm sóc và phục hồi làn da sáng mịn sau mụn.',
    icon: 'drop',
    image: '/images/site/tri-tham.webp',
    imageAlt: 'Kỹ thuật viên đắp mặt nạ chăm sóc da sau mụn cho khách',
  },
  {
    id: 'peel-da',
    name: 'Peel da chuẩn y khoa',
    short: 'Có phương pháp Layer Peel giúp tái tạo bề mặt da an toàn.',
    icon: 'layers',
    image: '/images/site/peel-da.webp',
    imageAlt: 'Kỹ thuật viên thực hiện peel da cho khách tại Da Xinh',
  },
  {
    id: 'dien-di-vitamin-c',
    name: 'Điện di Vitamin C',
    short: 'Kết hợp ủ đèn ánh sáng sinh học giúp làm dịu và sáng da.',
    icon: 'light',
    image: '/images/site/dien-di-anh-sang.webp',
    imageAlt: 'Khách được ủ đèn ánh sáng sinh học làm dịu da',
  },
  {
    id: 'triet-long',
    name: 'Triệt lông',
    short: 'Triệt lông Diode Laser êm dịu, giúp da thông thoáng và mịn màng.',
    icon: 'laser',
    // TODO(content): chờ khách cung cấp ảnh thực tế dịch vụ triệt lông.
  },
  {
    id: 'goi-dau',
    name: 'Gội đầu thư giãn',
    short: 'Giải tỏa căng thẳng sau những giờ học và làm việc mệt mỏi.',
    icon: 'hair',
    // TODO(content): chờ khách cung cấp ảnh thực tế dịch vụ gội đầu.
  },
  {
    id: 'soi-da',
    name: 'Soi da bằng máy miễn phí',
    short: 'Phân tích da khoa học trước khi bắt đầu mọi liệu trình.',
    icon: 'scan',
    image: '/images/site/soi-da-may.webp',
    imageAlt: 'Kết quả phân tích da trên máy soi da',
  },
]

export const combo = {
  price: '198K',
  title: 'Combo 198K lấy nhân mụn',
  gift: 'Tặng thêm 1 buổi gội đầu, điện di Vitamin C hoặc triệt lông.',
} as const

/** 3 ý từ ấn phẩm "Vì sao nên soi da định kỳ" của khách. */
export const skinScanReasons = [
  { title: 'Phát hiện sớm', text: 'vấn đề dưới tầng biểu bì' },
  { title: 'Theo dõi sự thay đổi', text: 'của làn da qua từng giai đoạn' },
  { title: 'Tối ưu', text: 'hiệu quả chăm sóc da' },
] as const

/** Lựa chọn dịch vụ trong form đặt lịch (REQUIREMENTS mục 7). */
export const bookingServiceOptions = [
  { value: 'combo-198k', label: 'Combo 198K lấy nhân mụn' },
  { value: 'tri-mun', label: 'Trị mụn – lấy nhân mụn 15 bước' },
  ...services.map((s) => ({ value: s.id, label: s.name })),
  { value: 'chua-biet', label: 'Chưa biết – cần soi da tư vấn' },
]

/** Khung giờ nhận lịch: 8:30 → 19:30, mỗi 30 phút. */
export const bookingTimeSlots: string[] = (() => {
  const slots: string[] = []
  for (let m = 8 * 60 + 30; m <= 19 * 60 + 30; m += 30) {
    slots.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`)
  }
  return slots
})()

/**
 * Ca trước – sau: ảnh thật từ ấn phẩm của khách (public/images/tư liệu), đã tách đôi, khách đã được che mắt.
 * Chữ mô tả lấy nguyên văn trên ấn phẩm tương ứng. Chỉ dùng dịch vụ có trong phiếu (Trị mụn, Peel da).
 */
export type BeforeAfterCase = {
  id: string
  service: 'tri-mun' | 'peel-da'
  treatment: string
  facts: { label: string; value: string }[]
  before: string
  after: string
}

// Thứ tự tab: Peel da (trái, mở mặc định) – Trị mụn (phải)
export const beforeAfterTabs = [
  { value: 'peel-da', label: 'Peel da' },
  { value: 'tri-mun', label: 'Trị mụn' },
] as const

const ba = (file: string) => ({
  before: `/images/site/truoc-sau/${file}-truoc.webp`,
  after: `/images/site/truoc-sau/${file}-sau.webp`,
})

const taoCanxiFacts = [
  { label: 'Tình trạng ban đầu', value: 'Mụn viêm, thâm đỏ, thâm đen · Dầu nhờn, sần sùi kém mịn màng' },
  { label: 'Sau liệu trình', value: 'Chống viêm & giảm thâm mụn · Sáng mịn, làm đều màu da' },
]
const layerPeelFacts = [{ label: 'Công dụng', value: 'Phục hồi & tái tạo · Giảm sạch mụn · Mờ thâm mụn' }]

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: 'deep-clean-1',
    service: 'tri-mun',
    treatment: 'Liệu trình Deep Clean Skin',
    facts: [{ label: 'Liệu trình', value: 'Deep Clean Skin – lấy nhân mụn' }],
    ...ba('deep-clean-1'),
  },
  { id: 'layer-peel-1', service: 'peel-da', treatment: 'Layer Peel', facts: layerPeelFacts, ...ba('layer-peel-1') },
  { id: 'layer-peel-2', service: 'peel-da', treatment: 'Layer Peel', facts: layerPeelFacts, ...ba('layer-peel-2') },
  { id: 'peel-tao-canxi-1', service: 'peel-da', treatment: 'Peel tảo canxi', facts: taoCanxiFacts, ...ba('peel-tao-canxi-1') },
  { id: 'peel-tao-canxi-2', service: 'peel-da', treatment: 'Peel tảo canxi', facts: taoCanxiFacts, ...ba('peel-tao-canxi-2') },
  { id: 'peel-tao-canxi-3', service: 'peel-da', treatment: 'Peel tảo canxi', facts: taoCanxiFacts, ...ba('peel-tao-canxi-3') },
  { id: 'peel-tao-canxi-4', service: 'peel-da', treatment: 'Peel tảo canxi', facts: taoCanxiFacts, ...ba('peel-tao-canxi-4') },
]

/**
 * Video thực tế (file trong public/videos). Ảnh bìa: public/videos/posters (cắt từ khung hình, bỏ chữ giá in sẵn).
 * Tiêu đề lấy theo chữ hiện trên video hoặc mô tả trung tính đúng nội dung khung hình; chú thích chỉ dùng
 * nguyên văn bài đăng Facebook của khách — không tự viết thêm (R1.2).
 */
export type SpaVideo = {
  id: string
  src: string
  poster: string
  title: string
  /** Chú thích nguyên văn bài đăng; null = chưa có (TODO content) */
  caption: string | null
  /** Thời lượng (giây) đọc từ file */
  duration: number
}

export const spaVideos: SpaVideo[] = [
  {
    id: 'video1',
    src: '/videos/video1.mp4',
    poster: '/videos/posters/video1.webp',
    title: 'Pov: Lần đầu đi chăm sóc da mụn',
    caption: null, // TODO(content): chờ khách gửi chú thích bài đăng gốc
    duration: 103,
  },
  {
    id: 'video2',
    src: '/videos/video2.mp4',
    poster: '/videos/posters/video2.webp',
    title: 'Chăm sóc da bằng Microneedling',
    caption: null, // TODO(content): chờ khách gửi chú thích bài đăng gốc
    duration: 28,
  },
  {
    id: 'video3',
    src: '/videos/video3.mp4',
    poster: '/videos/posters/video3.webp',
    title: 'Hành trình Peel tảo canxi của TikToker Phi Yến',
    // Nguyên văn phần đã có của bài đăng Facebook. TODO(content): bổ sung phần còn lại của chú thích.
    caption: [
      'HÀNH TRÌNH PEEL TẢO CANXI CỦA TIKTOKER PHI YẾN TẠI DA XINH BEAUTY SPA',
      'Peel da không chỉ là câu chuyện trước và sau một buổi làm đẹp, mà còn là hành trình theo dõi và chăm sóc làn da qua từng ngày.',
      'Lần này, cùng KOC Phi Yến theo dõi hành trình trải nghiệm Peel Tảo Canxi tại Da Xinh Beauty Spa nhé!',
      '📍 Từ buổi peel đầu tiên, những ngày da thay đổi cho đến khi làn da dần phục hồi - mỗi giai đoạn đều được ghi lại qua những video follow-up thực tế.',
      '🌸 Cùng Phi Yến theo dõi từng chặng của hành trình:',
      '➖ Ngày đầu tiên: Trải nghiệm quy trình Peel Tảo Canxi tại Da Xinh.',
    ].join('\n'),
    duration: 74,
  },
  {
    id: 'video4',
    src: '/videos/video4.mp4',
    poster: '/videos/posters/video4.webp',
    title: 'Soi da và lấy nhân mụn tại Da Xinh',
    caption: null, // TODO(content): chờ khách gửi chú thích bài đăng gốc
    duration: 73,
  },
  {
    id: 'video5',
    src: '/videos/video5.mp4',
    poster: '/videos/posters/video5.webp',
    title: 'Hôm nay mình trải nghiệm dịch vụ có tốt không ạ',
    caption: null, // TODO(content): chờ khách gửi chú thích bài đăng gốc
    duration: 108,
  },
]

export const navLinks = [
  { href: '#uu-dai', label: 'Ưu đãi 198K' },
  { href: '#dich-vu', label: 'Dịch vụ' },
  { href: '#truoc-sau', label: 'Kết quả' },
  { href: '#video', label: 'Video' },
  { href: '#cam-ket', label: 'Cam kết' },
] as const
