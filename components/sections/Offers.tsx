import { Container, SectionHeading, WaveDivider } from '@/components/ui/primitives'
import OfferCards from './OfferCards'

export default function Offers() {
  return (
    <section id="uu-dai" aria-labelledby="uu-dai-title" className="grain relative isolate bg-beige pt-14 pb-24 md:pt-16 md:pb-28 lg:pt-24 lg:pb-36">
      <Container>
        <SectionHeading
          id="uu-dai-title"
          title="Ưu đãi cho làn da mụn"
          subtitle="Combo 198K cho làn da mụn và buổi soi da bằng máy miễn phí – tư vấn đúng tình trạng, không chèo kéo."
        />
        <div data-reveal="up">
          <OfferCards />
        </div>
      </Container>

      <WaveDivider fill="cream" flip />
    </section>
  )
}
