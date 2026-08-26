<div align="center">

# 👑 KING 4x4 — Storefront

**منصة تجهيز سيارات الدفع الرباعي والمغامرة**
*A platform for preparing your vehicle for the next adventure*

واجهة متجر إلكتروني احترافية لعلامة **KING 4x4** المتخصّصة في معدّات وخدمات سيارات الدفع الرباعي، الرحلات الصحراوية، والأوفرلاند.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-AR%20%2F%20EN-FFEA00?labelColor=2E3192)

</div>

---

## 📖 نظرة عامة

**KING 4x4** ليس متجر قطع غيار تقليدياً، بل منصة تُشعر العميل أنه يجهّز سيارته لمغامرته القادمة. صُمّمت الواجهة بهوية بصرية قوية (صحراء / قوة / اعتمادية) وتجربة تسوّق كاملة تشمل التصفّح حسب السيارة، منصّة تجهيز تفاعلية، وسلّة ودفع.

المشروع مبنيّ كـ **واجهة أمامية أولاً (Frontend-first)** فوق **طبقة بيانات مجرّدة (Repository)**، بحيث يمكن استبدال البيانات الوهمية بواجهة **REST حقيقية (Spring Boot)** لاحقاً **دون تعديل أي مكوّن**.

> السوق المستهدف: **الكويت والخليج** — العملة **الدينار الكويتي (د.ك)**، وبوابة الدفع المخطّطة **Tap**.

---

## ✨ الميزات

| الميزة | الوصف |
|-------|-------|
| 🌐 **ثنائية اللغة** | عربي (RTL) / إنجليزي (LTR) مع تبديل فوري للاتجاه وحفظ التفضيل |
| 🧱 **طبقة Repository مجرّدة** | المكوّنات لا تعرف مصدر البيانات — تبديل Mock ↔ REST بمتغيّر بيئة واحد |
| 🛒 **سلّة كاملة** | إضافة/حذف/كمية، كوبونات، حساب شحن وتركيب، وحفظ في `localStorage` |
| 🚗 **تسوّق حسب السيارة** | فلترة القطع المتوافقة مع كل مركبة وموديل |
| 🔧 **منصّة تجهيز تفاعلية (Rig Builder)** | اختيار مساعدات/صدامات/إضاءة مع حساب فوري للوزن والرفعة |
| 📄 **صفحات حقيقية** | توجيه (Routing) بروابط عميقة قابلة للمشاركة وفلاتر في الـ URL |
| 💳 **واجهة دفع** | تدفّق من 5 أقسام جاهز لربط بوابة Tap لاحقاً |
| 🧩 **مكتبة مكوّنات** | عناصر قابلة لإعادة الاستخدام + حالات تحميل (Skeletons) وحالات فارغة |
| 👤 **حساب المستخدم** | صفحتا تسجيل الدخول وإنشاء الحساب (واجهة، تُفعّل مع الخلفية) |
| 📞 **الدعم** | صفحتا «اتصل بنا» و«تتبع الطلب» + قائمة دعم منسدلة في الهيدر |
| 🟢 **استفسار واتساب** | زر في صفحة المنتج يفتح واتساب برسالة جاهزة (اسم المنتج + SKU + الرابط) |
| 🎨 **هيدر متجاوب** | شفاف عند القمة ويتحوّل صلباً عند التمرير، وشعارات ماركات شفافة بلا صناديق |

---

## 🛠️ التقنيات المستخدمة

- **React 19** + **TypeScript** (وضع `strict`)
- **Vite 6** — أداة البناء وخادم التطوير
- **Tailwind CSS 4** — التنسيق عبر أدوات مساعدة + رموز تصميم (Design Tokens)
- **React Router 7** — التوجيه من جهة العميل
- **lucide-react** — الأيقونات
- خطوط: **Tajawal** (عربي) و**Montserrat** (لاتيني)

---

## 🚀 التشغيل محلياً

**المتطلبات:** Node.js 20+

```bash
# 1) تثبيت الحزم
npm install

# 2) تشغيل خادم التطوير
npm run dev
```

يفتح المتجر على `http://localhost:3000`.

### الأوامر المتاحة

| الأمر | الوظيفة |
|------|---------|
| `npm run dev` | تشغيل خادم التطوير |
| `npm run build` | بناء نسخة الإنتاج إلى `dist/` |
| `npm run preview` | معاينة نسخة الإنتاج |
| `npm run lint` | فحص أنواع TypeScript (`tsc --noEmit`) |

---

## 🏗️ المعمارية

المبدأ الحاكم: **المكوّن يتحدّث إلى واجهة (interface)، لا إلى مصدر بيانات**. التنفيذ خلف الواجهة قابل للتبديل دون لمس أي مكوّن.

```
UI (pages / components)
  → hooks            (useProducts, useVehicles, useCategories …)
    → Repository interface   (ProductRepository, VehicleRepository …)
      → MockRepository       ← اليوم: يقرأ من src/data/mockData.ts
      → HttpRepository       ← لاحقاً: REST عبر src/lib/apiClient.ts
        → Spring Boot API + PostgreSQL
```

**نقطة التبديل الوحيدة** في [`src/data/RepositoryProvider.tsx`](src/data/RepositoryProvider.tsx):

```ts
const useApi = import.meta.env.VITE_USE_API === 'true';
// useApi ? HttpProductRepository : MockProductRepository
```

انظر [`.env.example`](.env.example) لضبط `VITE_USE_API` و`VITE_API_BASE_URL`.

---

## 📂 بنية المشروع

تنظيم موجّه بالميزة (feature-oriented) يفصل منطق البيانات عن عناصر الواجهة العامة:

```
src/
├─ main.tsx                 # نقطة الدخول + ترتيب المزوّدين (Providers)
├─ App.tsx                  # الهيكل العام: Navbar + Routes + Footer + Overlays
│
├─ assets/logos/            # شعارات الماركات (PNG شفافة)
├─ pages/                   # صفحات المسارات (Home / Shop / ProductDetails / Cart / Checkout / Login / Register / Contact / TrackOrder …)
├─ components/              # مكوّنات العرض (Navbar, Hero, ProductCard, CartDrawer …)
│  └─ ui/                   # عناصر أساسية (PriceDisplay, QuantitySelector, EmptyState, Skeleton …)
│
├─ context/
│  ├─ CartContext.tsx       # حالة السلّة + التسعير + الكوبونات + الحفظ المحلي
│  └─ AppStateContext.tsx   # السيارة المختارة + حالة البحث
│
├─ data/
│  ├─ RepositoryProvider.tsx# حقن التنفيذ (Mock / Http) عبر Context
│  ├─ hooks.ts              # hooks تحميل البيانات { data, loading, error }
│  ├─ mockData.ts           # مصدر البيانات الوهمية (خلف MockRepository فقط)
│  └─ repositories/         # الواجهات + تنفيذات Mock/Http لكل كيان
│
├─ i18n/
│  ├─ LanguageContext.tsx   # اللغة + الاتجاه + t() + تنسيق العملة
│  └─ translations.ts       # قاموس الترجمة (ar / en)
│
├─ lib/
│  ├─ apiClient.ts          # عميل REST لخلفية Spring Boot المستقبلية
│  ├─ currency.ts           # تنسيق العملة (الدينار الكويتي)
│  └─ contact.ts            # بيانات تواصل الشركة (واتساب / هاتف / بريد)
│
├─ routes/paths.ts          # ربط التبويبات بالمسارات
└─ types.ts                 # نماذج TypeScript (Product, Vehicle, Category, Service …)
```

### المسارات (Routes)

| المسار | الصفحة |
|-------|--------|
| `/` | الرئيسية |
| `/shop` | المتجر (فلاتر في الـ URL: `?category=&vehicle=`) |
| `/product/:slug` | تفاصيل المنتج |
| `/cart` | السلّة |
| `/checkout` | الدفع |
| `/builder` | منصّة التجهيز التفاعلية |
| `/vehicles` · `/services` · `/brand` | التصفّح حسب المركبة · الخدمات · الهوية البصرية |
| `/login` · `/register` | تسجيل الدخول · إنشاء حساب (واجهة) |
| `/contact` · `/track-order` | اتصل بنا · تتبع الطلب |

---

## 🌐 نظام اللغات (i18n)

- الافتراضي **عربي (RTL)**، مع تبديل فوري إلى **الإنجليزية (LTR)** من زر اللغة في الهيدر.
- يضبط `dir` و`lang` و`document.title` على مستوى الصفحة، ويحفظ التفضيل في `localStorage`.
- أسماء المنتجات/التصنيفات/المركبات تُعرض حسب اللغة عبر الحقول ثنائية اللغة في النماذج.
- العملة واعية باللغة: `د.ك` ↔ `KWD`.

لإضافة نص جديد: أضِف المفتاح في [`src/i18n/translations.ts`](src/i18n/translations.ts) لِلّغتين، ثم استخدمه عبر `t('your.key')`.

---

## 🔌 التكامل مع الخلفية (Spring Boot)

الواجهة جاهزة للربط دون إعادة كتابة أي مكوّن:

1. تشغيل خلفية **Spring Boot** تخدم `GET /api/products`, `/api/vehicles`, `/api/categories` … بنفس أشكال النماذج.
2. ضبط متغيّرات البيئة:
   ```bash
   VITE_USE_API=true
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
3. إعادة التشغيل — يتحوّل التطبيق بالكامل من `Mock` إلى `Http` تلقائياً.

---

## 🗺️ خارطة الطريق

| المرحلة | الوصف | الحالة |
|--------|-------|:-----:|
| 0 | تنظيف وتثبيت الأساس (strict TS، رموز الهوية) | ✅ |
| 1 | طبقة التجريد ونماذج البيانات (Repository + hooks) | ✅ |
| 2 | التوجيه وفصل الصفحات + فلاتر الـ URL | ✅ |
| 3 | مكتبة المكوّنات + Skeletons + حفظ السلّة محلياً | ✅ |
| 4 | ثنائية اللغة AR/EN + تحويل العملة إلى د.ك | ✅ |
| 5 | خلفية **Spring Boot** + تفعيل `HttpRepository` | ⏳ |
| 6 | تكامل الدفع عبر **Tap** (KNET / بطاقات) | ⏳ |
| 7 | **لوحة تحكم المالك** لإدارة المنتجات والطلبات | ⏳ |

---

## 📝 ملاحظات

- البيانات الحالية **وهمية** ومعزولة خلف طبقة المستودعات؛ لا يوجد باك إند أو قاعدة بيانات بعد.
- الأوصاف التفصيلية للمنتجات وبعض الأقسام (منصّة التجهيز، الخدمات، الهوية) نصوصها عربية وستصبح ثنائية اللغة عند ربط الباك إند.
- الأسعار تقديرية لأغراض العرض ويسهل تعديلها من [`src/data/mockData.ts`](src/data/mockData.ts).

---

<div align="center">

**KING 4x4** — نجهّز سيارتك للمغامرة 🏜️
<br/>
<sub>React · TypeScript · Spring Boot-ready · Tap Payments (planned)</sub>

</div>
