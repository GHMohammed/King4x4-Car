import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RigBuilder } from '../components/RigBuilder';
import { useCart } from '../context/CartContext';
import { useAppState } from '../context/AppStateContext';

export const BuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addRigToCart } = useCart();
  const { selectedVehicle } = useAppState();

  const modelId = searchParams.get('model') ?? undefined;

  return (
    <RigBuilder
      initialVehicle={selectedVehicle}
      initialModelId={modelId}
      onAddToCart={addRigToCart}
      onBookAppointment={(notes) => navigate('/services', { state: { notes } })}
    />
  );
};
