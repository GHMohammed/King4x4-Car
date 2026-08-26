import { Service } from '../../types';
import { SERVICES } from '../mockData';
import { ApiClient } from '../../lib/apiClient';

export interface ServiceRepository {
  getAll(): Promise<Service[]>;
}

export class MockServiceRepository implements ServiceRepository {
  async getAll(): Promise<Service[]> {
    return SERVICES;
  }
}

export class HttpServiceRepository implements ServiceRepository {
  constructor(private readonly client: ApiClient) {}

  getAll(): Promise<Service[]> {
    return this.client.get<Service[]>('/services');
  }
}
