import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  Activity, 
  Zap, 
  Gauge,
  PhoneCall,
  MapPin
} from 'lucide-react';
import { useVehicles, useServices } from '../data/hooks';

interface ServicesSectionProps {
  prefilledNotes?: string;
}

// خريطة أسماء الأيقونات القادمة من طبقة البيانات إلى مكوّنات Lucide
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-6 h-6 text-[#fae500]" />,
  Flame: <Flame className="w-6 h-6 text-[#fae500]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#fae500]" />,
  Zap: <Zap className="w-6 h-6 text-[#fae500]" />,
  Gauge: <Gauge className="w-6 h-6 text-[#fae500]" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ prefilledNotes = '' }) => {
  const { data: vehicles } = useVehicles();
  const { data: services } = useServices();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleBrand: 'toyota',
    vehicleModel: '',
    serviceType: 'suspension_install',
    date: '',
    notes: prefilledNotes,
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('يرجى تعبئة الاسم ورقم الجوال لتأكيد الحجز');
      return;
    }
    setBookingSuccess(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-[#2E3192]/50 border border-[#fae500]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#fae500] mb-3">
          <Wrench className="w-4 h-4" />
          <span>مركز صيانة وتجهيز كينج 4x4 GARAGE & TUNING</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-tajawal mb-4">
          خدمات التركيب والورشة المتخصصة
        </h1>
        <p className="text-[#bec6e0] font-tajawal text-base">
          فريق من أمهر الفنيين المتخصصين في تعديل ووزن سيارات الدفع الرباعي والمساعدات الصحراوية بأحدث المعدات.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-[#191c1e] border border-[#323538] hover:border-[#fae500]/60 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#101416] border border-[#323538] group-hover:border-[#fae500] flex items-center justify-center mb-4 transition-colors">
                {SERVICE_ICONS[svc.iconName]}
              </div>
              <h3 className="font-bold text-lg text-white font-tajawal mb-2 group-hover:text-[#fae500] transition-colors">
                {svc.title}
              </h3>
              <p className="text-xs text-[#bec6e0] font-tajawal leading-relaxed mb-6">
                {svc.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#323538] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#908f9d]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#bec6e0]" />
                  مدة العمل التقديرية:
                </span>
                <span className="font-bold text-white">{svc.time}</span>
              </div>
              <div className="flex items-center justify-between text-[#908f9d]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#fae500]" />
                  الضمان:
                </span>
                <span className="font-bold text-[#fae500]">{svc.warranty}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Location & Quick Contact Card */}
        <div className="bg-gradient-to-br from-[#2E3192] to-[#101416] border border-[#c0c1ff]/30 rounded-2xl p-6 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div className="inline-flex p-3 rounded-xl bg-white/10 mb-4">
              <MapPin className="w-6 h-6 text-[#fae500]" />
            </div>
            <h3 className="text-xl font-bold font-tajawal mb-2">
              موقع الورشة والمعرض الرئيسي
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4 font-tajawal">
              الرياض - مخرج الصناعية الدائري، مجمع مراكز الدفع الرباعي والمغامرات.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#fae500]" />
                <span>السبت إلى الخميس: 9:00 ص - 10:00 م</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#fae500]" />
                <span>الرقم الموحد: 920004400</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/20 mt-6">
            <span className="text-xs text-[#fae500] font-bold">
              استقبال بدون موعد مسبق للكشف السريع
            </span>
          </div>
        </div>
      </div>

      {/* Online Appointment Booking Box */}
      <div className="bg-[#191c1e] border-2 border-[#fae500]/50 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="max-w-3xl mx-auto">
          
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#323538]">
            <div className="p-3 bg-[#fae500] text-[#101416] rounded-xl font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white font-tajawal">
                حجز موعد تركيب أو صيانة في المركز
              </h3>
              <p className="text-xs text-[#bec6e0]">
                اختر نوع الخدمة وسنقوم بالتواصل معك لتأكيد الموعد واستلام سيارتك
              </p>
            </div>
          </div>

          {bookingSuccess ? (
            <div className="bg-[#101416] border border-[#fae500] rounded-2xl p-8 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 bg-[#fae500]/20 text-[#fae500] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white font-tajawal">
                تم استلام طلب حجز الموعد بنجاح!
              </h4>
              <p className="text-sm text-[#bec6e0] font-tajawal max-w-md mx-auto">
                شكراً لك يا <span className="text-[#fae500] font-bold">{formData.name}</span>. سيتواصل معك أحد مهندسي ورشة KING 4x4 عبر الرقم <span className="text-white font-bold">{formData.phone}</span> لتأكيد وقت الزيارة وتجهيز القطع المطلوبة.
              </p>
              <button
                onClick={() => setBookingSuccess(false)}
                className="mt-4 px-6 py-2.5 bg-[#fae500] text-[#101416] font-bold text-xs rounded-xl"
              >
                حجز موعد لسيارة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-[#bec6e0] mb-1.5 font-tajawal">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: خالد المطيري"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white px-4 py-3 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#bec6e0] mb-1.5 font-tajawal">
                    رقم الجوال (واتساب) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white px-4 py-3 rounded-xl outline-none"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-[#bec6e0] mb-1.5 font-tajawal">
                    نوع السيارة
                  </label>
                  <select
                    value={formData.vehicleBrand}
                    onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                    className="w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white px-4 py-3 rounded-xl outline-none"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.arabicName} ({v.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#bec6e0] mb-1.5 font-tajawal">
                    موديل وسنة الصنع
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: لاندكروزر 2023"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    className="w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white px-4 py-3 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#bec6e0] mb-1.5 font-tajawal">
                    نوع الخدمة المطلوبة
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white px-4 py-3 rounded-xl outline-none"
                  >
                    <option value="suspension_install">تركيب أطقم مساعدات ورفع</option>
                    <option value="shock_rebuild">صيانة وشحن نيتروجين كينج</option>
                    <option value="bumpers_armor">تركيب صدامات وونش</option>
                    <option value="laser_alignment">ميزان ليزر وضبط زوايا</option>
                    <option value="full_rig">تجهيز كامل للرحلات والأوفرلاند</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-xs font-bold text-[#bec6e0] mb-1.5 font-tajawal">
                  ملاحظات إضافية أو القطع التي تريد تركيبها
                </label>
                <textarea
                  rows={3}
                  placeholder="اكتب أي استفسار أو تفاصيل إضافية..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white px-4 py-2.5 rounded-xl outline-none resize-none font-tajawal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-extrabold text-base rounded-xl font-tajawal flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>إرسال طلب الحجز لمهندس الورشة</span>
              </button>

            </form>
          )}

        </div>
      </div>

    </div>
  );
};
