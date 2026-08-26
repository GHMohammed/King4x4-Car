import { Product, ProductQuery } from '../../types';
import { PRODUCTS } from '../mockData';
import { ApiClient } from '../../lib/apiClient';

/**
 * عقد الوصول لبيانات المنتجات. المكوّنات تتحدث لهذه الواجهة فقط،
 * دون معرفة ما إذا كان المصدر بيانات وهمية أو REST.
 */
export interface ProductRepository {
  getAll(query?: ProductQuery): Promise<Product[]>;
  getFeatured(): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  getRelated(id: string): Promise<Product[]>;
}

function applyQuery(products: Product[], query?: ProductQuery): Product[] {
  let result = [...products];

  if (query?.category && query.category !== 'all') {
    result = result.filter((p) => p.category === query.category);
  }

  if (query?.vehicleId) {
    result = result.filter(
      (p) =>
        p.compatibleVehicles.includes('all') ||
        p.compatibleVehicles.includes(query.vehicleId as string),
    );
  }

  if (query?.search?.trim()) {
    const q = query.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.arabicName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q),
    );
  }

  switch (query?.sort) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return result;
}

/** التنفيذ الحالي: يقرأ من البيانات الوهمية المحلية. */
export class MockProductRepository implements ProductRepository {
  async getAll(query?: ProductQuery): Promise<Product[]> {
    return applyQuery(PRODUCTS, query);
  }

  async getFeatured(): Promise<Product[]> {
    const featured = PRODUCTS.filter(
      (p) => p.badge === 'bestseller' || p.badge === 'featured',
    );
    return (featured.length ? featured : PRODUCTS).slice(0, 8);
  }

  async getBySlug(slug: string): Promise<Product | null> {
    return PRODUCTS.find((p) => p.id === slug) ?? null;
  }

  async getRelated(id: string): Promise<Product[]> {
    const base = PRODUCTS.find((p) => p.id === id);
    if (!base) return [];
    return PRODUCTS.filter((p) => p.id !== id && p.category === base.category).slice(0, 4);
  }
}

/** التنفيذ المستقبلي: REST عبر Spring Boot. يُفعَّل بمتغيّر البيئة VITE_USE_API. */
export class HttpProductRepository implements ProductRepository {
  constructor(private readonly client: ApiClient) {}

  getAll(query?: ProductQuery): Promise<Product[]> {
    return this.client.get<Product[]>('/products', {
      category: query?.category,
      vehicleId: query?.vehicleId,
      search: query?.search,
      sort: query?.sort,
    });
  }

  getFeatured(): Promise<Product[]> {
    return this.client.get<Product[]>('/products/featured');
  }

  async getBySlug(slug: string): Promise<Product | null> {
    return this.client.get<Product | null>(`/products/${slug}`);
  }

  getRelated(id: string): Promise<Product[]> {
    return this.client.get<Product[]>(`/products/${id}/related`);
  }
}
