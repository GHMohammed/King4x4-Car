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

// رقم واتساب الشركة (بصيغة دولية بدون +).
const WHATSAPP_NUMBER = '96560600890';

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

  // استفسار عبر واتساب برسالة جاهزة (اسم المنتج + SKU + رابط الصفحة)
  const handleWhatsAppInquiry = () => {
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const message = `${t('product.whatsappIntro')}\n${name}\nSKU: ${product.id}\n${productUrl}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

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

          {/* WhatsApp inquiry (right/top) + Continue shopping (left/bottom) */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6">
            <button
              onClick={handleWhatsAppInquiry}
              title={t('product.inquireWhatsapp')}
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-green-500/20 bg-green-500/[0.06] text-green-400 hover:bg-green-500/[0.12] hover:border-green-500/40 font-bold text-sm font-tajawal transition active:scale-[.98]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{t('product.inquireWhatsapp')}</span>
            </button>

            <button
              onClick={() => navigate('/shop')}
              className="flex-1 py-3 bg-[#191c1e] hover:bg-[#272a2d] text-white border border-[#323538] hover:border-[#fae500] font-bold text-sm rounded-xl font-tajawal transition-colors"
            >
              {t('product.continueShopping')}
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
