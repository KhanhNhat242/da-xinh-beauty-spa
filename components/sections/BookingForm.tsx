'use client'

import { useEffect, useState } from 'react'
import { Button, ConfigProvider, DatePicker, Form, Input, Select } from 'antd'
import viVN from 'antd/locale/vi_VN'
import dayjs, { type Dayjs } from 'dayjs'
import 'dayjs/locale/vi'
import Icon from '@/components/ui/Icon'
import { BOOKING_SELECT_EVENT } from '@/components/ui/BookServiceLink'
import { bookingServiceOptions, bookingTimeSlots, branches, site } from '@/lib/site-data'

dayjs.locale('vi')

type Values = {
  name: string
  phone: string
  branch: string
  service: string
  date: Dayjs
  time: string
  note?: string
}

const theme = {
  token: {
    colorPrimary: '#7a5546',
    colorText: '#3d2e2a',
    colorTextPlaceholder: '#a8958e',
    colorBorder: '#eadbd0',
    colorError: '#c2554b',
    borderRadius: 12,
    controlHeight: 48,
    fontSize: 16,
    controlOutline: 'rgba(122, 85, 70, 0.18)',
    controlOutlineWidth: 3,
    motionDurationMid: '0.2s',
    fontFamily: 'inherit',
  },
}

const normalizePhone = (v: string) => v.replace(/[\s.\-]/g, '')

export default function BookingForm() {
  const [form] = Form.useForm<Values>()
  const [done, setDone] = useState<Values | null>(null)
  const date = Form.useWatch('date', form)

  // Chọn sẵn dịch vụ khi bấm "Đặt lịch báo giá" ở phần Dịch vụ
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (bookingServiceOptions.some((o) => o.value === id)) {
        setDone(null)
        form.setFieldValue('service', id)
      }
    }
    window.addEventListener(BOOKING_SELECT_EVENT, onSelect)
    return () => window.removeEventListener(BOOKING_SELECT_EVENT, onSelect)
  }, [form])

  // Nếu chọn hôm nay: ẩn các khung giờ đã qua (giờ nhận lịch cuối 19:30)
  const timeOptions = bookingTimeSlots.map((t) => {
    let disabled = false
    if (date && date.isSame(dayjs(), 'day')) {
      const [h, m] = t.split(':').map(Number)
      disabled = dayjs().hour(h).minute(m).isBefore(dayjs())
    }
    return { value: t, label: t, disabled }
  })

  const [submitting, setSubmitting] = useState(false)

  const onFinish = (values: Values) => {
    // TODO(content): chưa có nơi nhận lịch (REQUIREMENTS Q5). Bản demo chỉ hiển thị xác nhận, không gửi dữ liệu đi đâu.
    // Micro-interaction: trạng thái "đang xử lý" ngắn để người dùng thấy nút đã phản hồi.
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setDone(values)
    }, 450)
  }

  if (done) {
    const branch = branches.find((b) => b.id === done.branch)
    const service = bookingServiceOptions.find((o) => o.value === done.service)
    return (
      <div className="flex h-full flex-col items-center justify-center py-6 text-center" role="status" aria-live="polite">
        <span className="pop-in grid size-16 place-items-center rounded-full bg-pink text-brand-dark">
          <Icon name="check" size={30} strokeWidth={2} />
        </span>
        <h3 className="mt-5 font-serif text-3xl font-semibold text-ink">Gần xong rồi, {done.name}!</h3>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
          Gọi hotline hoặc nhắn Zalo cho Da Xinh kèm thông tin bên dưới để được xác nhận lịch&nbsp;hẹn.
        </p>
        <dl className="mt-6 w-full max-w-sm space-y-2 rounded-2xl bg-cream p-5 text-left text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Cơ sở</dt>
            <dd className="text-right font-medium">{branch ? `${branch.label} – ${branch.area}` : ''}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Dịch vụ</dt>
            <dd className="text-right font-medium">{service?.label}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Thời gian</dt>
            <dd className="text-right font-medium">
              {done.time} · {done.date.format('DD/MM/YYYY')}
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-muted">Số điện thoại của bạn: {done.phone}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a href={site.telHref} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-dark px-5 text-sm font-semibold text-white hover:brightness-110">
            <Icon name="phone" size={16} /> {site.phoneDisplay}
          </a>
          <a
            href={site.zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-pink px-5 text-sm font-semibold text-brand-dark hover:bg-blush/60"
          >
            <Icon name="chat" size={16} /> Chat Zalo
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            form.resetFields()
            setDone(null)
          }}
          className="mt-6 min-h-11 text-sm font-medium text-brand-dark underline underline-offset-4 hover:text-ink"
        >
          Đặt thêm lịch khác
        </button>
      </div>
    )
  }

  return (
    <ConfigProvider theme={theme} locale={viVN}>
      <Form<Values>
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        scrollToFirstError={{ behavior: 'smooth', block: 'center' }}
        className="booking-form"
      >
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Form.Item label="Họ và tên" name="name" rules={[{ required: true, whitespace: true, message: 'Vui lòng nhập họ tên của bạn' }]}>
            <Input placeholder="VD: Nguyễn Minh Anh" autoComplete="name" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            normalize={(v: string) => v?.replace(/[^\d\s.\-]/g, '')}
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              {
                validator: (_, v?: string) =>
                  !v || /^0\d{9}$/.test(normalizePhone(v))
                    ? Promise.resolve()
                    : Promise.reject(new Error('Số điện thoại gồm 10 số, bắt đầu bằng 0')),
              },
            ]}
          >
            <Input placeholder="VD: 0935 884 688" inputMode="tel" autoComplete="tel" />
          </Form.Item>

          <Form.Item label="Cơ sở" name="branch" rules={[{ required: true, message: 'Vui lòng chọn cơ sở' }]}>
            <Select
              placeholder="Chọn cơ sở gần bạn"
              options={branches.map((b) => ({ value: b.id, label: `${b.label} – ${b.area}` }))}
            />
          </Form.Item>
          <Form.Item label="Dịch vụ quan tâm" name="service" rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}>
            <Select placeholder="Chọn dịch vụ" options={bookingServiceOptions} />
          </Form.Item>

          <Form.Item label="Ngày hẹn" name="date" rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
            <DatePicker
              className="w-full"
              format="DD/MM/YYYY"
              placeholder="Chọn ngày"
              inputReadOnly
              disabledDate={(d) => d.isBefore(dayjs().startOf('day'))}
              onChange={() => form.setFieldValue('time', undefined)}
            />
          </Form.Item>
          <Form.Item
            label="Giờ hẹn"
            name="time"
            extra={`Nhận lịch từ 08:30 đến ${site.hours.lastBooking}`}
            rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
          >
            <Select placeholder="Chọn giờ" options={timeOptions} />
          </Form.Item>
        </div>

        <Form.Item label="Ghi chú / tình trạng da (không bắt buộc)" name="note">
          <Input.TextArea rows={3} placeholder="VD: da dầu, mụn ẩn vùng trán…" maxLength={300} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting} className="!h-[52px] !rounded-full !text-base !font-semibold !shadow-button">
          Gửi đặt lịch soi da
        </Button>
        <p className="mt-4 text-center text-sm text-muted">
          Không upsale – không chèo&nbsp;kéo.
        </p>
      </Form>
    </ConfigProvider>
  )
}
