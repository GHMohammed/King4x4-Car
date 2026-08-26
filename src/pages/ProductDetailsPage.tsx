import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Check,
  X,
  Truck,
  ShieldCheck,
  Car,
  ChevronLeft,
  Wrench,
} from 'lucide-react';
import { useProduct, useRelatedProducts, useVehicles } from '../data/hooks';
import { useCart } from '../context/CartContext';
import { PriceDisplay } from '../components/ui/PriceDisplay';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { formatPrice } from '../lib/currency';
import { useLanguage, productName, vehicleName } from '../i18n/LanguageContext';

export const ProductDetailsPage: React.FC = () => {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: product, loading } = useProduct(slug);
  const { data: related } = useRelatedProducts(slug);
  const { data: vehicles } = useVehicles();
  const { t, lang } = useLanguage();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [includeInstall, setIncludeInstall] = useState(false);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#323538] border-t-[#fae500] rounded-full animate-spin mb-4" />
        <p className="text-[#bec6e0] font-tajawal text-sm">{t('product.loading')}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 max-w-md mx-auto text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-[#191c1e] border border-[#323538] flex items-center justify-center mx-auto mb-5">
          <X className="w-8 h-8 text-[#908f9d]" />
        </div>
        <h1 className="text-2xl font-extrabold text-white font-tajawal mb-2">{t('product.notFound')}</h1>
        <p className="text-sm text-[#908f9d] mb-6">{t('product.notFoundDesc')}</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-[#fae500] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal"
        >
          {t('product.backToShop')}
        </button>
      </div>
    );
  }

  const name = productName(product, lang);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const compatibilityLabels = product.compatibleVehicles.includes('all')
    ? [t('product.allVehicles')]
    : product.compatibleVehicles.map((id) => {
        const v = vehicles.find((veh) => veh.id === id);
        return v ? vehicleName(v, lang) : id;
      });

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#908f9d] mb-6 font-tajawal">
        <Link to="/" className="hover:text-[#fae500]">{t('nav.home')}</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-[#fae500]">{t('nav.shop')}</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-[#bec6e0] line-clamp-1">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="relative h-80 sm:h-[26rem] rounded-2xl overflow-hidden bg-[#101416] border border-[#323538] mb-3">
            <img
              src={gallery[activeImage]}
              alt={name}
              className="w-full h-full object-cover"
            />
            {product.badge === 'sale' && product.oldPrice && (
              <span className="absolute top-4 right-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-md">
                خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2.5">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-[#fae500]' : 'border-[#323538] hover:border-[#bec6e0]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#fae500] font-montserrat uppercase">
              {product.brand}
            </span>
            <span className="text-[11px] text-[#908f9d] font-montserrat">
              SKU: {product.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-tajawal leading-tight mb-3">
            {name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 text-[#fae500]">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold text-white font-montserrat">{product.rating}</span>
            </span>
            <span className="text-xs text-[#908f9d]">({product.reviewsCount} {t('common.reviews')})</span>
            <span className="text-[#323538]">|</span>
            <span className="text-xs font-bold text-[#c0c1ff]">{product.categoryArabic}</span>
          </div>

          {/* Compatibility badge */}
          <div className="bg-[#2E3192]/20 border border-[#2E3192] rounded-xl p-3.5 mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Car className="w-4 h-4 text-[#fae500]" />
              <span className="text-xs font-bold text-white font-tajawal">{t('product.compatibleWith')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {compatibilityLabels.map((label) => (
                <span
                  key={label}
                  className="text-[11px] font-bold text-[#fae500] bg-[#101416] border border-[#323538] px-2.5 py-1 rounded-lg font-tajawal"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-4 text-xs font-bold font-tajawal">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <Check className="w-4 h-4 stroke-[3]" /> {t('product.inStock')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-red-400">
                <X className="w-4 h-4 stroke-[3]" /> {t('product.outOfStock')}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="bg-[#191c1e] border border-[#323538] rounded-xl p-4 mb-5">
            <PriceDisplay price={product.price} oldPrice={product.oldPrice} size="lg" />
            <span className="text-[11px] text-[#908f9d] font-tajawal">{t('common.tax')}</span>
          </div>

          {/* Install option */}
          <label className="bg-[#101416] border border-[#323538] rounded-xl p-3.5 mb-5 flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeInstall}
              onChange={(e) => setIncludeInstall(e.target.checked)}
              className="w-4 h-4 rounded accent-[#fae500]"
            />
            <span className="flex-1">
              <span className="text-xs font-bold text-white block font-tajawal flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#fae500]" /> {t('product.installOption')}
              </span>
              <span className="text-[11px] text-[#bec6e0]">{t('product.installNote')}</span>
            </span>
          </label>

          {/* Quantity + add to cart */}
          <div className="flex items-stretch gap-3 mb-6">
            <QuantitySelector value={quantity} onChange={setQuantity} />

            <button
              onClick={() => addToCart(product, includeInstall, quantity)}
              disabled={!product.inStock}
              className="flex-1 py-3 bg-[#fae500] hover:bg-[#dbc900] disabled:opacity-50 disabled:cursor-not-allowed text-[#101416] font-extrabold text-sm rounded-xl font-tajawal flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[.98]"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{t('common.addToCart')}</span>
            </button>
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-2 gap-3 text-[11px] text-[#908f9d]">
            <span className="flex items-center gap-2 bg-[#101416] border border-[#323538] rounded-lg p-2.5">
              <Truck className="w-4 h-4 text-[#fae500]" /> {t('product.freeShipping')}
            </span>
            <span className="flex items-center gap-2 bg-[#101416] border border-[#323538] rounded-lg p-2.5">
              <ShieldCheck className="w-4 h-4 text-[#fae500]" /> {t('product.warranty')}
            </span>
          </div>
        </div>
      </div>

      {/* Description + specs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div>
          <h2 className="text-lg font-extrabold text-white font-tajawal mb-3 border-b border-[#323538] pb-2">
            {t('product.description')}
          </h2>
          <p className="text-sm text-[#bec6e0] leading-relaxed font-tajawal">{product.description}</p>
        </div>
        {product.specs.length > 0 && (
          <div>
            <h2 className="text-lg font-extrabold text-white font-tajawal mb-3 border-b border-[#323538] pb-2">
              {t('product.specs')}
            </h2>
            <div className="space-y-2">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex justify-between gap-4 py-2 px-3 rounded-lg bg-[#191c1e] border border-[#323538] text-xs"
                >
                  <span className="text-[#908f9d]">{spec.label}</span>
                  <span className="font-bold text-white text-left">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-extrabold text-white font-tajawal mb-5">{t('product.related')}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((rp) => (
              <Link
                key={rp.id}
                to={`/product/${rp.id}`}
                className="bg-[#191c1e] border border-[#323538] hover:border-[#fae500]/60 rounded-2xl p-3 transition-all hover:-translate-y-1 group"
              >
                <div className="h-36 rounded-xl overflow-hidden bg-[#101416] border border-[#323538] mb-3">
                  <img
                    src={rp.image}
                    alt={productName(rp, lang)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xs font-bold text-white font-tajawal line-clamp-2 mb-1 group-hover:text-[#fae500] transition-colors">
                  {productName(rp, lang)}
                </h3>
                <span className="text-sm font-black text-[#fae500] font-montserrat">
                  {formatPrice(rp.price)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
