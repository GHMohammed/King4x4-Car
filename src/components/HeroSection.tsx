import React from 'react';
import { ArrowLeft, Wrench, Shield, Compass, Mountain, Zap } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';
import { ActiveTab } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  onShopNow: () => void;
  onBuildRig: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onBuildRig,
}) => {
  const { t } = useLanguage();
  return (
    <section className="relative w-full overflow-hidden border-b-4 border-[#fae500]">
      {/* Background Image Container */}
      <div className="relative min-h-[640px] md:min-h-[720px] flex items-center justify-center">
        {/* Background Image with optimized blending */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center md:bg-right-top transition-all duration-700 transform scale-105"
          style={{ 
            backgroundImage: `url('${HERO_IMAGE}')`,
          }}
        >
          {/* Gradients to match the screenshot & brand aesthetics */}
          <div className="absolute inset-0 bg-[#101416]/75 md:bg-[#101416]/65 backdrop-contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101416] via-[#101416]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101416] via-[#101416]/70 to-transparent hidden md:block" />
        </div>

        {/* Content Container — pt علوي لضمان مسافة أمان أسفل الهيدر الثابت */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 md:pt-44 md:pb-24 flex flex-col md:items-start items-center text-center md:text-start">

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight md:leading-[1.15] mb-6 drop-shadow-2xl font-tajawal max-w-2xl">
            {t('hero.title1')} <br />
            <span className="text-[#fae500] drop-shadow-[0_4px_24px_rgba(250,229,0,0.4)]">
              {t('hero.title2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#bec6e0] max-w-xl mb-10 leading-relaxed font-tajawal font-medium">
            {t('hero.subtitle')}
          </p>

          {/* Call to Actions (matching user buttons) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
            <button
              onClick={onShopNow}
              className="w-full sm:w-auto bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-tajawal font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(250,229,0,0.5)] transition-all flex items-center justify-center gap-3 group"
            >
              <span>{t('hero.shopNow')}</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onBuildRig}
              className="w-full sm:w-auto bg-[#2E3192] hover:bg-[#252875] text-white font-tajawal font-bold text-lg px-8 py-4 rounded-xl border border-[#c0c1ff]/30 shadow-lg hover:shadow-[0_0_25px_rgba(46,49,146,0.5)] transition-all flex items-center justify-center gap-3"
            >
              <Wrench className="w-5 h-5 text-[#fae500]" />
              <span>{t('hero.buildRig')}</span>
            </button>
          </div>

          {/* Brand Values Badges (from Image 2) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl pt-6 border-t border-[#323538]/70">
            <div className="bg-[#191c1e]/80 border border-[#323538] hover:border-[#fae500]/50 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm transition-colors">
              <div className="p-2 rounded-lg bg-[#fae500]/10 text-[#fae500]">
                <Mountain className="w-5 h-5" />
              </div>
              <div className="text-start">
                <div className="text-sm font-bold text-white font-tajawal">{t('hero.value.adventure')}</div>
                <div className="text-[11px] text-[#908f9d]">{t('hero.value.adventureSub')}</div>
              </div>
            </div>

            <div className="bg-[#191c1e]/80 border border-[#323538] hover:border-[#fae500]/50 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm transition-colors">
              <div className="p-2 rounded-lg bg-[#2E3192]/40 text-[#c0c1ff]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-start">
                <div className="text-sm font-bold text-white font-tajawal">{t('hero.value.power')}</div>
                <div className="text-[11px] text-[#908f9d]">{t('hero.value.powerSub')}</div>
              </div>
            </div>

            <div className="bg-[#191c1e]/80 border border-[#323538] hover:border-[#fae500]/50 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm transition-colors">
              <div className="p-2 rounded-lg bg-[#fae500]/10 text-[#fae500]">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-start">
                <div className="text-sm font-bold text-white font-tajawal">{t('hero.value.reliability')}</div>
                <div className="text-[11px] text-[#908f9d]">{t('hero.value.reliabilitySub')}</div>
              </div>
            </div>

            <div className="bg-[#191c1e]/80 border border-[#323538] hover:border-[#fae500]/50 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm transition-colors">
              <div className="p-2 rounded-lg bg-[#2E3192]/40 text-[#c0c1ff]">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-start">
                <div className="text-sm font-bold text-white font-tajawal">{t('hero.value.trips')}</div>
                <div className="text-[11px] text-[#908f9d]">{t('hero.value.tripsSub')}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
