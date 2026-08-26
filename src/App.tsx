import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BuilderPage } from './pages/BuilderPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { ServicesPage } from './pages/ServicesPage';
import { BrandPage } from './pages/BrandPage';
import { useCart } from './context/CartContext';
import { useAppState } from './context/AppStateContext';
import { ActiveTab } from './types';
import { tabToPath, pathToTab } from './routes/paths';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCount, openCart, toastMessage, addToCart } = useCart();
  const { selectedVehicle, setSelectedVehicle, isSearchOpen, openSearch, closeSearch } =
    useAppState();

  const activeTab = pathToTab(location.pathname);
  const setActiveTab = (tab: ActiveTab) => navigate(tabToPath(tab));

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#101416] text-[#e0e3e6] flex flex-col font-sans selection:bg-[#fae500] selection:text-[#101416]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[60] bg-[#2E3192] text-white border-2 border-[#fae500] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 font-tajawal">
          <div className="p-1 bg-[#fae500] text-[#101416] rounded-full">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCount}
        openCart={openCart}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
        openSearch={openSearch}
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <CartDrawer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onSelectProduct={(prod) => {
          addToCart(prod);
          closeSearch();
        }}
        onSelectVehicle={(veh) => {
          setSelectedVehicle(veh);
          closeSearch();
          navigate('/shop');
        }}
      />

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
