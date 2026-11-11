import Image from 'next/image'
import deepClean from '@/public/images/site/deep-clean.webp'
import scanMachine from '@/public/images/site/soi-da-may.webp'
import { ButtonLink, Container, WaveDivider, revealDelay } from '@/components/ui/primitives'
import Icon from '@/components/ui/Icon'
import BookServiceLink from '@/components/ui/BookServiceLink'
import { featuredService, services } from '@/lib/site-data'
import { nw } from '@/lib/no-widow'

// "Soi da miễn phí" đã có ô riêng bên cạnh dịch vụ chủ lực → danh sách chỉ còn 5 dịch vụ
const listed = services.filter((s) => s.id !== 'soi-da')

export default function Services() {
  return (
    <section id="dich-vu" aria-labelledby="dich-vu-title" className="relative bg-cream pt-14 pb-24 md:pt-16 md:pb-28 lg:pt-24 lg:pb-32">
      <Container>
        {/* Tiêu đề tách đôi: trái tiêu đề, phải mô tả */}
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8" data-reveal="up">
          <h2 id="dich-vu-title" className="font-serif text-[2.15rem] leading-[1.12] font-semibold text-ink sm:text-[2.6rem] lg:col-span-7 lg:text-5xl">
            {nw('Dịch vụ chăm sóc da chuẩn y khoa')}
          </h2>
          <p className="text-base leading-relaxed text-muted lg:col-span-5 lg:pb-2">
            {nw('Phác đồ rõ ràng, dược mỹ phẩm chính hãng, chi phí vừa túi tiền học sinh – sinh viên.')}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-14 lg:grid-cols-3 lg:gap-8">
          {/* Dịch vụ chủ lực (R3.4) */}
          <article
            data-reveal="up"
            className="grid overflow-hidden rounded-[28px] bg-white shadow-card sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:col-span-2"
          >
            <div className="relative aspect-[4/3] sm:aspect-auto">
              <Image
                src={deepClean}
                alt="Làn da căng mịn, sạch mụn sau liệu trình Deep Clean Skin"
                fill
                sizes="(min-width: 1024px) 330px, (min-width: 640px) 45vw, 100vw"
                className="reveal-zoom object-cover object-[40%_30%]"
              />
            </div>
            <div className="flex flex-col p-7 sm:p-8 lg:p-9">
              <p className="text-sm font-semibold text-brand-dark">Dịch vụ chủ lực · Trị mụn</p>
              <h3 className="mt-2 font-serif text-[1.7rem] leading-[1.15] font-semibold text-ink lg:text-[1.9rem]">
                {nw('Lấy nhân mụn quy trình 15 bước chuẩn y khoa')}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {featuredService.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-base text-ink/85">
                    <Icon name="check" size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-brand" />
                    {nw(b)}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-muted">{nw(featuredService.note)}</p>
              <div className="mt-auto pt-7">
                <BookServiceLink
                  serviceId={featuredService.id}
                  className="press group inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-dark px-6 text-base font-semibold text-white shadow-button hover:-translate-y-0.5 hover:brightness-110"
                >
                  Đặt lịch trị mụn
                  <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
                </BookServiceLink>
              </div>
            </div>
          </article>

          {/* Soi da bằng máy miễn phí — ảnh thật kết quả soi da */}
          <aside data-reveal="up" style={revealDelay(100)} className="flex flex-col overflow-hidden rounded-[28px] bg-pink">
            <div className="relative aspect-[16/10]">
              <Image
                src={scanMachine}
                alt="Kết quả phân tích da trên máy soi da"
                fill
                sizes="(min-width: 1024px) 340px, 100vw"
                className="reveal-zoom object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="font-serif text-[1.6rem] leading-tight font-semibold text-ink">
                {nw('Soi da bằng máy miễn phí')}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink/80">
                {nw('Phân tích da khoa học trước khi bắt đầu mọi liệu trình.')}
              </p>
              <div className="mt-auto pt-6">
                <ButtonLink href="#dat-lich" variant="white" icon="calendar">
                  Đặt lịch soi da
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>

        {/* Các dịch vụ còn lại: danh sách gọn, không thẻ lặp */}
        <ul className="mt-14 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:mt-16 lg:grid-cols-3 lg:gap-x-12">
          {listed.map((s, i) => (
            <li key={s.id} data-reveal="up" style={revealDelay((i % 3) * 70)} className="flex flex-col border-b border-line py-6">
              <h3 className="font-serif text-[1.5rem] leading-tight font-semibold text-ink">{nw(s.name)}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{nw(s.short)}</p>
              <BookServiceLink
                serviceId={s.id}
                className="group mt-3 inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-semibold text-brand-dark underline-offset-4 hover:text-ink hover:underline"
              >
                Đặt lịch báo giá
                <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
              </BookServiceLink>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted" data-reveal="up">
          {nw('Giá các dịch vụ khác vui lòng liên hệ hoặc đặt lịch để được báo giá.')}
        </p>
      </Container>

      <WaveDivider fill="beige" />
    </section>
  )
}
