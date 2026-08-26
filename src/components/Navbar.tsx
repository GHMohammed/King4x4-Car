import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Wrench,
  Car,
  Layers,
  Compass,
  Sparkles,
  Phone,
  Truck,
  ChevronDown,
  User,
} from 'lucide-react';
import { KingLogo } from './KingLogo';
import { ActiveTab, Vehicle } from '../types';
import { useVehicles } from '../data/hooks';
import { useLanguage, vehicleName } from '../i18n/LanguageContext';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  openCart: () => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  openSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  selectedVehicle,
  setSelectedVehicle,
  openSearch,
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const supportRef = useRef<HTMLDivElement>(null);
  const { data: vehicles } = useVehicles();
  const { t, lang, toggle } = useLanguage();

  // خلفية شفافة في الأعلى، وتصبح صلبة عند التمرير للأسفل
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // ضبط الحالة الأولية (مثلاً عند إعادة التحميل في منتصف الصفحة)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // القائمة المفتوحة على الموبايل تفرض خلفية صلبة للقراءة
  const solid = scrolled || mobileMenuOpen;

  // إغلاق قائمة الدعم عند النقر خارجها أو بمفتاح Esc
  useEffect(() => {
    if (!supportOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (supportRef.current && !supportRef.current.contains(e.target as Node)) setSupportOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSupportOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [supportOpen]);

  // شريط "عرض الموسم" العلوي — مخفي حالياً.
  // TODO(dashboard): يُتحكَّم بإظهاره/إخفائه وتخصيص نصّه لاحقاً من لوحة تحكم مدير المتجر.
  const SHOW_SEASON_BANNER = false;

  const navLinks: { tab: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'home', label: t('nav.home'), icon: <Compass className="w-4 h-4" /> },
    { tab: 'store', label: t('nav.shop'), icon: <Layers className="w-4 h-4" /> },
    {
      tab: 'builder',
      label: t('nav.builder'),
      icon: <Wrench className="w-4 h-4" />,
      badge: t('nav.interactive'),
    },
    { tab: 'vehicles', label: t('nav.vehicles'), icon: <Car className="w-4 h-4" /> },
    { tab: 'services', label: t('nav.services'), icon: <Wrench className="w-4 h-4" /> },
  ];

  // روابط قائمة "الدعم"
  const supportLinks: { path: string; label: string; icon: React.ReactNode }[] = [
    { path: '/contact', label: t('nav.contact'), icon: <Phone className="w-4 h-4" /> },
    { path: '/track-order', label: t('nav.trackOrder'), icon: <Truck className="w-4 h-4" /> },
  ];

  const go = (path: string) => {
    navigate(path);
    setSupportOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-[#101416]/95 backdrop-blur-md border-b border-[#323538] shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Top micro banner — خلفية ثابتة #2E3192 دائماً. مخفي عبر SHOW_SEASON_BANNER (لوحة التحكم مستقبلاً) */}
      {SHOW_SEASON_BANNER && (
        <div className="bg-[#2E3192] text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#fae500] text-[#101416] font-bold px-2 py-0.5 rounded text-[11px]">
                {t('nav.banner.season')}
              </span>
              <span className="font-medium text-white/90">{t('nav.banner.text')}</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-white/80">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#fae500]" />
                {t('nav.banner.support')}
              </span>
              <span className="text-white/40">|</span>
              <button
                onClick={() => setActiveTab('brand')}
                className="hover:text-[#fae500] transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fae500]" />
                {t('nav.banner.brandGuide')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Right Side: Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center focus:outline-none group text-right"
              aria-label="KING 4x4 Home"
            >
              <div className="shrink-0">
                <KingLogo variant="color" size="md" />
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.tab;
              return (
                <button
                  key={link.tab}
                  onClick={() => setActiveTab(link.tab)}
                  className={`relative px-3.5 py-2 rounded-lg font-tajawal font-bold text-sm transition-all flex items-center gap-2 ${
                    isActive ? 'text-[#fae500]' : 'text-[#e0e3e6] hover:text-[#fae500]'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] bg-[#fae500] text-[#101416] px-1.5 py-0.5 rounded font-extrabold animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#fae500] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Support dropdown — يفتح بالمرور (hover) ويغلق عند خروج المؤشر */}
            <div
              className="relative"
              ref={supportRef}
              onMouseEnter={() => setSupportOpen(true)}
              onMouseLeave={() => setSupportOpen(false)}
            >
              <button
                onClick={() => setSupportOpen((v) => !v)}
                className="px-3.5 py-2 rounded-lg font-tajawal font-bold text-sm text-[#e0e3e6] hover:text-[#fae500] transition-colors flex items-center gap-1.5"
                aria-haspopup="menu"
                aria-expanded={supportOpen}
              >
                {t('nav.support')}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${supportOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {supportOpen && (
                // pt-2 = جسر شفاف يغطّي الفجوة بين الزر والقائمة حتى لا يُغلق أثناء العبور
                <div className="absolute top-full end-0 pt-2 w-48 z-50">
                  <div className="bg-[#1d2022] border border-[#323538] rounded-xl shadow-2xl py-2">
                    {supportLinks.map((s) => (
                      <button
                        key={s.path}
                        onClick={() => go(s.path)}
                        className="w-full text-right px-3 py-2 text-xs font-bold text-[#e0e3e6] hover:bg-[#272a2d] hover:text-[#fae500] flex items-center gap-2.5 transition-colors"
                      >
                        <span className="text-[#fae500]">{s.icon}</span>
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Left Side: Action Buttons (bare icons) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language Switcher */}
            <button
              onClick={toggle}
              className="p-2 text-[#e0e3e6] hover:text-[#fae500] transition-colors text-xs font-montserrat font-extrabold"
              aria-label="Switch language"
              title={lang === 'ar' ? 'English' : 'العربية'}
            >
              {lang === 'ar' ? 'EN' : 'ع'}
            </button>

            {/* Search Button */}
            <button
              onClick={openSearch}
              className="p-2 text-[#e0e3e6] hover:text-[#fae500] transition-colors"
              title={t('nav.search')}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Login (pill button — no dropdown) */}
            <button
              onClick={() => navigate('/login')}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-[11px] rounded-lg border bg-[#191c1e] border-[#323538] text-[#bec6e0] hover:text-[#fae500] hover:border-[#fae500] text-xs font-bold font-tajawal transition-colors"
              title={t('nav.login')}
            >
              <User className="w-4 h-4" />
              <span>{t('nav.login')}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-lg bg-[#fae500] text-[#101416] hover:bg-[#dbc900] font-bold transition-all shadow-md flex items-center gap-1.5"
              title={t('nav.cart')}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs font-montserrat font-extrabold hidden sm:inline">
                {t('nav.cart')}
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#2E3192] text-white text-[11px] font-montserrat font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#101416]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e0e3e6] hover:text-[#fae500] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101416] border-b border-[#323538] px-4 pt-3 pb-6 space-y-2">
          {/* Login (prominent) */}
          <button
            onClick={() => go('/login')}
            className="w-full px-4 py-3 rounded-lg font-tajawal font-bold text-sm bg-[#191c1e] text-white hover:bg-[#272a2d] border border-[#323538] hover:border-[#fae500] flex items-center gap-3"
          >
            <User className="w-4 h-4 text-[#fae500]" />
            <span>{t('nav.login')}</span>
          </button>

          {navLinks.map((link) => {
            const isActive = activeTab === link.tab;
            return (
              <button
                key={link.tab}
                onClick={() => {
                  setActiveTab(link.tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-lg font-tajawal font-bold text-sm flex items-center justify-between ${
                  isActive
                    ? 'bg-[#fae500] text-[#101416]'
                    : 'bg-[#191c1e] text-[#e0e3e6] hover:bg-[#272a2d]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] bg-[#2E3192] text-white px-2 py-0.5 rounded font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Support links */}
          {supportLinks.map((s) => (
            <button
              key={s.path}
              onClick={() => go(s.path)}
              className="w-full text-right px-4 py-3 rounded-lg font-tajawal font-bold text-sm bg-[#191c1e] text-[#e0e3e6] hover:bg-[#272a2d] flex items-center gap-3"
            >
              <span className="text-[#fae500]">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => {
              toggle();
              setMobileMenuOpen(false);
            }}
            className="w-full px-4 py-3 rounded-lg font-tajawal font-bold text-sm bg-[#191c1e] text-[#e0e3e6] hover:bg-[#272a2d] border border-[#323538] flex items-center justify-between"
          >
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            <span className="font-montserrat font-extrabold text-[#fae500]">
              {lang === 'ar' ? 'EN' : 'ع'}
            </span>
          </button>

          {/* Quick vehicle selection */}
          <div className="pt-3 border-t border-[#323538] mt-4">
            <p className="text-xs text-[#bec6e0] mb-2 font-bold">{t('nav.selectVehicle')}</p>
            <div className="grid grid-cols-3 gap-2">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVehicle(v);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg text-center text-xs font-bold border ${
                    selectedVehicle?.id === v.id
                      ? 'bg-[#2E3192] text-white border-[#fae500]'
                      : 'bg-[#191c1e] text-[#bec6e0] border-[#323538]'
                  }`}
                >
                  {vehicleName(v, lang)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
