import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import Offers from '@/components/sections/Offers'
import Services from '@/components/sections/Services'
import BeforeAfter from '@/components/sections/BeforeAfter'
import Commitments from '@/components/sections/Commitments'
import Booking from '@/components/sections/Booking'
import Footer from '@/components/sections/Footer'
import MobileContactBar from '@/components/sections/MobileContactBar'
import RevealObserver from '@/components/ui/RevealObserver'
import { branches, site } from '@/lib/site-data'

// JSON-LD cho SEO địa phương (R4.7)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: site.name,
  description: `${site.brandUpper} – ${site.tagline}`,
  telephone: site.phone,
  sameAs: [site.facebookHref],
  image: '/images/logo/main-logo.jpg',
  department: branches.map((b) => ({
    '@type': 'BeautySalon',
    name: `${site.name} – ${b.label}`,
    telephone: site.phone,
    address: { '@type': 'PostalAddress', streetAddress: b.address, addressCountry: 'VN' },
    hasMap: b.mapsHref,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: site.hours.open,
      closes: site.hours.close,
    },
  })),
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <a href="#noi-dung" className="skip-link">
        Bỏ qua tới nội dung chính
      </a>
      <Header />
      <main id="noi-dung" className="flex-1">
        <Hero />
        <Offers />
        <Services />
        <BeforeAfter />
        <Commitments />
        <Booking />
      </main>
      <Footer />
      <MobileContactBar />
      <RevealObserver />
    </>
  )
}
