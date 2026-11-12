import { Container, SectionHeading } from '@/components/ui/primitives'
import VideoGallery from './VideoGallery'
import { spaVideos } from '@/lib/site-data'

export default function Videos() {
  return (
    <section id="video" aria-labelledby="video-title" className="relative bg-cream pt-14 pb-10 md:pt-16 lg:pt-24 lg:pb-12">
      <Container>
        <SectionHeading
          id="video-title"
          title="Video thực tế tại Da Xinh"
          subtitle="Xem khách hàng trải nghiệm soi da, lấy nhân mụn và peel da ngay tại spa. Bấm vào video để xem lớn."
        />
        <VideoGallery videos={spaVideos} />
      </Container>
    </section>
  )
}
