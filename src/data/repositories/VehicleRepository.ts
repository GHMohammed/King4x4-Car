import { Vehicle } from '../../types';
import { VEHICLES } from '../mockData';
import { ApiClient } from '../../lib/apiClient';

export interface VehicleRepository {
  getAll(): Promise<Vehicle[]>;
  getById(id: string): Promise<Vehicle | null>;
}

export class MockVehicleRepository implements VehicleRepository {
  async getAll(): Promise<Vehicle[]> {
    return VEHICLES;
  }

  async getById(id: string): Promise<Vehicle | null> {
    return VEHICLES.find((v) => v.id === id) ?? null;
  }
}

export class HttpVehicleRepository implements VehicleRepository {
  constructor(private readonly client: ApiClient) {}

  getAll(): Promise<Vehicle[]> {
    return this.client.get<Vehicle[]>('/vehicles');
  }

  async getById(id: string): Promise<Vehicle | null> {
    return this.client.get<Vehicle | null>(`/vehicles/${id}`);
  }
}
