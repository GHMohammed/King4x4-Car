import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowLeft, Truck, Wrench } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from './ui/QuantitySelector';
import { formatPrice } from '../lib/currency';
import { useLanguage, productName } from '../i18n/LanguageContext';

/**
 * سلة مصغّرة سريعة (slide-over). تفاصيل الدفع الكاملة في صفحتي /cart و /checkout.
 */
export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, pricing } = useCart();
  const { t, lang } = useLanguage();

  if (!isCartOpen) return null;

  const goto = (path: string) => {
    closeCart();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-[55] overflow-hidden">
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#101416] border-r border-[#323538] text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#323538] flex items-center justify-between bg-[#191c1e]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#fae500] text-[#101416] rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base font-tajawal text-white">{t('cart.title')}</h3>
                <span className="text-xs text-[#908f9d]">{items.length} {t('cart.itemsInCart')}</span>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-xl bg-[#101416] text-[#bec6e0] hover:text-white border border-[#323538]"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress */}
          {items.length > 0 && (
            <div className="bg-[#191c1e]/60 px-5 py-3 border-b border-[#323538]">
              <div className="flex justify-between items-center text-xs mb-1.5 font-tajawal">
                <span className="flex items-center gap-1 text-[#bec6e0]">
                  <Truck className="w-3.5 h-3.5 text-[#fae500]" />
                  {pricing.remainingForFreeShipping === 0 ? (
                    <span className="text-[#fae500] font-bold">{t('cart.freeShippingReached')}</span>
                  ) : (
                    <span>
                      {t('cart.freeShippingPrefix')}{' '}
                      <strong className="text-[#fae500]">
                        {formatPrice(pricing.remainingForFreeShipping)}
                      </strong>{' '}
                      {t('cart.freeShippingSuffix')}
                    </span>
                  )}
                </span>
                <span className="font-montserrat font-bold text-xs">
                  {Math.round(pricing.freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full bg-[#101416] h-2 rounded-full overflow-hidden border border-[#323538]">
                <div
                  className="bg-[#fae500] h-full transition-all duration-300"
                  style={{ width: `${pricing.freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-[#323538] mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white font-tajawal mb-1">{t('cart.empty.title')}</h4>
                <p className="text-xs text-[#908f9d] mb-6">
                  {t('cart.empty.desc')}
                </p>
                <button
                  onClick={() => goto('/shop')}
                  className="px-6 py-2.5 bg-[#fae500] text-[#101416] font-bold text-xs rounded-xl"
                >
                  {t('cart.empty.cta')}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#191c1e] border border-[#323538] rounded-xl p-3.5 flex gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={productName(item.product, lang)}
                    className="w-20 h-20 rounded-lg object-cover bg-[#101416] border border-[#323538] flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h5 className="text-xs font-bold text-white font-tajawal line-clamp-2">
                          {productName(item.product, lang)}
                        </h5>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#908f9d] hover:text-red-400 p-1"
                          title="حذف من السلة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
                      <span className="text-sm font-black text-[#fae500] font-montserrat">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(n) => updateQuantity(item.id, n)}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#323538] bg-[#191c1e] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-[#bec6e0] font-tajawal">{t('cart.estimatedTotal')}</span>
                <span className="text-xl font-black text-[#fae500] font-montserrat">
                  {formatPrice(pricing.grandTotal)}
                </span>
              </div>
              <button
                onClick={() => goto('/checkout')}
                className="w-full py-3.5 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>{t('cart.checkout')}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => goto('/cart')}
                className="w-full py-2.5 bg-[#101416] hover:bg-[#272a2d] text-white border border-[#323538] hover:border-[#fae500] font-bold text-xs rounded-xl font-tajawal transition-colors"
              >
                {t('cart.viewFull')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
