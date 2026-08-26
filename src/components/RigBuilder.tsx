import React, { useState } from 'react';
import { 
  Wrench, 
  Check, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  Calendar, 
  Sparkles, 
  Weight, 
  Gauge, 
  AlertCircle,
  Car
} from 'lucide-react';
import { useVehicles, useRigCategories } from '../data/hooks';
import { Vehicle, RigPartOption, RigCategory } from '../types';
import { formatPrice } from '../lib/currency';

interface RigBuilderProps {
  initialVehicle?: Vehicle | null;
  initialModelId?: string;
  onAddToCart: (items: { option: RigPartOption; vehicleName: string }[]) => void;
  onBookAppointment: (rigSummary: string) => void;
}

interface RigBuilderInnerProps extends RigBuilderProps {
  vehicles: Vehicle[];
  rigCategories: RigCategory[];
}

/**
 * الغلاف: يحمّل المركبات وفئات التجهيز عبر طبقة المستودعات،
 * ثم يمرّرها للمكوّن الداخلي الذي يعتمد عليها في تهيئة حالته.
 */
export const RigBuilder: React.FC<RigBuilderProps> = (props) => {
  const { data: vehicles, loading: vLoading } = useVehicles();
  const { data: rigCategories, loading: rLoading } = useRigCategories();

  if (vLoading || rLoading || vehicles.length === 0 || rigCategories.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 border-2 border-[#323538] border-t-[#fae500] rounded-full animate-spin mb-4" />
        <p className="text-[#bec6e0] font-tajawal text-sm">جارٍ تحميل منصة التجهيز…</p>
      </div>
    );
  }

  return <RigBuilderInner {...props} vehicles={vehicles} rigCategories={rigCategories} />;
};

const RigBuilderInner: React.FC<RigBuilderInnerProps> = ({
  initialVehicle,
  initialModelId,
  onAddToCart,
  onBookAppointment,
  vehicles,
  rigCategories,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    initialVehicle || vehicles[0]
  );
  const [selectedModelId, setSelectedModelId] = useState<string>(
    initialModelId || selectedVehicle.models[0]?.id || ''
  );

  // Selected options map: categoryId -> RigPartOption
  const [selectedOptions, setSelectedOptions] = useState<{ [catId: string]: RigPartOption }>({
    suspension: rigCategories[0].options[0],
    lighting: rigCategories[2].options[0],
  });

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('suspension');

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedModelId(vehicle.models[0]?.id || '');
  };

  const handleToggleOption = (catId: string, option: RigPartOption) => {
    if (selectedOptions[catId]?.id === option.id) {
      const next = { ...selectedOptions };
      delete next[catId];
      setSelectedOptions(next);
    } else {
      setSelectedOptions({
        ...selectedOptions,
        [catId]: option,
      });
    }
  };

  // Calculations
  const selectedList: RigPartOption[] = Object.values(selectedOptions);
  const totalPrice = selectedList.reduce((sum, item) => sum + item.price, 0);
  const totalWeight = selectedList.reduce((sum, item) => sum + item.weightKg, 0);
  const liftKit = selectedOptions['suspension'];
  const currentLift = liftKit?.liftInches || 0;

  const currentModelName =
    selectedVehicle.models.find((m) => m.id === selectedModelId)?.name ||
    selectedVehicle.arabicName;

  const handleAddAllToCart = () => {
    const items = selectedList.map((option) => ({
      option,
      vehicleName: `${selectedVehicle.arabicName} - ${currentModelName}`,
    }));
    onAddToCart(items);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* Title & Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-[#2E3192]/60 border border-[#fae500]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#fae500] mb-3">
          <Wrench className="w-4 h-4" />
          <span>منصة بناء وتخصيص سيارات الدفع الرباعي 4x4 RIG BUILDER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-tajawal mb-4">
          جهّز سيارتك للرحلات والصحراء
        </h1>
        <p className="text-[#bec6e0] font-tajawal text-base">
          اختر سيارتك، حدد مساعدات كينج المناسبة، الصدامات، الإضاءات، وخيم السقف مع حساب تلقائي لفرق الوزن والرفعة والتكلفة الإجمالية.
        </p>
      </div>

      {/* Step 1: Vehicle Selector Bar */}
      <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#323538] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#fae500] text-[#101416] font-montserrat font-extrabold flex items-center justify-center text-sm">
              1
            </span>
            <h3 className="font-bold text-lg text-white font-tajawal">
              المركبة المستهدفة: {selectedVehicle.arabicName} ({currentModelName})
            </h3>
          </div>
          <span className="text-xs text-[#908f9d]">
            القطع المعروضة مخصصة ومطابقة لأبعاد هذه السيارة
          </span>
        </div>

        {/* Vehicle Brand Pills */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
          {vehicles.map((v) => {
            const isSelected = selectedVehicle.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => handleSelectVehicle(v)}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-[#2E3192] border-[#fae500] text-white shadow-md'
                    : 'bg-[#101416] border-[#323538] text-[#bec6e0] hover:border-[#fae500]/50'
                }`}
              >
                <img src={v.logo} alt={v.name} className="w-8 h-8 object-contain" />
                <span className="text-xs font-bold font-tajawal">{v.arabicName}</span>
              </button>
            );
          })}
        </div>

        {/* Model Selector within selected brand */}
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span className="text-xs font-bold text-[#bec6e0] ml-2">الفئة / الموديل:</span>
          {selectedVehicle.models.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModelId(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedModelId === m.id
                  ? 'bg-[#fae500] text-[#101416] shadow-sm'
                  : 'bg-[#101416] text-[#e0e3e6] border border-[#323538] hover:border-[#bec6e0]'
              }`}
            >
              {m.name} ({m.years})
            </button>
          ))}
        </div>
      </div>

      {/* Main Builder Workspace (Grid 2-column: Categories & Parts on Right, Rig HUD on Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Desktop) / Sticky Summary & Live HUD */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#191c1e] border-2 border-[#fae500]/60 rounded-2xl p-6 sticky top-28 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[#323538] pb-4 mb-4">
              <div>
                <span className="text-[11px] font-bold text-[#fae500] tracking-wider uppercase font-montserrat block">
                  RIG SPECIFICATIONS HUD
                </span>
                <h4 className="text-lg font-bold text-white font-tajawal">
                  تقرير تجهيز {selectedVehicle.arabicName}
                </h4>
              </div>
              <div className="p-2 rounded-xl bg-[#fae500]/10 text-[#fae500]">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#101416] border border-[#323538] p-3 rounded-xl text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#bec6e0] mb-1">
                  <Gauge className="w-3.5 h-3.5 text-[#fae500]" />
                  <span>ارتفاع التعليق</span>
                </div>
                <div className="text-xl font-black text-white font-montserrat">
                  {currentLift > 0 ? `+${currentLift}" إنش` : 'وكالة (0)'}
                </div>
              </div>

              <div className="bg-[#101416] border border-[#323538] p-3 rounded-xl text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#bec6e0] mb-1">
                  <Weight className="w-3.5 h-3.5 text-[#c0c1ff]" />
                  <span>الوزن المضاف</span>
                </div>
                <div className="text-xl font-black text-white font-montserrat">
                  +{totalWeight} كجم
                </div>
              </div>
            </div>

            {/* Selected Parts List */}
            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto pr-1">
              <div className="text-xs font-bold text-[#bec6e0] mb-1">
                القطع المختارة ({selectedList.length}):
              </div>

              {selectedList.length === 0 ? (
                <div className="p-4 bg-[#101416] rounded-xl border border-dashed border-[#323538] text-center text-xs text-[#908f9d]">
                  لم تقم باختيار أي قطع بعد. اختر من القائمة لتجهيز سيارتك.
                </div>
              ) : (
                selectedList.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-[#101416] rounded-xl border border-[#323538] flex items-center justify-between text-xs gap-2"
                  >
                    <div className="flex-1 truncate">
                      <div className="font-bold text-white truncate font-tajawal">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#fae500] font-montserrat">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const next = { ...selectedOptions };
                        const foundCat = Object.keys(next).find((k) => next[k].id === item.id);
                        if (foundCat) delete next[foundCat];
                        setSelectedOptions(next);
                      }}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Total Price Box */}
            <div className="bg-[#2E3192]/20 border border-[#2E3192] p-4 rounded-xl mb-6 flex justify-between items-center">
              <div>
                <span className="text-xs text-[#bec6e0] block">التكلفة الإجمالية للقطع</span>
                <span className="text-2xl font-black text-[#fae500] font-montserrat">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <span className="text-[10px] bg-[#2E3192] text-white px-2 py-1 rounded font-bold">
                شامل الضريبة
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                disabled={selectedList.length === 0}
                onClick={handleAddAllToCart}
                className="w-full py-3.5 px-4 bg-[#fae500] hover:bg-[#dbc900] disabled:opacity-50 text-[#101416] font-extrabold text-sm rounded-xl font-tajawal flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>إضافة كامل التجهيز للسلة ({selectedList.length} قطع)</span>
              </button>

              <button
                onClick={() =>
                  onBookAppointment(
                    `تجهيز ${selectedVehicle.arabicName} - ${currentModelName} بقيمة ${formatPrice(totalPrice)}`
                  )
                }
                className="w-full py-3 px-4 bg-[#101416] hover:bg-[#272a2d] text-white border border-[#323538] hover:border-[#fae500] font-bold text-xs rounded-xl font-tajawal flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-[#fae500]" />
                <span>حجز موعد تركيب في ورشة KING 4x4</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-[#323538] flex items-center gap-2 text-[11px] text-[#908f9d]">
              <ShieldCheck className="w-4 h-4 text-[#fae500]" />
              <span>ضمان أصلي معتمد مع إشراف فني على الميزان ووزن السيارة</span>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Category Browser & Part Cards */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {rigCategories.map((cat) => {
              const isActive = activeCategoryTab === cat.id;
              const hasSelection = !!selectedOptions[cat.id];

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`px-4 py-3 rounded-xl border text-sm font-bold font-tajawal flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#2E3192] border-[#fae500] text-white shadow-md'
                      : 'bg-[#191c1e] border-[#323538] text-[#bec6e0] hover:border-[#bec6e0]'
                  }`}
                >
                  <span>{cat.arabicTitle}</span>
                  {hasSelection && (
                    <span className="w-2 h-2 rounded-full bg-[#fae500]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Parts in Active Category */}
          {rigCategories.filter((c) => c.id === activeCategoryTab).map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex justify-between items-center bg-[#101416] p-4 rounded-xl border border-[#323538]">
                <div>
                  <h3 className="font-bold text-lg text-white font-tajawal">
                    {category.arabicTitle}
                  </h3>
                  <p className="text-xs text-[#bec6e0]">
                    اختر الخيار المناسب لطبيعة استخدامك (طعوس، صخور، أو رحلات طويلة)
                  </p>
                </div>
                <span className="text-xs text-[#fae500] font-montserrat">
                  {category.options.length} خيارات متاحة
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.options.map((option) => {
                  const isSelected = selectedOptions[category.id]?.id === option.id;

                  return (
                    <div
                      key={option.id}
                      className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#2E3192]/25 border-[#fae500] shadow-[0_0_20px_rgba(250,229,0,0.15)]'
                          : 'bg-[#191c1e] border-[#323538] hover:border-[#fae500]/50 hover:bg-[#1d2022]'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 left-3 bg-[#fae500] text-[#101416] px-2.5 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>تم الاختيار</span>
                        </div>
                      )}

                      <div>
                        {/* Part Image & Brand */}
                        <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-[#101416] border border-[#323538]">
                          <img
                            src={option.image}
                            alt={option.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute bottom-2 right-2 bg-[#101416]/90 backdrop-blur-sm text-[#fae500] font-montserrat font-bold text-xs px-2.5 py-1 rounded-md border border-[#323538]">
                            {option.brand}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h4 className="font-bold text-base text-white font-tajawal mb-2 leading-snug">
                          {option.name}
                        </h4>
                        <p className="text-xs text-[#bec6e0] font-tajawal line-clamp-3 mb-4 leading-relaxed">
                          {option.description}
                        </p>
                      </div>

                      {/* Specs Row & Selection Button */}
                      <div>
                        <div className="flex items-center gap-3 text-xs text-[#908f9d] mb-4 pb-3 border-t border-[#323538]/60">
                          <span className="flex items-center gap-1">
                            <Weight className="w-3.5 h-3.5 text-[#bec6e0]" />
                            {option.weightKg} كجم
                          </span>
                          {option.liftInches && (
                            <span className="flex items-center gap-1 text-[#fae500]">
                              <Gauge className="w-3.5 h-3.5" />
                              رفعة +{option.liftInches}" إنش
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-xl font-black text-[#fae500] font-montserrat">
                            {formatPrice(option.price)}
                          </div>

                          <button
                            onClick={() => handleToggleOption(category.id, option)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold font-tajawal flex items-center gap-1.5 transition-all ${
                              isSelected
                                ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                                : 'bg-[#fae500] hover:bg-[#dbc900] text-[#101416] shadow-sm'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>إزالة من التجهيز</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>تثبيت في سيارتي</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};
