import deepClean from '@/public/images/site/deep-clean.webp'
import { Container } from '@/components/ui/primitives'
import ServicesCarousel, { type CarouselItem } from './ServicesCarousel'
import { featuredService, services } from '@/lib/site-data'
import { nw } from '@/lib/no-widow'

// 7 dịch vụ: Trị mụn (chủ lực) luôn đứng đầu (R3.4), sau đó đúng thứ tự trong phiếu
const items: CarouselItem[] = [
  {
    id: featuredService.id,
    label: 'Trị mụn',
    title: 'Lấy nhân mụn quy trình 15 bước chuẩn y khoa',
    description: 'Dịch vụ chủ lực của Da Xinh dành cho làn da mụn tuổi dậy thì.',
    bullets: featuredService.benefits,
    note: featuredService.note,
    cta: 'Đặt lịch trị mụn',
    icon: 'drop',
    image: deepClean,
    imageAlt: 'Làn da căng mịn, sạch mụn sau liệu trình Deep Clean Skin',
  },
  ...services.map((s) => ({
    id: s.id,
    label: s.name,
    title: s.name,
    description: s.short,
    cta: s.id === 'soi-da' ? 'Đặt lịch soi da' : 'Đặt lịch báo giá',
    icon: s.icon,
    image: s.image,
    imageAlt: s.imageAlt,
  })),
]

export default function Services() {
  return (
    <section id="dich-vu" aria-labelledby="dich-vu-title" className="relative bg-cream pt-14 md:pt-16 lg:pt-24">
      <Container>
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8" data-reveal="up">
          <h2 id="dich-vu-title" className="font-serif text-[2.15rem] leading-[1.12] font-semibold text-ink sm:text-[2.6rem] lg:col-span-7 lg:text-5xl">
            {nw('Dịch vụ chăm sóc da chuẩn y khoa')}
          </h2>
          <p className="text-base leading-relaxed text-muted lg:col-span-5 lg:pb-2">
            {nw('Phác đồ rõ ràng, dược mỹ phẩm chính hãng, chi phí vừa túi tiền học sinh – sinh viên. Cuộn để xem từng dịch vụ.')}
          </p>
        </div>
      </Container>

      <ServicesCarousel items={items} footnote="Giá các dịch vụ khác vui lòng liên hệ hoặc đặt lịch để được báo giá." />

    </section>
  )
}
