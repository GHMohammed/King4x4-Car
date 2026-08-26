import React, { useState, useEffect } from 'react';
import { Search, X, ShoppingCart, ArrowLeft, Wrench } from 'lucide-react';
import { useProducts, useVehicles } from '../data/hooks';
import { Product, Vehicle } from '../types';
import { formatPrice } from '../lib/currency';
import { useLanguage, productName, vehicleName } from '../i18n/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectVehicle,
}) => {
  const [query, setQuery] = useState('');
  const { data: productPage } = useProducts({ search: query.trim() || undefined, size: 6 });
  const { data: vehicles } = useVehicles();
  const { t, lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // نتائج المنتجات مصفّاة ومرقّمة من طبقة البيانات (server-side)
  const matchedProducts = productPage.items;

  const matchedVehicles = query.trim()
    ? vehicles.filter(
        (v) =>
          v.name.toLowerCase().includes(query.toLowerCase()) ||
          v.arabicName.toLowerCase().includes(query.toLowerCase())
      )
    : vehicles.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#191c1e] border-2 border-[#fae500]/50 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Header */}
        <div className="p-4 border-b border-[#323538] flex items-center gap-3 bg-[#101416]">
          <Search className="w-5 h-5 text-[#fae500]" />
          <input
            type="text"
            autoFocus
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-[#908f9d] text-base outline-none font-tajawal"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#bec6e0] hover:text-white text-xs px-2 py-1 bg-[#191c1e] rounded"
            >
              {t('search.clear')}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#bec6e0] hover:text-white bg-[#191c1e] border border-[#323538]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick tags */}
        <div className="p-3 bg-[#101416]/50 border-b border-[#323538] flex items-center gap-2 overflow-x-auto text-xs text-[#bec6e0] font-tajawal">
          <span className="text-[#908f9d] whitespace-nowrap">{t('search.suggestions')}</span>
          {['مساعدات King 2.5', 'لاندكروزر 300', 'سوبر سفاري فتك', 'خيمة سقف', 'ونش وارن', 'رنقات ميثود'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-lg bg-[#191c1e] border border-[#323538] hover:border-[#fae500] whitespace-nowrap"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {/* Matched Vehicles */}
          {matchedVehicles.length > 0 && (
            <div>
              <div className="text-xs font-bold text-[#fae500] mb-2 font-tajawal">
                {t('search.vehiclesMatched')}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {matchedVehicles.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectVehicle(v);
                      onClose();
                    }}
                    className="p-2.5 bg-[#101416] border border-[#323538] hover:border-[#fae500] rounded-xl flex items-center gap-2 text-right transition-colors"
                  >
                    <img src={v.logo} alt={vehicleName(v, lang)} className="w-6 h-6 object-contain" />
                    <div>
                      <div className="font-bold text-xs text-white font-tajawal">{vehicleName(v, lang)}</div>
                      <div className="text-[10px] text-[#908f9d] font-montserrat">{v.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Products */}
          <div>
            <div className="text-xs font-bold text-[#bec6e0] mb-2 font-tajawal">
              {query ? t('search.productsMatched') : t('search.topProducts')}
            </div>

            {matchedProducts.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#908f9d]">
                {t('search.noResults')} "{query}"
              </div>
            ) : (
              <div className="space-y-2">
                {matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-3 bg-[#101416] border border-[#323538] hover:border-[#fae500] rounded-xl flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={productName(p, lang)}
                        className="w-12 h-12 rounded-lg object-cover bg-[#191c1e]"
                      />
                      <div>
                        <span className="text-[10px] text-[#fae500] font-montserrat block">
                          {p.brand}
                        </span>
                        <h5 className="font-bold text-xs text-white group-hover:text-[#fae500] transition-colors font-tajawal">
                          {productName(p, lang)}
                        </h5>
                      </div>
                    </div>

                    <div className="text-left flex items-center gap-3">
                      <span className="font-black text-sm text-[#fae500] font-montserrat">
                        {formatPrice(p.price)}
                      </span>
                      <ArrowLeft className="w-4 h-4 text-[#908f9d] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
