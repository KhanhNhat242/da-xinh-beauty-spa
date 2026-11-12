import type { CSSProperties } from 'react'
import Image from 'next/image'
import heroLeft from '@/public/images/site/hero-trai.webp'
import heroRight from '@/public/images/site/hero-phai.webp'
import { ButtonLink, WaveDivider } from '@/components/ui/primitives'
import SplitText from '@/components/ui/SplitText'
import HeroInView from '@/components/ui/HeroInView'
import { nw } from '@/lib/no-widow'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

/**
 * Hero bố cục 3 cột: ảnh sát mép trái – nội dung giữa – ảnh sát mép phải.
 * Hai ảnh mờ dần vào nền kem bằng mặt nạ có mép cong (.mask-curve-*), không phải đường thẳng.
 * Mobile/tablet: một dải ảnh phía trên, mép dưới cong, nội dung bên dưới.
 */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-inview="false"
      className="relative isolate overflow-hidden bg-cream lg:flex lg:h-svh lg:max-h-[960px] lg:min-h-[680px] lg:items-center lg:pt-20 2xl:h-auto 2xl:max-h-none 2xl:min-h-0 2xl:pt-[calc(5rem+7.5rem)] 2xl:pb-40"
    >
      {/* Ảnh mép trái (desktop) */}
      <div
        data-hero-slide="left"
        className="mask-curve-left pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[31%] lg:block xl:w-[35%] 2xl:w-[min(37%,52rem)]"
      >
        <Image
          src={heroRight}
          alt="Kỹ thuật viên Da Xinh thoa dưỡng chất cho khách nam"
          fill
          loading="eager"
          sizes="(min-width: 1536px) min(37vw, 832px), (min-width: 1280px) 35vw, 31vw"
          className="object-cover object-[8%_40%]"
        />
      </div>

      {/* Ảnh mép phải (desktop) */}
      <div
        data-hero-slide="right"
        className="mask-curve-right pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[31%] lg:block xl:w-[35%] 2xl:w-[min(37%,52rem)]"
      >
        <Image
          src={heroLeft}
          alt="Kỹ thuật viên Da Xinh đang chăm sóc da cho khách tại phòng trị liệu"
          fill
          loading="eager"
          sizes="(min-width: 1536px) min(37vw, 832px), (min-width: 1280px) 35vw, 31vw"
          className="object-cover object-[100%_45%]"
        />
      </div>

      {/* Quầng kem mềm phía sau chữ để giữ tương phản khi ảnh lan vào giữa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-[radial-gradient(ellipse_34%_58%_at_50%_50%,var(--color-cream)_55%,transparent_100%)] lg:block"
      />

      {/* Dải ảnh phía trên (mobile/tablet) */}
      <div className="hero-in mask-curve-bottom relative h-[44svh] min-h-[280px] sm:h-[48svh] lg:hidden" style={d(0)}>
        <Image
          src={heroRight}
          alt="Kỹ thuật viên Da Xinh thoa dưỡng chất cho khách nam"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
      </div>

      {/* Nội dung giữa */}
      <div
        className="hero-in relative mx-auto w-full max-w-[36rem] px-4 pb-24 text-center sm:px-6 sm:pb-28 lg:max-w-[32rem] lg:px-0 lg:pb-0 xl:max-w-[36rem]"
        style={d(200)}
      >
        <h1
          id="hero-title"
          className="-mt-6 font-serif text-[2.4rem] leading-[1.08] font-semibold text-ink sm:-mt-10 sm:text-[3rem] lg:mt-0 lg:text-[3.1rem] xl:text-[3.6rem]"
        >
          {/* Hiệu ứng chữ hiện từng ký tự (React Bits SplitText); giữ phần nghiêng "chuyên nghiệp" */}
          <SplitText
            tag="span"
            text="Chuỗi chăm sóc da chuyên nghiệp tại Sài Gòn, Bình Dương, Đồng Nai"
            effect="rise"
            splitType="chars"
            delay={50}
            duration={1.25}
            staggerFrom="start"
            trigger="view"
            hoverEffect="lift"
            loop={false}
            loopDelay={1.5}
            mask={false}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          >
            Chuỗi chăm sóc da <em className="text-brand italic">chuyên nghiệp</em> {nw('tại Sài Gòn, Bình Dương, Đồng Nai')}
          </SplitText>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          {nw(
            'Giải pháp lấy nhân mụn chuẩn y khoa, êm dịu và tiết kiệm dành riêng cho làn da tuổi dậy thì, học sinh – sinh viên.',
          )}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="#dat-lich" icon="calendar">
            Đặt lịch soi da miễn phí
          </ButtonLink>
          <ButtonLink href="#uu-dai" variant="outline" trailingArrow>
            Xem Combo 198K
          </ButtonLink>
        </div>
      </div>

      <WaveDivider fill="beige" />
      <HeroInView />
    </section>
  )
}
