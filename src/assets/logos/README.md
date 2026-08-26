# شعارات الماركات (خلفية شفافة)

ضع ملفات شعارات الماركات هنا بصيغة PNG بخلفية شفافة، **بهذه الأسماء بالضبط**
(الأسماء مطابقة لـ `vehicle.id` في `src/data/mockData.ts`):

| الماركة | اسم الملف |
|--------|-----------|
| Toyota | `toyota.png` |
| Nissan | `nissan.png` |
| Ford | `ford.png` |
| Jeep | `jeep.png` |
| Mitsubishi | `mitsubishi.png` |
| Land Rover | `landrover.png` |

بعد وضع الملفات، تُربط تلقائياً عبر استيرادها في `mockData.ts`:

```ts
import toyota from '../assets/logos/toyota.png';
// logo: toyota
```
