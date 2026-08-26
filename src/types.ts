export interface Vehicle {
  id: string;
  name: string;
  arabicName: string;
  logo: string;
  models: {
    id: string;
    name: string;
    years: string;
    image: string;
  }[];
}

export interface Product {
  id: string;
  name: string;
  arabicName: string;
  category: 'suspension' | 'bumpers' | 'lighting' | 'camping' | 'wheels' | 'recovery' | 'performance';
  categoryArabic: string;
  price: number;
  oldPrice?: number;
  brand: string;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  inStock: boolean;
  badge?: 'new' | 'bestseller' | 'sale' | 'featured';
  compatibleVehicles: string[]; // vehicle ids or 'all'
  specs: {
    label: string;
    value: string;
  }[];
  description: string;
}

export interface RigPartOption {
  id: string;
  name: string;
  brand: string;
  price: number;
  weightKg: number;
  liftInches?: number;
  image: string;
  description: string;
}

export interface RigCategory {
  id: 'suspension' | 'bumper' | 'lighting' | 'camping' | 'recovery';
  title: string;
  arabicTitle: string;
  iconName: string;
  options: RigPartOption[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVehicle?: string;
  includeInstallation?: boolean;
}

export type ActiveTab = 'home' | 'store' | 'builder' | 'vehicles' | 'services' | 'brand' | 'about';

/** تصنيف منتجات — الـ id يطابق Product.category */
export interface Category {
  id: Product['category'];
  name: string;
  nameAr: string;
}

/** خدمة ورشة (تُعرض في قسم الخدمات ونموذج الحجز) */
export interface Service {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  time: string;
  warranty: string;
}

/** معايير استعلام المنتجات — يستخدمها التنفيذ (Mock/Http) لتصفية النتائج */
export interface ProductQuery {
  category?: string;
  vehicleId?: string;
  search?: string;
  sort?: 'featured' | 'newest' | 'price_asc' | 'price_desc';
}
