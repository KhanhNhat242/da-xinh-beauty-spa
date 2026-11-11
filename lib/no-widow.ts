/**
 * Chống "rớt 1 chữ" xuống dòng cuối: nối 2 từ cuối bằng khoảng trắng không ngắt (U+00A0),
 * nên dòng cuối của mọi đoạn luôn có ít nhất 2 từ — trên mọi trình duyệt, mọi kích thước màn hình.
 * Dùng kèm `text-wrap: pretty/balance` trong globals.css để dàn dòng đẹp hơn.
 */
export function nw(text: string): string {
  const trimmed = text.trim()
  const i = trimmed.lastIndexOf(' ')
  if (i <= 0) return trimmed
  return `${trimmed.slice(0, i)} ${trimmed.slice(i + 1)}`
}
