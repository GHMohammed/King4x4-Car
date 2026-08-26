import React, { createContext, useContext, useMemo } from 'react';
import { httpClient } from '../lib/apiClient';
import {
  ProductRepository,
  MockProductRepository,
  HttpProductRepository,
} from './repositories/ProductRepository';
import {
  VehicleRepository,
  MockVehicleRepository,
  HttpVehicleRepository,
} from './repositories/VehicleRepository';
import {
  CategoryRepository,
  MockCategoryRepository,
  HttpCategoryRepository,
} from './repositories/CategoryRepository';
import {
  ServiceRepository,
  MockServiceRepository,
  HttpServiceRepository,
} from './repositories/ServiceRepository';
import {
  RigRepository,
  MockRigRepository,
  HttpRigRepository,
} from './repositories/RigRepository';

/** مجموعة المستودعات المتاحة للتطبيق. */
export interface Repositories {
  products: ProductRepository;
  vehicles: VehicleRepository;
  categories: CategoryRepository;
  services: ServiceRepository;
  rig: RigRepository;
}

/**
 * نقطة التبديل الوحيدة بين البيانات الوهمية وواجهة REST.
 * تغيير VITE_USE_API=true يحوّل التطبيق بالكامل إلى خلفية Spring Boot
 * دون تعديل أي مكوّن.
 */
function createRepositories(): Repositories {
  const useApi = import.meta.env.VITE_USE_API === 'true';

  if (useApi) {
    return {
      products: new HttpProductRepository(httpClient),
      vehicles: new HttpVehicleRepository(httpClient),
      categories: new HttpCategoryRepository(httpClient),
      services: new HttpServiceRepository(httpClient),
      rig: new HttpRigRepository(httpClient),
    };
  }

  return {
    products: new MockProductRepository(),
    vehicles: new MockVehicleRepository(),
    categories: new MockCategoryRepository(),
    services: new MockServiceRepository(),
    rig: new MockRigRepository(),
  };
}

const RepositoryContext = createContext<Repositories | null>(null);

export const RepositoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const repositories = useMemo(() => createRepositories(), []);
  return (
    <RepositoryContext.Provider value={repositories}>{children}</RepositoryContext.Provider>
  );
};

export function useRepositories(): Repositories {
  const ctx = useContext(RepositoryContext);
  if (!ctx) {
    throw new Error('useRepositories يجب أن يُستخدم داخل <RepositoryProvider>');
  }
  return ctx;
}
