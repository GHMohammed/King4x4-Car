/**
 * إعداد العملة الموحّد للمتجر: الدينار الكويتي.
 * تغيير العملة لاحقاً يتم من هنا فقط.
 */
export const CURRENCY = {
  code: 'KWD',
  symbol: 'د.ك',
  /** الدينار الكويتي يُقسّم إلى 1000 فلس (3 خانات عشرية) */
  fractionDigits: 3,
} as const;

/** الرقم فقط بدون رمز العملة (مع فواصل الآلاف، وخانات عشرية عند الحاجة). */
export function formatAmount(amount: number): string {
  const rounded = Math.round(amount * 1000) / 1000;
  if (Number.isInteger(rounded)) {
    return rounded.toLocaleString('en-US');
  }
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: CURRENCY.fractionDigits,
    maximumFractionDigits: CURRENCY.fractionDigits,
  });
}

/**
 * اللغة الحالية لرمز العملة. يضبطها LanguageProvider عند تغيير اللغة،
 * حتى تعرض دالة formatPrice الرمز الصحيح (د.ك / KWD) بدون تمرير اللغة لكل نداء.
 */
let currencyLang: 'ar' | 'en' = 'ar';
export function setCurrencyLang(lang: 'ar' | 'en'): void {
  currencyLang = lang;
}
export function currencySymbol(): string {
  return currencyLang === 'en' ? 'KWD' : CURRENCY.symbol;
}

/** السعر كاملاً مع رمز العملة حسب اللغة الحالية، مثال: "1,150 د.ك" أو "1,150 KWD". */
export function formatPrice(amount: number): string {
  return `${formatAmount(amount)} ${currencySymbol()}`;
}
