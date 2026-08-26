import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { CartItem, Product, RigPartOption } from '../types';

const INSTALL_FEE = 35;
const FREE_SHIPPING_THRESHOLD = 200;
const FLAT_SHIPPING = 6;
const STORAGE_KEY = 'king4x4_cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export interface CartPricing {
  subtotal: number;
  installationTotal: number;
  discountAmount: number;
  shippingCost: number;
  grandTotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  remainingForFreeShipping: number;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  addToCart: (product: Product, includeInstallation?: boolean, quantity?: number) => void;
  addRigToCart: (parts: { option: RigPartOption; vehicleName: string }[]) => void;
  updateQuantity: (id: string, newQty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  // Quick mini-cart drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Toast feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Coupon + pricing (shared by drawer, cart page, checkout page)
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountPercent: number;
  couponError: string;
  couponSuccess: string;
  applyCoupon: () => void;
  pricing: CartPricing;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cart to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* تجاهل: قد يكون التخزين معطّلاً (وضع خاص) */
    }
  }, [items]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const addToCart = useCallback(
    (product: Product, includeInstallation = false, quantity = 1) => {
      const qty = Math.max(1, quantity);
      setItems((prev) => {
        const idx = prev.findIndex(
          (it) => it.product.id === product.id && it.includeInstallation === includeInstallation,
        );
        if (idx > -1) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
          return next;
        }
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product,
          quantity: qty,
          includeInstallation,
        };
        return [newItem, ...prev];
      });
      showToast(`تمت إضافة "${product.arabicName}" إلى السلة بنجاح!`);
      setIsCartOpen(true);
    },
    [showToast],
  );

  const addRigToCart = useCallback(
    (parts: { option: RigPartOption; vehicleName: string }[]) => {
      const entries: CartItem[] = parts.map(({ option, vehicleName }) => {
        const product: Product = {
          id: option.id,
          name: option.name,
          arabicName: option.name,
          category: 'performance',
          categoryArabic: 'تجهيز متكامل',
          price: option.price,
          brand: option.brand,
          rating: 5,
          reviewsCount: 0,
          image: option.image,
          inStock: true,
          compatibleVehicles: ['all'],
          specs: [],
          description: option.description,
        };
        return {
          id: `rig-${option.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product,
          quantity: 1,
          selectedVehicle: vehicleName,
          includeInstallation: true,
        };
      });
      setItems((prev) => [...entries, ...prev]);
      showToast(`تمت إضافة كامل تجهيز السيارة (${parts.length} قطع) إلى السلة!`);
      setIsCartOpen(true);
    },
    [showToast],
  );

  const updateQuantity = useCallback((id: string, newQty: number) => {
    setItems((prev) =>
      newQty <= 0
        ? prev.filter((it) => it.id !== id)
        : prev.map((it) => (it.id === id ? { ...it, quantity: newQty } : it)),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const applyCoupon = useCallback(() => {
    const code = couponCode.toUpperCase();
    if (code === 'KING4X4' || code === 'OFFROAD') {
      setDiscountPercent(10);
      setCouponSuccess('تم تطبيق خصم 10% بنجاح!');
      setCouponError('');
    } else {
      setDiscountPercent(0);
      setCouponError('كود الخصم غير صالح. جرب KING4X4');
      setCouponSuccess('');
    }
  }, [couponCode]);

  const totalCount = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  );

  const pricing = useMemo<CartPricing>(() => {
    const subtotal = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
    const installationTotal = items.reduce(
      (sum, it) => sum + (it.includeInstallation ? INSTALL_FEE * it.quantity : 0),
      0,
    );
    const discountAmount = (subtotal * discountPercent) / 100;
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : FLAT_SHIPPING;
    const grandTotal = subtotal - discountAmount + installationTotal + shippingCost;
    return {
      subtotal,
      installationTotal,
      discountAmount,
      shippingCost,
      grandTotal,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      freeShippingProgress: Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100),
      remainingForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    };
  }, [items, discountPercent]);

  const value: CartContextValue = {
    items,
    totalCount,
    addToCart,
    addRigToCart,
    updateQuantity,
    removeItem,
    clearCart,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    toastMessage,
    showToast,
    couponCode,
    setCouponCode,
    discountPercent,
    couponError,
    couponSuccess,
    applyCoupon,
    pricing,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart يجب أن يُستخدم داخل <CartProvider>');
  return ctx;
}
