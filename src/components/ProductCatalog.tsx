import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X, Filter, Sparkles } from 'lucide-react';
import { Product, Vehicle, ProductQuery } from '../types';
import { useProducts, useVehicles, useCategories } from '../data/hooks';
import { ProductGrid } from './ProductGrid';
import { EmptyState } from './ui/EmptyState';
import { Pagination } from './ui/Pagination';
import { useLanguage, categoryName, vehicleName } from '../i18n/LanguageContext';

const PAGE_SIZE = 12;

interface ProductCatalogProps {
  selectedVehicle: Vehicle | null;
  onAddToCart: (product: Product, includeInstallation?: boolean) => void;
  onSelectVehicle: (vehicle: Vehicle | null) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedVehicle,
  onAddToCart,
  onSelectVehicle,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: vehicles } = useVehicles();
  const { data: categoryList } = useCategories();
  const { t, lang } = useLanguage();

  const category = searchParams.get('category') ?? 'all';
  const sort = (searchParams.get('sort') as ProductQuery['sort']) ?? 'featured';
  const urlPage = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1);
  const q = searchParams.get('q') ?? '';

  const [onlyCompatible, setOnlyCompatible] = useState(false);
  const [searchInput, setSearchInput] = useState(q);

  // تحديث معايير الـ URL (والقيمة null تحذف المفتاح)
  const updateParams = (patch: Record<string, string | null>, push = false) => {
    const next = new URLSearchParams(searchParams);
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === '') next.delete(k);
      else next.set(k, v);
    }
    setSearchParams(next, { replace: !push });
  };

  // بحث بـ debounce → يُحدّث معيار q ويعيد الصفحة إلى 1
  useEffect(() => {
    const id = setTimeout(() => {
      const current = searchParams.get('q') ?? '';
      if (searchInput.trim() !== current) {
        updateParams({ q: searchInput.trim() || null, page: null });
      }
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const query: ProductQuery = {
    category: category === 'all' ? undefined : category,
    vehicleId: onlyCompatible && selectedVehicle ? selectedVehicle.id : undefined,
    search: q || undefined,
    sort,
    page: urlPage - 1,
    size: PAGE_SIZE,
  };
  const { data: pageResult, loading } = useProducts(query);

  // تصحيح تلقائي إذا تجاوز رقم الصفحة العدد المتاح (بعد تغيّر الفلاتر)
  useEffect(() => {
    if (!loading && pageResult.total > 0 && urlPage > pageResult.totalPages) {
      updateParams({ page: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, pageResult.total, pageResult.totalPages, urlPage]);

  const categories = [
    { id: 'all', label: t('catalog.cat.all') },
    ...categoryList.map((c) => ({ id: c.id, label: categoryName(c, lang) })),
  ];

  const setCategory = (id: string) => updateParams({ category: id === 'all' ? null : id, page: null });
  const setSort = (val: string) =>
    updateParams({ sort: val === 'featured' ? null : val, page: null });
  const toggleCompatible = (checked: boolean) => {
    setOnlyCompatible(checked);
    updateParams({ page: null });
  };

  const inputCls =
    'w-full bg-[#191c1e] border border-[#323538] focus:border-[#fae500] text-sm text-white px-4 py-2.5 rounded-xl outline-none placeholder-[#908f9d] font-tajawal';

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
          <p className="text-[#bec6e0] font-tajawal text-sm mt-1">{t('catalog.subtitle')}</p>
        </div>

        {selectedVehicle ? (
          <div className="bg-[#2E3192]/20 border border-[#2E3192] p-3 rounded-xl flex items-center gap-3">
            <input
              type="checkbox"
              id="compatCheck"
              checked={onlyCompatible}
              onChange={(e) => toggleCompatible(e.target.checked)}
              className="w-4 h-4 rounded text-[#fae500] accent-[#fae500]"
            />
            <label htmlFor="compatCheck" className="text-xs font-bold text-white cursor-pointer select-none">
              {t('catalog.showCompatiblePrefix')}{' '}
              <span className="text-[#fae500] font-black">{vehicleName(selectedVehicle, lang)}</span>{' '}
              {t('catalog.showCompatibleSuffix')}
            </label>
          </div>
        ) : (
          <button
            onClick={() => {
              const toyota = vehicles[0];
              if (toyota) {
                onSelectVehicle(toyota);
                toggleCompatible(true);
              }
            }}
            className="text-xs text-[#c0c1ff] hover:text-[#fae500] font-bold underline transition-colors"
          >
            {t('catalog.selectVehiclePrompt')}
          </button>
        )}
      </div>

      {/* Category pills + search + sort */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
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

        <div className="flex items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <input
              type="text"
              placeholder={t('catalog.searchPlaceholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={inputCls}
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                className="absolute left-3 top-3 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#191c1e] border border-[#323538] focus:border-[#fae500] text-sm text-white px-3 py-2.5 rounded-xl outline-none font-tajawal cursor-pointer"
            aria-label={t('catalog.sortLabel')}
          >
            <option value="featured">{t('catalog.sort.featured')}</option>
            <option value="price_asc">{t('catalog.sort.priceAsc')}</option>
            <option value="price_desc">{t('catalog.sort.priceDesc')}</option>
          </select>
        </div>
      </div>

      {/* Count + page info */}
      {!loading && pageResult.total > 0 && (
        <div className="flex items-center justify-between text-xs text-[#908f9d] mb-4 font-tajawal">
          <span>{t('catalog.count', { total: pageResult.total })}</span>
          <span>{t('catalog.pageInfo', { page: urlPage, pages: pageResult.totalPages })}</span>
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid
        products={pageResult.items}
        loading={loading}
        onAddToCart={onAddToCart}
        skeletonCount={PAGE_SIZE}
        emptyState={
          <EmptyState
            icon={<Filter className="w-12 h-12" />}
            title={t('catalog.empty.title')}
            description={t('catalog.empty.desc')}
            action={
              <button
                onClick={() => {
                  setSearchInput('');
                  setOnlyCompatible(false);
                  setSearchParams(new URLSearchParams(), { replace: true });
                }}
                className="px-4 py-2 bg-[#fae500] text-[#101416] font-bold text-xs rounded-xl"
              >
                {t('catalog.empty.reset')}
              </button>
            }
          />
        }
      />

      {/* Pagination */}
      <Pagination
        page={urlPage}
        totalPages={pageResult.totalPages}
        onChange={(p) => updateParams({ page: p === 1 ? null : String(p) }, true)}
      />
    </section>
  );
};
