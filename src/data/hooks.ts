import { useEffect, useState } from 'react';
import { useRepositories } from './RepositoryProvider';
import { Product, Vehicle, Category, Service, RigCategory, ProductQuery, Page } from '../types';

export interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook عام لتحميل بيانات غير متزامنة مع حالات التحميل/الخطأ.
 * جاهز للتعامل مع زمن استجابة REST الحقيقي عند تفعيل الخلفية.
 */
function useAsync<T>(factory: () => Promise<T>, initial: T, deps: unknown[]): AsyncState<T> {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    factory()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

const EMPTY_PAGE: Page<Product> = { items: [], total: 0, page: 0, size: 12, totalPages: 1 };

export function useProducts(query?: ProductQuery): AsyncState<Page<Product>> {
  const { products } = useRepositories();
  return useAsync<Page<Product>>(
    () => products.getAll(query),
    EMPTY_PAGE,
    [query?.category, query?.vehicleId, query?.search, query?.sort, query?.page, query?.size],
  );
}

export function useFeaturedProducts(): AsyncState<Product[]> {
  const { products } = useRepositories();
  return useAsync<Product[]>(() => products.getFeatured(), [], []);
}

export function useProduct(slug: string): AsyncState<Product | null> {
  const { products } = useRepositories();
  return useAsync<Product | null>(() => products.getBySlug(slug), null, [slug]);
}

export function useRelatedProducts(id: string): AsyncState<Product[]> {
  const { products } = useRepositories();
  return useAsync<Product[]>(() => products.getRelated(id), [], [id]);
}

export function useVehicles(): AsyncState<Vehicle[]> {
  const { vehicles } = useRepositories();
  return useAsync<Vehicle[]>(() => vehicles.getAll(), [], []);
}

export function useCategories(): AsyncState<Category[]> {
  const { categories } = useRepositories();
  return useAsync<Category[]>(() => categories.getAll(), [], []);
}

export function useServices(): AsyncState<Service[]> {
  const { services } = useRepositories();
  return useAsync<Service[]>(() => services.getAll(), [], []);
}

export function useRigCategories(): AsyncState<RigCategory[]> {
  const { rig } = useRepositories();
  return useAsync<RigCategory[]>(() => rig.getCategories(), [], []);
}
