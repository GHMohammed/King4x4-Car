import { RigCategory } from '../../types';
import { RIG_CATEGORIES } from '../mockData';
import { ApiClient } from '../../lib/apiClient';

export interface RigRepository {
  getCategories(): Promise<RigCategory[]>;
}

export class MockRigRepository implements RigRepository {
  async getCategories(): Promise<RigCategory[]> {
    return RIG_CATEGORIES;
  }
}

export class HttpRigRepository implements RigRepository {
  constructor(private readonly client: ApiClient) {}

  getCategories(): Promise<RigCategory[]> {
    return this.client.get<RigCategory[]>('/rig-categories');
  }
}
