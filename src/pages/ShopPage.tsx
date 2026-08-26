import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCatalog } from '../components/ProductCatalog';
import { useCart } from '../context/CartContext';
import { useAppState } from '../context/AppStateContext';
import { useVehicles } from '../data/hooks';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { selectedVehicle, setSelectedVehicle } = useAppState();
  const { data: vehicles } = useVehicles();

  const category = searchParams.get('category') ?? 'all';

  const setCategory = (next: string) => {
    const params = new URLSearchParams(searchParams);
    if (next === 'all') params.delete('category');
    else params.set('category', next);
    setSearchParams(params, { replace: true });
  };

  // Deep link: ?vehicle=<id> → set the global selected vehicle once vehicles load
  useEffect(() => {
    const vid = searchParams.get('vehicle');
    if (vid && vehicles.length > 0 && selectedVehicle?.id !== vid) {
      const match = vehicles.find((v) => v.id === vid);
      if (match) setSelectedVehicle(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles]);

  // Keep the URL in sync when the selected vehicle changes elsewhere
  useEffect(() => {
    const vid = searchParams.get('vehicle');
    const current = selectedVehicle?.id ?? null;
    if (current !== vid) {
      const params = new URLSearchParams(searchParams);
      if (current) params.set('vehicle', current);
      else params.delete('vehicle');
      setSearchParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVehicle]);

  return (
    <ProductCatalog
      selectedVehicle={selectedVehicle}
      onAddToCart={addToCart}
      onSelectVehicle={setSelectedVehicle}
      category={category}
      onCategoryChange={setCategory}
    />
  );
};
