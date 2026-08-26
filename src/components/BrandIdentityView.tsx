import React, { useState } from 'react';
import { 
  Palette, 
  Copy, 
  Check, 
  Download, 
  Type, 
  Sparkles, 
  Layers, 
  Wrench, 
  ShoppingCart, 
  Compass, 
  Mountain, 
  Zap, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { KingLogo } from './KingLogo';

export const BrandIdentityView: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const colors = [
    {
      name: 'اللون الرئيسي (أزرق ملكي)',
      hex: '#2E3192',
      bgClass: 'bg-[#2E3192]',
      textColor: 'text-white',
      desc: 'يعبر عن القوة والأصالة والاحترافية العالية لماركة كينج',
    },
    {
      name: 'اللون الثانوي (أصفر ملكي)',
      hex: '#FFEA00',
      bgClass: 'bg-[#FFEA00]',
      textColor: 'text-[#101416]',
      desc: 'لون الياي والمساعد الرياضي، يرمز للجرأة والحيوية والمغامرة',
    },
    {
      name: 'خلفيات / نصوص (كحلي غامق)',
      hex: '#0F172A',
      bgClass: 'bg-[#0F172A]',
      textColor: 'text-white',
      desc: 'الخلفية الداكنة الفاخرة المستوحاة من سماء الصحراء ليلاً',
    },
    {
      name: 'خلفيات فاتحة (رمادي فاتح)',
      hex: '#F5F7FA',
      bgClass: 'bg-[#F5F7FA]',
      textColor: 'text-[#101416]',
      desc: 'للبطاقات والعناصر الفاتحة لتباين بصري فائق',
    },
  ];

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedCode(hex);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* Top Banner Card matching Image 2 Top Section */}
      <div className="bg-[#191c1e] border-2 border-[#323538] rounded-3xl p-6 sm:p-10 mb-10 shadow-2xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Logo Showcase (Left/Center) */}
          <div className="lg:col-span-5 flex justify-center bg-[#101416] p-8 rounded-2xl border border-[#323538] shadow-inner">
            <KingLogo variant="color" size="xl" />
          </div>

          {/* Description & Brand Pillars */}
          <div className="lg:col-span-7 text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#fae500] mb-2 font-montserrat">
              <Sparkles className="w-4 h-4" />
              <span>KING 4x4 BRAND IDENTITY SYSTEM</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-white font-tajawal mb-4">
              الهوية البصرية لمتجر KING 4x4
            </h1>

            <p className="text-[#bec6e0] font-tajawal text-base sm:text-lg leading-relaxed mb-6">
              هوية قوية وعصرية تعكس روح المغامرة والقوة والاعتمادية، مستوحاة من عالم تجهيز سيارات الدفع الرباعي والرحلات، وبالاستناد إلى ألوان وشخصية اللوغو الرياضي المميز.
            </p>

            {/* Badges: مغامرة, قوة, اعتمادية, رحلات */}
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#101416] border border-[#323538] text-white px-4 py-2 rounded-xl text-sm font-bold font-tajawal flex items-center gap-2">
                <Mountain className="w-4 h-4 text-[#fae500]" />
                مغامرة
              </span>
              <span className="bg-[#101416] border border-[#323538] text-white px-4 py-2 rounded-xl text-sm font-bold font-tajawal flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#c0c1ff]" />
                قوة
              </span>
              <span className="bg-[#101416] border border-[#323538] text-white px-4 py-2 rounded-xl text-sm font-bold font-tajawal flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#fae500]" />
                اعتمادية
              </span>
              <span className="bg-[#101416] border border-[#323538] text-white px-4 py-2 rounded-xl text-sm font-bold font-tajawal flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c0c1ff]" />
                رحلات
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        
        {/* Section 1: Colors Palette */}
        <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#323538]">
              <Palette className="w-5 h-5 text-[#fae500]" />
              <h3 className="font-bold text-lg text-white font-tajawal">الألوان الأساسية</h3>
            </div>

            <div className="space-y-3 mb-6">
              {colors.map((c) => (
                <div
                  key={c.hex}
                  onClick={() => copyToClipboard(c.hex)}
                  className="bg-[#101416] p-3 rounded-xl border border-[#323538] hover:border-[#fae500] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl shadow-md border border-white/10 ${c.bgClass} flex items-center justify-center`}
                    />
                    <div>
                      <div className="font-bold text-xs text-white font-tajawal">{c.name}</div>
                      <div className="text-xs font-montserrat font-mono text-[#bec6e0]">{c.hex}</div>
                    </div>
                  </div>

                  <div className="text-xs text-[#fae500] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedCode === c.hex ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ HEX</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-[#908f9d] text-center pt-2 border-t border-[#323538]/50">
            انقر على أي لون لنسخ الكود البرمجي مباشرة
          </div>
        </div>

        {/* Section 2: Typography Guidelines */}
        <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#323538]">
            <Type className="w-5 h-5 text-[#fae500]" />
            <h3 className="font-bold text-lg text-white font-tajawal">الخطوط المستخدمة</h3>
          </div>

          {/* English Font: Montserrat */}
          <div className="bg-[#101416] p-4 rounded-xl border border-[#323538] mb-4">
            <span className="text-[11px] font-bold text-[#fae500] font-montserrat block mb-1">
              EN FONT
            </span>
            <h4 className="text-2xl font-bold text-white font-montserrat tracking-tight mb-1">
              Montserrat
            </h4>
            <p className="text-xs text-[#bec6e0] font-montserrat">
              Bold / SemiBold / Medium (الأرقام والعناوين اللاتينية)
            </p>
            <div className="mt-3 pt-2 border-t border-[#323538]/50 text-xs font-montserrat text-[#908f9d]">
              KING 4x4 OFF-ROAD PERFORMANCE 2025
            </div>
          </div>

          {/* Arabic Font: Tajawal */}
          <div className="bg-[#101416] p-4 rounded-xl border border-[#323538]">
            <span className="text-[11px] font-bold text-[#fae500] font-montserrat block mb-1">
              AR FONT
            </span>
            <h4 className="text-2xl font-black text-white font-tajawal mb-1">
              Tajawal تجوال
            </h4>
            <p className="text-xs text-[#bec6e0] font-tajawal">
              Bold / Medium / Regular (العناوين والنصوص العربية)
            </p>
            <div className="mt-3 pt-2 border-t border-[#323538]/50 text-xs font-tajawal text-[#908f9d]">
              طريقك للمغامرة - تجهيز سيارات الدفع الرباعي والمساعدات
            </div>
          </div>
        </div>

        {/* Section 3: Logo Variations (نسخ بديلة للشعار) */}
        <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#323538]">
            <Layers className="w-5 h-5 text-[#fae500]" />
            <h3 className="font-bold text-lg text-white font-tajawal">نسخ بديلة للشعار</h3>
          </div>

          <div className="space-y-3">
            {/* On Dark Navy */}
            <div className="bg-[#0F172A] p-4 rounded-xl border border-[#323538] flex items-center justify-center">
              <KingLogo variant="color" size="md" />
            </div>

            {/* On Golden Yellow */}
            <div className="bg-[#FFEA00] p-4 rounded-xl border border-yellow-600/30 flex items-center justify-center">
              <KingLogo variant="on-yellow" size="md" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#323538] flex items-center justify-between text-xs text-[#bec6e0]">
            <span>التطبيق على الأسطح الداكنة والفاتحة</span>
            <span className="text-[#fae500] font-bold">معتمد 100%</span>
          </div>
        </div>

      </div>

      {/* Row 2: UI Elements & App Icon & Color Usage Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* UI Elements Component */}
        <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-lg text-white font-tajawal mb-4 pb-3 border-b border-[#323538]">
            عناصر واجهة المستخدم
          </h3>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-[#908f9d] mb-1.5 block">أزرار الإجراءات الأساسية:</span>
              <div className="flex flex-col gap-2.5">
                <button className="bg-[#FFEA00] hover:bg-[#dbc900] text-[#101416] font-tajawal font-bold text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md">
                  <ShoppingCart className="w-4 h-4" />
                  <span>تسوق الآن</span>
                </button>
                <button className="bg-[#2E3192] hover:bg-[#252875] text-white font-tajawal font-bold text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md">
                  <Wrench className="w-4 h-4 text-[#FFEA00]" />
                  <span>جهّز سيارتك</span>
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs text-[#908f9d] mb-1.5 block">شارات الحالة والخصومات:</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#FFEA00] text-[#101416] font-bold text-xs px-3 py-1 rounded-lg">
                  جديد
                </span>
                <span className="bg-[#2E3192] text-white font-bold text-xs px-3 py-1 rounded-lg">
                  الأكثر مبيعاً
                </span>
                <span className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-lg">
                  % خصم
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* App Icon & Favicon */}
        <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-lg text-white font-tajawal mb-4 pb-3 border-b border-[#323538]">
            أيقونة المتجر / التطبيق
          </h3>

          <div className="flex items-center justify-around py-4">
            {/* App Icon Variant 1 (Blue) */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2E3192] rounded-2xl p-2.5 flex items-center justify-center shadow-lg border border-[#c0c1ff]/30 mx-auto mb-2">
                <KingLogo variant="color" size="sm" showSubtitle={false} />
              </div>
              <span className="text-xs text-[#bec6e0] font-montserrat">App Icon</span>
            </div>

            {/* App Icon Variant 2 (Yellow) */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFEA00] rounded-2xl p-2.5 flex items-center justify-center shadow-lg border border-yellow-500/50 mx-auto mb-2">
                <KingLogo variant="on-yellow" size="sm" showSubtitle={false} />
              </div>
              <span className="text-xs text-[#bec6e0] font-montserrat">Gold Icon</span>
            </div>

            {/* Favicon */}
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0F172A] rounded-full p-2 flex items-center justify-center shadow-md border border-[#323538] mx-auto mb-2">
                <KingLogo variant="color" size="sm" showSubtitle={false} />
              </div>
              <span className="text-xs text-[#bec6e0] font-montserrat">Favicon</span>
            </div>
          </div>
        </div>

        {/* Color Usage Distribution (نسبة استخدام الألوان) */}
        <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-white font-tajawal mb-4 pb-3 border-b border-[#323538]">
              نسبة استخدام الألوان
            </h3>

            {/* Progress Bar */}
            <div className="h-6 w-full rounded-xl overflow-hidden flex border border-[#323538] mb-4">
              <div className="bg-[#2E3192] h-full w-[60%]" title="60% رئيسي" />
              <div className="bg-[#FFEA00] h-full w-[25%]" title="25% ثانوي" />
              <div className="bg-[#0F172A] h-full w-[10%]" title="10% خلفيات" />
              <div className="bg-[#F5F7FA] h-full w-[5%]" title="5% تفاصيل" />
            </div>

            {/* Breakdown Labels */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div>
                <span className="font-montserrat font-bold text-white block">60%</span>
                <span className="text-[#bec6e0] text-[11px]">رئيسي</span>
              </div>
              <div>
                <span className="font-montserrat font-bold text-[#FFEA00] block">25%</span>
                <span className="text-[#bec6e0] text-[11px]">ثانوي</span>
              </div>
              <div>
                <span className="font-montserrat font-bold text-zinc-400 block">10%</span>
                <span className="text-[#bec6e0] text-[11px]">خلفيات</span>
              </div>
              <div>
                <span className="font-montserrat font-bold text-zinc-200 block">5%</span>
                <span className="text-[#bec6e0] text-[11px]">تفاصيل</span>
              </div>
            </div>
          </div>

          {/* Download specs */}
          <div className="pt-4 border-t border-[#323538] flex items-center justify-between">
            <span className="text-xs text-[#908f9d]">صيغة الشعار:</span>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-[#101416] text-[#fae500] rounded text-[11px] font-bold border border-[#323538]">PNG</span>
              <span className="px-2 py-0.5 bg-[#101416] text-[#fae500] rounded text-[11px] font-bold border border-[#323538]">SVG</span>
              <span className="px-2 py-0.5 bg-[#101416] text-[#fae500] rounded text-[11px] font-bold border border-[#323538]">PDF</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
