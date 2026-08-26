import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopByVehicle } from '../components/ShopByVehicle';
import { useAppState } from '../context/AppStateContext';
import { Vehicle } from '../types';

export const VehiclesPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedVehicle, setSelectedVehicle } = useAppState();

  return (
    <ShopByVehicle
      selectedVehicle={selectedVehicle}
      onSelectVehicle={setSelectedVehicle}
      onOpenBuilder={(vehicle: Vehicle, modelId?: string) => {
        setSelectedVehicle(vehicle);
        navigate(modelId ? `/builder?model=${modelId}` : '/builder');
      }}
      onFilterStore={(vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        navigate('/shop');
      }}
    />
  );
};
