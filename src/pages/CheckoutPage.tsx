import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Truck,
  CreditCard,
  ClipboardList,
  CheckCircle2,
  Wrench,
  Info,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/currency';
import { useLanguage, productName } from '../i18n/LanguageContext';

const CITIES = ['العاصمة', 'حولي', 'الفروانية', 'الأحمدي', 'الجهراء', 'مبارك الكبير'];

type DeliveryMethod = 'standard' | 'express' | 'pickup';
type PaymentMethod = 'cod' | 'knet' | 'card';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, pricing, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const [placed, setPlaced] = useState(false);
  const [orderRef] = useState(() => `K4-${Math.floor(100000 + Math.random() * 900000)}`);

  const [customer, setCustomer] = useState({ name: '', phone: '', email: '' });
  const [address, setAddress] = useState({ city: CITIES[0], block: '', street: '', notes: '' });
  const [delivery, setDelivery] = useState<DeliveryMethod>('standard');
  const [payment, setPayment] = useState<PaymentMethod>('cod');
  const [error, setError] = useState('');

  // Guard: an empty cart can't be checked out (unless an order was just placed)
  useEffect(() => {
    if (items.length === 0 && !placed) navigate('/cart', { replace: true });
  }, [items.length, placed, navigate]);

  if (placed) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 px-4">
        <div className="w-20 h-20 rounded-full bg-[#fae500]/15 text-[#fae500] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-extrabold text-white font-tajawal mb-2">{t('checkout.success.title')}</h1>
        <p className="text-sm text-[#bec6e0] font-tajawal mb-1">
          {t('checkout.success.order')} <span className="text-[#fae500] font-black font-montserrat">{orderRef}</span>
        </p>
        <p className="text-sm text-[#908f9d] font-tajawal mb-8 max-w-sm mx-auto">
          {t('checkout.success.desc')}
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-[#fae500] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal"
        >
          {t('common.continueShopping')}
        </Link>
      </div>
    );
  }

  const deliveryFee = delivery === 'express' ? 3 : delivery === 'pickup' ? 0 : pricing.shippingCost;
  const orderTotal = pricing.grandTotal - pricing.shippingCost + deliveryFee;

  const handlePlaceOrder = () => {
    if (!customer.name || !customer.phone) {
      setError(t('checkout.err.customer'));
      return;
    }
    if (delivery !== 'pickup' && !address.block) {
      setError(t('checkout.err.address'));
      return;
    }
    setError('');
    clearCart();
    setPlaced(true);
  };

  const sectionTitle = (icon: React.ReactNode, n: number, title: string) => (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-7 h-7 rounded-lg bg-[#2E3192] text-white flex items-center justify-center text-xs font-black font-montserrat">
        {n}
      </span>
      <h2 className="font-extrabold text-white font-tajawal flex items-center gap-2">
        {icon}
        {title}
      </h2>
    </div>
  );

  const inputCls =
    'w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white px-3.5 py-2.5 rounded-xl outline-none placeholder-[#908f9d] font-tajawal';

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-tajawal mb-6">{t('checkout.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form sections */}
        <div className="lg:col-span-2 space-y-5">
          {/* 1. Customer */}
          <section className="bg-[#191c1e] border border-[#323538] rounded-2xl p-5">
            {sectionTitle(<User className="w-4 h-4 text-[#fae500]" />, 1, t('checkout.section.customer'))}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className={inputCls}
                placeholder={t('checkout.name')}
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
              <input
                className={inputCls}
                placeholder={t('checkout.phone')}
                type="tel"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              />
              <input
                className={`${inputCls} sm:col-span-2`}
                placeholder={t('checkout.email')}
                type="email"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              />
            </div>
          </section>

          {/* 2. Address */}
          <section className="bg-[#191c1e] border border-[#323538] rounded-2xl p-5">
            {sectionTitle(<MapPin className="w-4 h-4 text-[#fae500]" />, 2, t('checkout.section.address'))}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                className={inputCls}
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                className={inputCls}
                placeholder={t('checkout.block')}
                value={address.block}
                onChange={(e) => setAddress({ ...address, block: e.target.value })}
              />
              <input
                className={inputCls}
                placeholder={t('checkout.street')}
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
              />
              <input
                className={inputCls}
                placeholder={t('checkout.notes')}
                value={address.notes}
                onChange={(e) => setAddress({ ...address, notes: e.target.value })}
              />
            </div>
          </section>

          {/* 3. Delivery method */}
          <section className="bg-[#191c1e] border border-[#323538] rounded-2xl p-5">
            {sectionTitle(<Truck className="w-4 h-4 text-[#fae500]" />, 3, t('checkout.section.delivery'))}
            <div className="space-y-2.5">
              {([
                { id: 'standard', label: t('checkout.delivery.standard'), fee: pricing.shippingCost === 0 ? t('common.free') : formatPrice(pricing.shippingCost) },
                { id: 'express', label: t('checkout.delivery.express'), fee: formatPrice(3) },
                { id: 'pickup', label: t('checkout.delivery.pickup'), fee: t('common.free') },
              ] as const).map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    delivery === opt.id ? 'border-[#fae500] bg-[#fae500]/5' : 'border-[#323538] hover:border-[#bec6e0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === opt.id}
                    onChange={() => setDelivery(opt.id)}
                    className="accent-[#fae500]"
                  />
                  <span className="flex-1 text-sm text-white font-tajawal">{opt.label}</span>
                  <span className="text-xs font-bold text-[#fae500] font-tajawal">{opt.fee}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 4. Payment method */}
          <section className="bg-[#191c1e] border border-[#323538] rounded-2xl p-5">
            {sectionTitle(<CreditCard className="w-4 h-4 text-[#fae500]" />, 4, t('checkout.section.payment'))}
            <div className="space-y-2.5">
              {([
                { id: 'cod', label: t('checkout.pay.cod'), ready: true },
                { id: 'knet', label: t('checkout.pay.knet'), ready: false },
                { id: 'card', label: t('checkout.pay.card'), ready: false },
              ] as const).map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    !opt.ready ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                  } ${payment === opt.id ? 'border-[#fae500] bg-[#fae500]/5' : 'border-[#323538]'}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    disabled={!opt.ready}
                    checked={payment === opt.id}
                    onChange={() => setPayment(opt.id)}
                    className="accent-[#fae500]"
                  />
                  <span className="flex-1 text-sm text-white font-tajawal">{opt.label}</span>
                  {!opt.ready && (
                    <span className="text-[10px] font-bold text-[#c0c1ff] bg-[#2E3192]/40 px-2 py-0.5 rounded">
                      {t('checkout.pay.soon')}
                    </span>
                  )}
                </label>
              ))}
            </div>
            <p className="flex items-start gap-2 text-[11px] text-[#908f9d] mt-3">
              <Info className="w-3.5 h-3.5 text-[#fae500] mt-0.5 flex-shrink-0" />
              {t('checkout.pay.note')}
            </p>
          </section>
        </div>

        {/* 5. Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-5 sticky top-28 space-y-4">
            <h2 className="font-extrabold text-white font-tajawal border-b border-[#323538] pb-3 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-[#fae500]" /> {t('checkout.section.summary')}
            </h2>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.product.image}
                    alt={productName(item.product, lang)}
                    className="w-12 h-12 rounded-lg object-cover border border-[#323538] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white font-tajawal line-clamp-1">
                      {productName(item.product, lang)}
                    </p>
                    <span className="text-[10px] text-[#908f9d]">{t('checkout.qty')} {item.quantity}</span>
                    {item.includeInstallation && (
                      <span className="text-[10px] text-[#c0c1ff] flex items-center gap-1">
                        <Wrench className="w-2.5 h-2.5 text-[#fae500]" /> {t('checkout.withInstallShort')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-black text-[#fae500] font-montserrat">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-xs text-[#bec6e0] pt-2 border-t border-[#323538]">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-montserrat font-bold text-white">
                  {formatPrice(pricing.subtotal)}
                </span>
              </div>
              {pricing.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>{t('cart.discount')}:</span>
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
                <span>{t('checkout.deliveryLabel')}</span>
                <span className="font-montserrat font-bold text-white">
                  {deliveryFee === 0 ? t('common.free') : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-[#323538]">
                <span>{t('cart.total')}</span>
                <span className="text-xl font-black text-[#fae500] font-montserrat">
                  {formatPrice(orderTotal)}
                </span>
              </div>
            </div>

            {error && <p className="text-[11px] text-red-400 font-bold">{error}</p>}

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3.5 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal shadow-lg transition-all"
            >
              {t('checkout.placeOrder')}
            </button>
            <Link
              to="/cart"
              className="block text-center text-xs text-[#c0c1ff] hover:text-[#fae500] font-bold"
            >
              {t('checkout.backToCart')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
