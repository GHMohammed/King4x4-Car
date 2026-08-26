import { ActiveTab } from '../types';

/** يربط تبويبات التنقّل (الواجهة القديمة) بمسارات الراوتر الحقيقية. */
export function tabToPath(tab: ActiveTab): string {
  switch (tab) {
    case 'home':
      return '/';
    case 'store':
      return '/shop';
    case 'builder':
      return '/builder';
    case 'vehicles':
      return '/vehicles';
    case 'services':
      return '/services';
    case 'brand':
      return '/brand';
    default:
      return '/';
  }
}

/** يستنتج التبويب النشِط من المسار الحالي (لإبراز رابط التنقّل). */
export function pathToTab(pathname: string): ActiveTab {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/shop') || pathname.startsWith('/product')) return 'store';
  if (pathname.startsWith('/builder')) return 'builder';
  if (pathname.startsWith('/vehicles')) return 'vehicles';
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.startsWith('/brand')) return 'brand';
  return 'home';
}
