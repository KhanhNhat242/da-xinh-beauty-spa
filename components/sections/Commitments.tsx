import Image from 'next/image'
import orgahue from '@/public/images/site/orgahue.webp'
import khach from '@/public/images/site/khach-le-tan.webp'
import { ButtonLink, Container, SectionHeading, WaveDivider, revealDelay } from '@/components/ui/primitives'
import { usps } from '@/lib/site-data'
import { nw } from '@/lib/no-widow'

export default function Commitments() {
  return (
    <section id="cam-ket" aria-labelledby="cam-ket-title" className="relative bg-cream pt-14 pb-24 md:pt-16 md:pb-28 lg:pt-24 lg:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Ảnh thật: sản phẩm + khách tại quầy */}
          <div data-reveal="up" className="relative order-2 mx-auto w-full max-w-[520px] lg:order-1 lg:max-w-none">
            <div className="relative aspect-[5/5.4]">
              <div className="absolute top-0 left-0 h-[82%] w-[62%] overflow-hidden rounded-t-full rounded-b-[28px] border-[6px] border-white shadow-soft">
                <Image
                  src={orgahue}
                  alt="Khay sản phẩm Orgahue chính hãng dùng trong liệu trình tại Da Xinh"
                  fill
                  sizes="(min-width: 1024px) 320px, 62vw"
                  className="reveal-zoom object-cover"
                />
              </div>
              <div className="absolute right-0 bottom-0 h-[58%] w-[52%] overflow-hidden rounded-[24px] border-[6px] border-white shadow-soft">
                <Image
                  src={khach}
                  alt="Khách hàng cười tươi cùng kỹ thuật viên tại quầy lễ tân Da Xinh"
                  fill
                  sizes="(min-width: 1024px) 270px, 52vw"
                  className="reveal-zoom object-cover object-[50%_70%]"
                />
              </div>
            </div>
          </div>

          {/* 5 cam kết — giữ dấu gạch đầu dòng như bài đăng gốc của khách */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              id="cam-ket-title"
              align="left"
              title="An tâm làm đẹp tại Da Xinh"
              subtitle="Đặt lịch chăm sóc da tại Da Xinh Beauty Spa:"
            />
            <ul className="mt-6 border-t border-brand/20">
              {usps.map((u, i) => (
                <li
                  key={u}
                  data-reveal="up"
                  style={revealDelay(i * 60)}
                  className={`flex items-baseline gap-4 border-b border-brand/20 py-4 ${
                    i === 0 ? 'font-serif text-[1.65rem] leading-snug font-semibold text-ink' : 'text-lg text-ink/90'
                  }`}
                >
                  <span aria-hidden="true" className="shrink-0 text-brand">
                    –
                  </span>
                  {nw(u)}
                </li>
              ))}
            </ul>
            <div className="mt-8" data-reveal="up">
              <ButtonLink href="#dat-lich" trailingArrow>
                Đặt lịch tư vấn ngay
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      <WaveDivider fill="beige" flip />
    </section>
  )
}
