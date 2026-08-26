import React from 'react';
import { useLocation } from 'react-router-dom';
import { ServicesSection } from '../components/ServicesSection';

export const ServicesPage: React.FC = () => {
  const location = useLocation();
  const notes = (location.state as { notes?: string } | null)?.notes ?? '';
  return <ServicesSection prefilledNotes={notes} />;
};
