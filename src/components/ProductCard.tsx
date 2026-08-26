import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { ProductBadge } from './ui/ProductBadge';
import { PriceDisplay } from './ui/PriceDisplay';
import { useLanguage, productName } from '../i18n/LanguageContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, includeInstallation?: boolean) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { t, lang } = useLanguage();
  const href = `/product/${product.id}`;
  const name = productName(product, lang);

  return (
    <div className="bg-[#191c1e] border border-[#323538] hover:border-[#fae500]/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-lg group relative overflow-hidden">
      {product.badge && (
        <div className="absolute top-3 right-3 z-10">
          <ProductBadge badge={product.badge} />
        </div>
      )}

      {/* Image + quick link */}
      <div className="relative h-52 rounded-xl overflow-hidden mb-4 bg-[#101416] border border-[#323538]">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 bg-[#101416]/90 backdrop-blur-sm text-[#bec6e0] font-montserrat font-bold text-[11px] px-2 py-0.5 rounded border border-[#323538]">
          {product.brand}
        </span>
        <Link
          to={href}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs backdrop-blur-[2px]"
        >
          <span className="bg-[#101416] border border-[#fae500] text-[#fae500] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
            <Eye className="w-4 h-4" />
            {t('common.viewDetails')}
          </span>
        </Link>
      </div>

      {/* Info */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Star className="w-3.5 h-3.5 fill-current text-[#fae500]" />
          <span className="text-xs font-montserrat font-bold text-white">{product.rating}</span>
          <span className="text-[11px] text-[#908f9d]">({product.reviewsCount} {t('common.reviews')})</span>
        </div>

        <Link
          to={href}
          className="block font-tajawal font-bold text-sm text-white hover:text-[#fae500] transition-colors line-clamp-2 mb-2"
        >
          {name}
        </Link>

        <p className="text-[11px] text-[#bec6e0] line-clamp-2 mb-4 font-tajawal">
          {product.description}
        </p>
      </div>

      {/* Price + actions */}
      <div className="pt-3 border-t border-[#323538]">
        <PriceDisplay price={product.price} oldPrice={product.oldPrice} size="md" className="mb-3" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddToCart(product, false)}
            className="flex-1 py-2.5 px-3 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-bold text-xs rounded-xl font-tajawal flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t('common.addToCart')}</span>
          </button>
          <Link
            to={href}
            className="p-2.5 rounded-xl bg-[#101416] text-[#bec6e0] hover:text-white border border-[#323538] hover:border-[#fae500] transition-colors"
            title="التفاصيل والمواصفات"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
