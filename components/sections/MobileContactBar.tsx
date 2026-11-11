import Icon from '@/components/ui/Icon'
import { site } from '@/lib/site-data'

/** Thanh liên hệ nhanh cố định đáy màn hình trên mobile/tablet (R3.2). */
export default function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-20px_rgb(122_85_70/0.5)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex h-12 max-w-lg items-stretch gap-2">
        <a
          href={site.telHref}
          aria-label={`Gọi ${site.phoneDisplay}`}
          className="press flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl text-brand-dark hover:bg-pink/60 active:bg-pink"
        >
          <Icon name="phone" size={18} />
          <span className="text-xs font-semibold">Gọi ngay</span>
        </a>
        <a
          href={site.zaloHref}
          target="_blank"
          rel="noopener noreferrer"
          className="press flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl text-brand-dark hover:bg-pink/60 active:bg-pink"
        >
          <Icon name="chat" size={18} />
          <span className="text-xs font-semibold">Chat Zalo</span>
        </a>
        <a
          href="#dat-lich"
          className="press flex flex-[1.6] items-center justify-center gap-2 rounded-2xl bg-brand-dark text-base font-semibold text-white shadow-button active:brightness-110"
        >
          <Icon name="calendar" size={18} />
          Đặt lịch ngay
        </a>
      </div>
    </div>
  )
}
