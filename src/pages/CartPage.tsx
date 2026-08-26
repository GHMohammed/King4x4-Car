import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Wrench, Check, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { formatPrice } from '../lib/currency';
import { useLanguage, productName } from '../i18n/LanguageContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    couponCode,
    setCouponCode,
    applyCoupon,
    couponError,
    couponSuccess,
    discountPercent,
    pricing,
  } = useCart();
  const { t, lang } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-4">
        <div className="w-20 h-20 rounded-2xl bg-[#191c1e] border border-[#323538] flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="w-10 h-10 text-[#323538]" />
        </div>
        <h1 className="text-2xl font-extrabold text-white font-tajawal mb-2">{t('cart.empty.title')}</h1>
        <p className="text-sm text-[#908f9d] mb-6 font-tajawal">
          {t('cart.empty.desc')}
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-[#fae500] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal"
        >
          {t('cart.empty.cta')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-tajawal mb-6 flex items-center gap-3">
        <ShoppingBag className="w-7 h-7 text-[#fae500]" />
        {t('cart.title')} ({items.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#191c1e] border border-[#323538] rounded-xl p-4 flex gap-4"
            >
              <img
                src={item.product.image}
                alt={productName(item.product, lang)}
                className="w-24 h-24 rounded-lg object-cover bg-[#101416] border border-[#323538] flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-sm font-bold text-white font-tajawal line-clamp-2 hover:text-[#fae500]"
                    >
                      {productName(item.product, lang)}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#908f9d] hover:text-red-400 p-1"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {item.selectedVehicle && (
                    <span className="text-[10px] text-[#fae500] block mt-0.5 font-tajawal">
                      🚗 {t('cart.customFor')} {item.selectedVehicle}
                    </span>
                  )}
                  {item.includeInstallation && (
                    <span className="text-[10px] text-[#c0c1ff] flex items-center gap-1 mt-0.5">
                      <Wrench className="w-3 h-3 text-[#fae500]" /> {t('cart.withInstall')}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 mt-2 border-t border-[#323538]/50">
                  <span className="text-base font-black text-[#fae500] font-montserrat">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(n) => updateQuantity(item.id, n)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-5 sticky top-28 space-y-4">
            <h2 className="font-extrabold text-white font-tajawal border-b border-[#323538] pb-3">
              {t('cart.summary')}
            </h2>

            {/* Coupon */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                applyCoupon();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder={t('cart.couponPlaceholder')}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-[#101416] border border-[#323538] focus:border-[#fae500] text-xs text-white px-3 py-2 rounded-xl outline-none font-montserrat uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2E3192] hover:bg-[#3b3fa0] text-white font-bold text-xs rounded-xl font-tajawal"
              >
                {t('cart.apply')}
              </button>
            </form>
            {couponSuccess && (
              <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {couponSuccess}
              </p>
            )}
            {couponError && <p className="text-[11px] text-red-400 font-bold">{couponError}</p>}

            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-[#bec6e0] pt-1">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-montserrat font-bold text-white">
                  {formatPrice(pricing.subtotal)}
                </span>
              </div>
              {pricing.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>{t('cart.discount')} ({discountPercent}%):</span>
                  <span className="font-montserrat font-bold">
                    -{formatPrice(pricing.discountAmount)}
                  </span>
                </div>
              )}
              {pricing.installationTotal > 0 && (
                <div className="flex justify-between text-[#c0c1ff]">
                  <span>{t('cart.installFees')}</span>
                  <span className="font-montserrat font-bold">
                    +{formatPrice(pricing.installationTotal)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t('cart.shipping')}</span>
                <span className="font-montserrat font-bold text-white">
                  {pricing.shippingCost === 0 ? t('common.free') + ' 🚀' : formatPrice(pricing.shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-[#323538]">
                <span>{t('cart.total')}</span>
                <span className="text-xl font-black text-[#fae500] font-montserrat">
                  {formatPrice(pricing.grandTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>{t('cart.checkout')}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <Link
              to="/shop"
              className="block text-center text-xs text-[#c0c1ff] hover:text-[#fae500] font-bold"
            >
              {t('common.continueShopping')}
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#908f9d] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#fae500]" />
              <span>{t('cart.securePay')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
