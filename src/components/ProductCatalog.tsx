import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Star, 
  Check, 
  Eye, 
  X, 
  Wrench, 
  Shield, 
  Filter, 
  Sparkles,
  Truck,
  RotateCcw
} from 'lucide-react';
import { Product, Vehicle } from '../types';
import { useProducts, useVehicles, useCategories } from '../data/hooks';
import { ProductGrid } from './ProductGrid';
import { EmptyState } from './ui/EmptyState';
import { useLanguage, categoryName, vehicleName } from '../i18n/LanguageContext';

interface ProductCatalogProps {
  selectedVehicle: Vehicle | null;
  onAddToCart: (product: Product, includeInstallation?: boolean) => void;
  onSelectVehicle: (vehicle: Vehicle | null) => void;
  /** عند تمريرها يصبح التصنيف مُتحكَّماً به من الخارج (لمزامنة الـ URL في صفحة المتجر) */
  category?: string;
  onCategoryChange?: (category: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedVehicle,
  onAddToCart,
  onSelectVehicle,
  category,
  onCategoryChange,
}) => {
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const selectedCategory = category ?? internalCategory;
  const setSelectedCategory = onCategoryChange ?? setInternalCategory;
  const [onlyCompatible, setOnlyCompatible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Data comes through the repository layer — this component doesn't know the source.
  const { data: products, loading } = useProducts();
  const { data: vehicles } = useVehicles();
  const { data: categoryList } = useCategories();
  const { t, lang } = useLanguage();

  const categories = [
    { id: 'all', label: t('catalog.cat.all') },
    ...categoryList.map((c) => ({ id: c.id, label: categoryName(c, lang) })),
  ];

  // Filtering
  const filteredProducts = products.filter((p) => {
    // Category match
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // Vehicle compatibility match
    if (onlyCompatible && selectedVehicle) {
      const isCompat =
        p.compatibleVehicles.includes('all') ||
        p.compatibleVehicles.includes(selectedVehicle.id);
      if (!isCompat) return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchAr = p.arabicName.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      if (!matchName && !matchAr && !matchBrand) return false;
    }

    return true;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#323538] pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#fae500] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('catalog.eyebrow')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-tajawal">
            {t('catalog.title')}
          </h2>
          <p className="text-[#bec6e0] font-tajawal text-sm mt-1">
            {t('catalog.subtitle')}
          </p>
        </div>

        {/* Compatibility switch */}
        {selectedVehicle ? (
          <div className="bg-[#2E3192]/20 border border-[#2E3192] p-3 rounded-xl flex items-center gap-3">
            <input
              type="checkbox"
              id="compatCheck"
              checked={onlyCompatible}
              onChange={(e) => setOnlyCompatible(e.target.checked)}
              className="w-4 h-4 rounded text-[#fae500] accent-[#fae500]"
            />
            <label htmlFor="compatCheck" className="text-xs font-bold text-white cursor-pointer select-none">
              {t('catalog.showCompatiblePrefix')} <span className="text-[#fae500] font-black">{vehicleName(selectedVehicle, lang)}</span> {t('catalog.showCompatibleSuffix')}
            </label>
          </div>
        ) : (
          <button
            onClick={() => {
              const toyota = vehicles[0];
              if (toyota) {
                onSelectVehicle(toyota);
                setOnlyCompatible(true);
              }
            }}
            className="text-xs text-[#c0c1ff] hover:text-[#fae500] font-bold underline transition-colors"
          >
            {t('catalog.selectVehiclePrompt')}
          </button>
        )}
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-tajawal font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#fae500] text-[#101416] shadow-md'
                    : 'bg-[#191c1e] text-[#e0e3e6] border border-[#323538] hover:border-[#bec6e0]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search input in catalog */}
        <div className="relative min-w-[260px]">
          <input
            type="text"
            placeholder={t('catalog.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#191c1e] border border-[#323538] focus:border-[#fae500] text-sm text-white px-4 py-2.5 rounded-xl outline-none placeholder-[#908f9d] font-tajawal"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-3 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        onAddToCart={onAddToCart}
        emptyState={
          <EmptyState
            icon={<Filter className="w-12 h-12" />}
            title={t('catalog.empty.title')}
            description={t('catalog.empty.desc')}
            action={
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setOnlyCompatible(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#fae500] text-[#101416] font-bold text-xs rounded-xl"
              >
                {t('catalog.empty.reset')}
              </button>
            }
          />
        }
      />
    </section>
  );
};
