/** بيانات تواصل الشركة — مصدر واحد يُستخدم في صفحة المنتج وصفحة اتصل بنا. */
export const CONTACT = {
  /** رقم واتساب بصيغة دولية بدون + */
  whatsapp: '96560600890',
  hotline: '1822228',
  email: 'support@king4x4.com',
} as const;

/** بناء رابط واتساب مع رسالة اختيارية جاهزة. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
