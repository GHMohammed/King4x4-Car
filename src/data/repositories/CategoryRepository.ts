import { Category } from '../../types';
import { CATEGORIES } from '../mockData';
import { ApiClient } from '../../lib/apiClient';

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
}

export class MockCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    return CATEGORIES;
  }
}

export class HttpCategoryRepository implements CategoryRepository {
  constructor(private readonly client: ApiClient) {}

  getAll(): Promise<Category[]> {
    return this.client.get<Category[]>('/categories');
  }
}
