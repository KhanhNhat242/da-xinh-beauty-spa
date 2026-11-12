import Image from 'next/image'
import bookingBg from '@/public/images/site/booking-bg.webp'
import { Container, revealDelay } from '@/components/ui/primitives'
import Icon from '@/components/ui/Icon'
import BookingForm from './BookingForm'
import { branches, site } from '@/lib/site-data'
import { nw } from '@/lib/no-widow'

export default function Booking() {
  return (
    <section
      id="dat-lich"
      aria-labelledby="dat-lich-title"
      className="relative isolate overflow-hidden bg-beige pt-14 pb-16 md:pt-16 md:pb-20 lg:flex lg:min-h-svh lg:items-center lg:pt-24 lg:pb-28"
    >
      {/* Ảnh nền màu nước phủ kín toàn section (full chiều ngang, cao tối thiểu 1 màn hình trên desktop) */}
      <Image
        src={bookingBg}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="pointer-events-none -z-20 object-cover object-center"
      />
      {/* Lớp kem mờ mỏng giữ chữ dễ đọc trên nền ảnh */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-cream/35" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Form đặt lịch */}
          <div data-reveal="up" className="rounded-[28px] border border-line bg-white p-6 shadow-soft sm:p-8 lg:col-span-7 lg:p-10">
            <h2 id="dat-lich-title" className="font-serif text-[2.1rem] leading-[1.12] font-semibold text-ink sm:text-[2.5rem]">
              {nw('Đặt lịch soi da & tư vấn miễn phí')}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{nw(site.ctaQuote)}</p>
            <div className="mt-8">
              <BookingForm />
            </div>
          </div>

          {/* Giờ mở cửa + 3 cơ sở */}
          <div id="co-so" className="scroll-mt-24 lg:col-span-5">
            <div data-reveal="up" style={revealDelay(100)} className="rounded-[28px] bg-brand-dark p-7 text-white">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Icon name="clock" size={18} /> Giờ mở cửa
              </p>
              <p className="mt-3 font-serif text-5xl leading-none font-semibold">{site.hours.display}</p>
              <p className="mt-3 text-base text-white/90">({site.hours.note})</p>
              <a
                href={site.telHref}
                className="press mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-base font-semibold text-brand-dark hover:bg-cream"
              >
                <Icon name="phone" size={17} /> Hotline: {site.phoneDisplay}
              </a>
            </div>

            <h3 className="mt-10 font-serif text-[1.9rem] leading-tight font-semibold text-ink" data-reveal="up">
              Hệ thống 3 cơ sở
            </h3>
            <ul className="mt-4 border-t border-line">
              {branches.map((b, i) => (
                <li key={b.id} data-reveal="up" style={revealDelay(i * 70)} className="border-b border-line py-5">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-base font-semibold text-ink">
                    {b.label}
                    <span className="font-serif text-xl font-semibold text-brand-dark">{b.area}</span>
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{nw(b.address)}</p>
                  {b.note && <p className="mt-0.5 text-sm text-muted">({nw(b.note)})</p>}
                  <a
                    href={b.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-dark underline-offset-4 hover:text-ink hover:underline"
                  >
                    <Icon name="pin" size={16} />
                    Chỉ đường Google Maps
                    <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
