# KING 4x4 — Storefront

متجر وتجهيزات سيارات الدفع الرباعي والمغامرة. واجهة أمامية (React + TypeScript + Vite) مبنية فوق **طبقة بيانات مجرّدة (Repository)** بحيث يمكن استبدال البيانات الوهمية بواجهة REST حقيقية (Spring Boot) دون تعديل المكوّنات.

## المتطلبات

- Node.js 20+

## التشغيل محلياً

```bash
npm install
npm run dev
```

يفتح المتجر على `http://localhost:3000`.

## الأوامر

| الأمر | الوظيفة |
|------|---------|
| `npm run dev` | تشغيل خادم التطوير |
| `npm run build` | بناء نسخة الإنتاج |
| `npm run preview` | معاينة نسخة الإنتاج |
| `npm run lint` | فحص أنواع TypeScript (`tsc --noEmit`) |

## المعمارية

```
UI (components/pages)
  → hooks (useProducts, useVehicles, …)
    → Repository interface (ProductRepository, …)
      → MockRepository  (اليوم — يقرأ من src/data/mockData.ts)
      → HttpRepository  (لاحقاً — REST عبر src/lib/apiClient.ts)
```

- المكوّنات لا تعرف مصدر البيانات. التبديل بين Mock و REST يتم عبر متغيّر بيئة واحد.
- انظر [.env.example](.env.example) لضبط `VITE_USE_API` و`VITE_API_BASE_URL`.

### بنية البيانات

- `src/types.ts` — نماذج TypeScript (Product, Vehicle, Category, Service…).
- `src/data/repositories/` — الواجهات (interfaces) وتنفيذات Mock/Http.
- `src/data/RepositoryProvider.tsx` — حقن التنفيذ المناسب عبر React Context.
- `src/data/hooks.ts` — hooks التحميل (`{ data, loading, error }`).
- `src/data/mockData.ts` — مصدر البيانات الوهمية (خلف MockRepository فقط).
