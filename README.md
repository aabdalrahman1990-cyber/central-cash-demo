# Central Cash Deposit & Smart Cash Bag Tracking Platform

نموذج أولي مؤسسي لمنصة تتبع الإيداعات النقدية والحقائب النقدية الذكية بين البنوك التجارية والبنك المركزي.

## المكونات

- `apps/web`: واجهة `Next.js` عربية أولًا مع RTL ولوحات معلومات وسير عمل تشغيلي.
- `apps/api`: واجهة `NestJS` REST API مع RBAC وMaker-Checker وسجل تدقيق.
- `docker-compose.yml`: تشغيل الواجهة والخلفية و`PostgreSQL`.

## التشغيل المحلي

```bash
npm install
npm run dev
```

أو من داخل نفس المجلد شغّل الملف:

```bash
run-central-bank-platform.cmd
```

بعد التشغيل افتح النظام على:

```bash
http://localhost:3006/ar/portal
```

## نشر سريع للعرض فقط

هذا المسار مناسب للعرض والاجتماعات وليس للنشر الإنتاجي الكامل.

### الخيار الأسرع: Vercel

الواجهة الحالية في `apps/web` تعمل كـ Demo مستقل ببيانات تجريبية، لذلك يمكن نشرها بسرعة كرابط عام.

1. ارفع المشروع إلى GitHub.
2. ادخل إلى [Vercel](https://vercel.com/).
3. اختر `Add New Project`.
4. اربط مستودع GitHub الخاص بالمشروع.
5. عند إعداد المشروع اختر:
   - `Framework`: `Next.js`
   - `Root Directory`: `apps/web`
   - `Build Command`: اتركه الافتراضي
   - `Output Directory`: اتركه الافتراضي
6. اضغط `Deploy`.
7. بعد اكتمال النشر ستحصل على رابط عام مثل:

```bash
https://central-cash-platform.vercel.app
```

ثم شارك الرابط بهذا الشكل:

```bash
https://central-cash-platform.vercel.app/ar/portal
```

### ملاحظات مهمة

- هذا النشر يعرض الواجهة فقط لأغراض الـ Demo.
- لا يعتمد على قاعدة بيانات حقيقية.
- لا يصلح بعد كنظام مصرفي إنتاجي.

## التقنيات

- Frontend: Next.js + TypeScript + Tailwind CSS + Recharts
- Backend: NestJS + TypeScript
- Database: PostgreSQL
- Auth: JWT + MFA-ready structure
- Deployment: Docker-ready
