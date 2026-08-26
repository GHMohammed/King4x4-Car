import React, { createContext, useContext, useState } from 'react';
import { Vehicle } from '../types';

interface AppStateValue {
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const value: AppStateValue = {
    selectedVehicle,
    setSelectedVehicle,
    isSearchOpen,
    openSearch: () => setIsSearchOpen(true),
    closeSearch: () => setIsSearchOpen(false),
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState يجب أن يُستخدم داخل <AppStateProvider>');
  return ctx;
}
