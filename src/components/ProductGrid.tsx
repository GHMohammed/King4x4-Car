import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ui/ProductCardSkeleton';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onAddToCart: (product: Product, includeInstallation?: boolean) => void;
  emptyState?: React.ReactNode;
  skeletonCount?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onAddToCart,
  emptyState,
  skeletonCount = 4,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};
