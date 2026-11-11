import { Container, SectionHeading, WaveDivider } from '@/components/ui/primitives'
import BeforeAfterSlider from './BeforeAfterSlider'
import { beforeAfterCases, beforeAfterTabs } from '@/lib/site-data'

export default function BeforeAfter() {
  // Chỉ hiện tab có ca thật
  const tabs = beforeAfterTabs.filter((t) => beforeAfterCases.some((c) => c.service === t.value))

  return (
    <section id="truoc-sau" aria-labelledby="truoc-sau-title" className="grain relative isolate bg-beige pt-14 pb-24 md:pt-16 md:pb-28 lg:pt-24 lg:pb-32">
      <Container>
        <SectionHeading
          id="truoc-sau-title"
          align="left"
          title="Làn da khách hàng trước và sau tại Da Xinh"
          subtitle="Chọn dịch vụ, rồi kéo thanh trượt trên ảnh để tự so sánh làn da trước và sau liệu trình."
        />
        <div className="mt-10" data-reveal="up">
          <BeforeAfterSlider cases={beforeAfterCases} tabs={tabs} />
        </div>
      </Container>

      <WaveDivider fill="cream" flip />
    </section>
  )
}
