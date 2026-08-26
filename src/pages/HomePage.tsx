import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wrench } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { ShopByVehicle } from '../components/ShopByVehicle';
import { ProductCatalog } from '../components/ProductCatalog';
import { ServicesSection } from '../components/ServicesSection';
import { useCart } from '../context/CartContext';
import { useAppState } from '../context/AppStateContext';
import { ActiveTab, Vehicle } from '../types';
import { tabToPath } from '../routes/paths';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { selectedVehicle, setSelectedVehicle } = useAppState();

  const setActiveTab = (tab: ActiveTab) => navigate(tabToPath(tab));

  const openBuilderForVehicle = (vehicle: Vehicle, modelId?: string) => {
    setSelectedVehicle(vehicle);
    navigate(modelId ? `/builder?model=${modelId}` : '/builder');
  };

  const filterStoreForVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    navigate('/shop');
  };

  return (
    <>
      <HeroSection
        onShopNow={() => navigate('/shop')}
        onBuildRig={() => navigate('/builder')}
        setActiveTab={setActiveTab}
      />

      <ShopByVehicle
        selectedVehicle={selectedVehicle}
        onSelectVehicle={setSelectedVehicle}
        onOpenBuilder={openBuilderForVehicle}
        onFilterStore={filterStoreForVehicle}
      />

      {/* Interactive Rig Builder feature preview */}
      <section className="bg-[#191c1e] py-16 border-y border-[#323538] tire-track-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#2E3192]/60 to-[#101416] border-2 border-[#fae500]/60 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#fae500] text-[#101416] text-xs font-black px-3 py-1 rounded-md mb-4 font-tajawal">
                <Sparkles className="w-4 h-4" />
                <span>حصري لدى KING 4x4</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white font-tajawal mb-4 leading-tight">
                جهّز سيارتك بدقة متناهية مع حساب الوزن والرفعة
              </h2>

              <p className="text-[#bec6e0] font-tajawal text-base sm:text-lg mb-8 leading-relaxed">
                اختر مساعدات كينج، صدامات الونش، كشافات باجا، وخيام السقف لمشاهدة تأثيرها الفوري على الارتفاع وتوزيع الأوزان قبل الشراء والتركيب.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/builder')}
                  className="bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-tajawal font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
                >
                  <Wrench className="w-5 h-5" />
                  <span>فتح منصة تجهيز السيارة الآن</span>
                </button>

                <button
                  onClick={() => navigate('/brand')}
                  className="bg-[#101416] hover:bg-[#272a2d] text-white border border-[#323538] hover:border-[#fae500] font-tajawal font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
                >
                  استعراض الهوية البصرية والمواصفات
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductCatalog
        selectedVehicle={selectedVehicle}
        onAddToCart={addToCart}
        onSelectVehicle={setSelectedVehicle}
      />

      <ServicesSection />
    </>
  );
};
