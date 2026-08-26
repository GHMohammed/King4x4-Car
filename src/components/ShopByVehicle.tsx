import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles, X, Wrench, ShoppingBag } from 'lucide-react';
import { useVehicles } from '../data/hooks';
import { Vehicle } from '../types';
import { useLanguage, vehicleName } from '../i18n/LanguageContext';

interface ShopByVehicleProps {
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (vehicle: Vehicle | null) => void;
  onOpenBuilder: (vehicle: Vehicle, modelId?: string) => void;
  onFilterStore: (vehicle: Vehicle) => void;
}

export const ShopByVehicle: React.FC<ShopByVehicleProps> = ({
  selectedVehicle,
  onSelectVehicle,
  onOpenBuilder,
  onFilterStore,
}) => {
  const [activeModalVehicle, setActiveModalVehicle] = useState<Vehicle | null>(null);
  const { data: vehicles } = useVehicles();
  const { t, lang } = useLanguage();

  const handleCardClick = (vehicle: Vehicle) => {
    setActiveModalVehicle(vehicle);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#323538] pb-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#fae500] animate-ping" />
            <span className="text-xs font-bold text-[#fae500] uppercase tracking-wider font-montserrat">
              COMPATIBILITY MATCHING
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#fae500] font-tajawal mb-1">
            {t('vehicles.title')}
          </h2>
          <p className="text-[#bec6e0] font-tajawal text-base">
            {t('vehicles.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedVehicle && (
            <button
              onClick={() => onSelectVehicle(null)}
              className="text-xs text-red-400 hover:text-red-300 font-bold px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-900/50 transition-colors"
            >
              {t('vehicles.cancelFilter')} ({vehicleName(selectedVehicle, lang)})
            </button>
          )}
          <button 
            onClick={() => onSelectVehicle(null)}
            className="text-[#c0c1ff] hover:text-[#fae500] transition-colors font-tajawal font-bold text-sm flex items-center gap-2 group"
          >
            <span>{t('vehicles.viewAll')}</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Grid of Vehicles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {vehicles.map((vehicle) => {
          const isSelected = selectedVehicle?.id === vehicle.id;
          return (
            <div
              key={vehicle.id}
              onClick={() => handleCardClick(vehicle)}
              className={`cursor-pointer rounded-2xl p-5 flex flex-col items-center justify-center gap-3 border transition-all duration-300 group relative overflow-hidden ${
                isSelected
                  ? 'bg-[#2E3192]/30 border-[#fae500] shadow-[0_0_20px_rgba(250,229,0,0.25)]'
                  : 'bg-[#191c1e] border-[#323538]/60 hover:border-[#fae500] hover:bg-[#272a2d] hover:-translate-y-1'
              }`}
            >
              {/* Selected Badge Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-[#fae500] text-[#101416] p-1 rounded-full">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              {/* Brand logo (no box) */}
              <img
                src={vehicle.logo}
                alt={vehicle.name}
                className="w-16 h-16 object-contain group-hover:scale-105 transition-transform"
                loading="lazy"
              />

              {/* Vehicle Name */}
              <div className="text-center">
                <h3 className="font-montserrat font-bold text-base text-white group-hover:text-[#fae500] transition-colors">
                  {vehicle.name}
                </h3>
                <span className="font-tajawal text-xs text-[#908f9d] block">
                  {vehicleName(vehicle, lang)} • {vehicle.models.length} {t('vehicles.trims')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Model Selection Modal */}
      {activeModalVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#191c1e] border border-[#fae500]/40 rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setActiveModalVehicle(null)}
              className="absolute top-4 left-4 p-2 rounded-lg bg-[#101416] text-[#bec6e0] hover:text-white border border-[#323538]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={activeModalVehicle.logo}
                alt={activeModalVehicle.name}
                className="w-14 h-14 object-contain flex-shrink-0"
              />
              <div>
                <h3 className="text-2xl font-bold text-white font-tajawal flex items-center gap-2">
                  {t('nav.selectVehicle')}: {vehicleName(activeModalVehicle, lang)}
                </h3>
                <p className="text-xs text-[#fae500] font-montserrat">
                  {activeModalVehicle.name} OFF-ROAD FLEET
                </p>
              </div>
            </div>

            {/* Model List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-[50vh] overflow-y-auto pr-1">
              {activeModalVehicle.models.map((model) => (
                <div
                  key={model.id}
                  className="bg-[#101416] border border-[#323538] hover:border-[#fae500] p-3.5 rounded-xl flex items-center justify-between transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-[#fae500] transition-colors font-tajawal">
                      {model.name}
                    </h4>
                    <span className="text-xs text-[#908f9d] font-montserrat">
                      {model.years}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectVehicle(activeModalVehicle);
                        onOpenBuilder(activeModalVehicle, model.id);
                        setActiveModalVehicle(null);
                      }}
                      className="px-3 py-1.5 bg-[#2E3192] hover:bg-[#3d42c4] text-white rounded-lg text-xs font-bold font-tajawal flex items-center gap-1 transition-colors"
                      title="جهّز هذه السيارة"
                    >
                      <Wrench className="w-3.5 h-3.5 text-[#fae500]" />
                      <span>تجهيز</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#323538]">
              <button
                onClick={() => {
                  onSelectVehicle(activeModalVehicle);
                  onFilterStore(activeModalVehicle);
                  setActiveModalVehicle(null);
                }}
                className="flex-1 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-bold py-3 px-4 rounded-xl font-tajawal flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>تصفح كل قطع {activeModalVehicle.arabicName} في المتجر</span>
              </button>

              <button
                onClick={() => {
                  onSelectVehicle(activeModalVehicle);
                  onOpenBuilder(activeModalVehicle);
                  setActiveModalVehicle(null);
                }}
                className="bg-[#101416] hover:bg-[#272a2d] text-white border border-[#323538] font-bold py-3 px-5 rounded-xl font-tajawal flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#fae500]" />
                <span>فتح منصة التجهيز المباشر</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
