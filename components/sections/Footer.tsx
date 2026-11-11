import Image from 'next/image'
import logo from '@/public/images/site/logo-daxinh.png'
import Icon from '@/components/ui/Icon'
import { branches, navLinks, site } from '@/lib/site-data'
import { nw } from '@/lib/no-widow'

export default function Footer() {
  return (
    <footer className="relative bg-pink/60 pt-14 pb-24 lg:pt-16 lg:pb-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Image src={logo} alt={site.name} className="h-12 w-auto" />
          <p className="mt-5 max-w-xs text-base leading-relaxed text-ink/75">
            {site.brandUpper} – {nw(site.tagline)}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Da Xinh Beauty Spa"
              className="press grid size-11 place-items-center rounded-full bg-white text-brand-dark shadow-card hover:bg-brand-dark hover:text-white"
            >
              <Icon name="facebook" size={20} />
            </a>
            <a
              href={site.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo Da Xinh Beauty Spa"
              className="press grid h-11 place-items-center rounded-full bg-white px-4 text-sm font-bold text-brand-dark shadow-card hover:bg-brand-dark hover:text-white"
            >
              Zalo
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <h2 className="font-serif text-xl font-semibold text-ink">Hệ thống cơ sở</h2>
          <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink/75">
            {branches.map((b) => (
              <li key={b.id} className="flex gap-2.5">
                <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-brand" />
                <span>
                  <strong className="font-semibold text-ink">{b.label}:</strong> {nw(b.address)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-serif text-xl font-semibold text-ink">Liên hệ</h2>
          <ul className="mt-4 space-y-3 text-[15px] text-ink/75">
            <li>
              <a href={site.telHref} className="flex min-h-11 items-center gap-2.5 hover:text-brand-dark">
                <Icon name="phone" size={17} className="text-brand" /> Hotline: {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="clock" size={17} className="mt-0.5 shrink-0 text-brand" />
              <span>
                {site.hours.display}
                <span className="block text-sm text-muted">({site.hours.note})</span>
              </span>
            </li>
          </ul>
          <nav aria-label="Liên kết chân trang" className="mt-6">
            <ul className="flex flex-wrap gap-x-5 text-[15px] font-medium text-brand-dark">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-ink hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="mx-auto mt-12 w-full max-w-6xl border-t border-brand/15 px-4 pt-6 text-center text-sm text-muted sm:px-6 lg:px-8">
        © {site.name}
      </div>
    </footer>
  )
}
