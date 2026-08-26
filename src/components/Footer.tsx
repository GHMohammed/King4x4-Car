import React from 'react';
import { KingLogo } from './KingLogo';
import { ActiveTab } from '../types';
import { Phone, Mail, MapPin, Shield, Truck, Award, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#0b0f11] border-t-2 border-[#323538] text-[#bec6e0] font-tajawal mt-auto">
      
      {/* Value Badges Strip */}
      <div className="border-b border-[#323538] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#fae500]/10 text-[#fae500]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-white">شحن سريع لدول الخليج</h5>
              <p className="text-[11px] text-[#908f9d]">تغليف آمن للشحنات الثقيلة</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2E3192]/40 text-[#c0c1ff]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-white">ضمان الوكيل الرسمي</h5>
              <p className="text-[11px] text-[#908f9d]">قطع كينج و ARB الأصلية 100%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#fae500]/10 text-[#fae500]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-white">فريق فني معتمد</h5>
              <p className="text-[11px] text-[#908f9d]">خبراء ميزان وتعديل الدفع الرباعي</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2E3192]/40 text-[#c0c1ff]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-white">خدمة عملاء ودعم فني</h5>
              <p className="text-[11px] text-[#908f9d]">مستشارون جاهزون لمساعدتك</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block">
              <KingLogo variant="color" size="md" />
            </div>
            <p className="text-xs sm:text-sm text-[#908f9d] leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#fae500] font-bold font-montserrat">
              <span>KING 4x4 PERFORMANCE SYSTEMS</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 border-b border-[#323538] pb-2">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-[#fae500] transition-colors"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('store')}
                  className="hover:text-[#fae500] transition-colors"
                >
                  {t('nav.shop')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('builder')}
                  className="hover:text-[#fae500] transition-colors text-[#fae500] font-bold"
                >
                  {t('nav.builder')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('vehicles')}
                  className="hover:text-[#fae500] transition-colors"
                >
                  {t('nav.vehicles')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-[#fae500] transition-colors"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('brand')}
                  className="hover:text-[#fae500] transition-colors"
                >
                  {t('nav.brand')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 border-b border-[#323538] pb-2">
              {t('footer.categories')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#908f9d]">
              <li>مساعدات ويايات KING Shocks 2.5 / 3.0</li>
              <li>صدامات وونشات ARB و WARN</li>
              <li>كشافات وإضاءات باجا ديزاينز Baja</li>
              <li>خيام ومظلات التخييم iKamper</li>
              <li>رنقات ميثود Method Race Wheels</li>
              <li>مواطير وضواغط هواء دبل بستن</li>
            </ul>
          </div>

          {/* Col 4: Contact & Workshop */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 border-b border-[#323538] pb-2">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#fae500] flex-shrink-0" />
                <span>{t('footer.location')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#fae500] flex-shrink-0" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#fae500] flex-shrink-0" />
                <span className="font-montserrat">support@king4x4.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar matching user HTML */}
      <div className="border-t border-[#323538] bg-[#080b0c] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-montserrat font-bold text-[#fae500]">KING 4x4</span>
            <span className="text-[#908f9d]">
              {t('footer.rights')}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-[#bec6e0]">
            <a href="#privacy" className="hover:text-[#fae500] transition-colors">{t('footer.privacy')}</a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#fae500] transition-colors">{t('footer.terms')}</a>
            <span>•</span>
            <a href="#warranty" className="hover:text-[#fae500] transition-colors">{t('footer.warrantyLink')}</a>
            <span>•</span>
            <a href="#shipping" className="hover:text-[#fae500] transition-colors">{t('footer.shippingLink')}</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
