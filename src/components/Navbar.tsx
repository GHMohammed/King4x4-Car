import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Wrench, 
  Car, 
  Layers, 
  Compass, 
  Palette, 
  Sparkles,
  Phone,
  CheckCircle2,
  ChevronDown
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
  const { data: vehicles } = useVehicles();
  const { t, lang, toggle } = useLanguage();

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
    { tab: 'brand', label: t('nav.brand'), icon: <Palette className="w-4 h-4" /> },
  ];

  const LangToggle: React.FC<{ className?: string }> = ({ className = '' }) => (
    <button
      onClick={toggle}
      className={`px-2.5 py-2 rounded-lg bg-[#191c1e] text-[#e0e3e6] hover:text-[#fae500] hover:bg-[#272a2d] border border-[#323538] transition-colors text-xs font-montserrat font-extrabold ${className}`}
      aria-label="Switch language"
      title={lang === 'ar' ? 'English' : 'العربية'}
    >
      {lang === 'ar' ? 'EN' : 'ع'}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#101416]/95 backdrop-blur-md border-b border-[#323538] transition-all">
      {/* Top micro banner */}
      <div className="bg-[#2E3192] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#fae500] text-[#101416] font-bold px-2 py-0.5 rounded text-[11px]">
              {t('nav.banner.season')}
            </span>
            <span className="font-medium text-white/90">
              {t('nav.banner.text')}
            </span>
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
              <div className="flex items-center gap-3">
                <div className="bg-[#0b0f11] p-2 rounded-xl border border-[#323538] group-hover:border-[#fae500] transition-colors shadow-inner">
                  <KingLogo variant="color" size="md" />
                </div>
                <div className="hidden xl:block">
                  <span className="block text-xs font-bold text-[#fae500] tracking-wider font-montserrat">
                    OFF-ROAD PERFORMANCE
                  </span>
                  <span className="text-[13px] text-[#bec6e0] font-tajawal">
                    {t('nav.tagline')}
                  </span>
                </div>
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
                    isActive
                      ? 'text-[#fae500] bg-[#1d2022] border border-[#fae500]/30 shadow-sm'
                      : 'text-[#e0e3e6] hover:text-[#fae500] hover:bg-[#191c1e]'
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
          </nav>

          {/* Left Side: Vehicle Badge & Action Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Vehicle Filter Pill */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setVehicleDropdownOpen(!vehicleDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  selectedVehicle
                    ? 'bg-[#2E3192]/20 border-[#2E3192] text-white'
                    : 'bg-[#191c1e] border-[#323538] text-[#bec6e0] hover:border-[#fae500]'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-[#fae500]" />
                <span>
                  {selectedVehicle ? vehicleName(selectedVehicle, lang) : t('nav.selectVehicle')}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* Vehicle Dropdown */}
              {vehicleDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-[#1d2022] border border-[#323538] rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#fae500] border-b border-[#323538]/50">
                    {t('nav.filterByVehicle')}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedVehicle(null);
                      setVehicleDropdownOpen(false);
                    }}
                    className="w-full text-right px-3 py-2 text-xs text-[#e0e3e6] hover:bg-[#272a2d] flex items-center justify-between"
                  >
                    <span>{t('nav.allVehicles')}</span>
                    {!selectedVehicle && <CheckCircle2 className="w-3.5 h-3.5 text-[#fae500]" />}
                  </button>
                  {vehicles.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVehicle(v);
                        setVehicleDropdownOpen(false);
                      }}
                      className="w-full text-right px-3 py-2 text-xs text-[#e0e3e6] hover:bg-[#272a2d] flex items-center justify-between"
                    >
                      <span className="font-bold">{vehicleName(v, lang)}</span>
                      {selectedVehicle?.id === v.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#fae500]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <LangToggle />

            {/* Search Button */}
            <button
              onClick={openSearch}
              className="p-2.5 rounded-lg bg-[#191c1e] text-[#e0e3e6] hover:text-[#fae500] hover:bg-[#272a2d] border border-[#323538] transition-colors"
              title={t('nav.search')}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
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
              className="lg:hidden p-2.5 rounded-lg bg-[#191c1e] text-[#e0e3e6] hover:text-[#fae500] border border-[#323538]"
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
