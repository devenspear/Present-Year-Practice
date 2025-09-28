import { format } from 'date-fns'

export function generateICS(title: string, description: string, date: Date, duration: number = 60): string {
  const start = format(date, "yyyyMMdd'T'HHmmss")
  const end = format(new Date(date.getTime() + duration * 60000), "yyyyMMdd'T'HHmmss")
  
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Present Year Practice//EN
BEGIN:VEVENT
UID:${Date.now()}@presentyearpractice.com
DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss")}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`
  
  return ics
}

export function downloadICS(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToText(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportToPDF(element: HTMLElement, filename: string): Promise<void> {
  const html2canvas = (await import('html2canvas')).default
  const jsPDF = (await import('jspdf')).default
  
  const canvas = await html2canvas(element)
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF()
  const imgWidth = 210
  const pageHeight = 295
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  pdf.save(`${filename}.pdf`)
}

export function showNotification(message: string, type: 'info' | 'success' | 'warning' = 'info'): void {
  if (typeof window === 'undefined') return
  
  const notification = document.createElement('div')
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-primary'
  
  notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up`
  notification.textContent = message
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.style.opacity = '0'
    setTimeout(() => document.body.removeChild(notification), 300)
  }, 3000)
}