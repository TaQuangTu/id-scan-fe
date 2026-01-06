# VNeID QR Scanner - Thổ Chu Island Check-in

Police-operated visitor registration system for Thổ Chu Island, Kiên Giang. Scans VNeID QR codes and manages visitor check-ins.

## 🎯 Current Status

**Fully functional local demo app** - ready to present! No backend needed yet.

### What's Working
- ✅ VNeID QR code scanning (camera-based)
- ✅ Auto-extract citizen info from QR codes (pipe-delimited format)
- ✅ Visitor form with manual fields (temporary residence, notes)
- ✅ Professional high-contrast UI with island photos
- ✅ Admin dashboard with search, view, delete, CSV export
- ✅ **Local storage persistence** - all data saves to browser
- ✅ Demo data generator for presentations
- ✅ **Tourism services portal** - restaurants, hotels, vehicles, tours
- ✅ **User reviews and ratings** for services
- ✅ **Tour booking system** with admin management

### Tech Stack
- Next.js 15 + TypeScript + Tailwind CSS
- html5-qrcode library
- localStorage (browser-based, no database)

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit **http://localhost:3000**

## 📱 How to Use

**Visitor Check-in:**
1. Click "Quét mã QR" button
2. Allow camera access
3. Scan VNeID QR code → auto-fills form
4. Add temporary residence & notes
5. Submit → saves to browser

**Tourism Services (User View):**
1. Go to `/services` or click "Dịch Vụ Du Lịch" button
2. Browse services by category (restaurants, hotels, vehicles, tours)
3. View service details, prices, and reviews
4. Write reviews and rate services (1-5 stars)
5. Book tours directly with customer info

**Admin Dashboard:**
1. Go to `/admin` 
2. Login: `admin` / `admin`
3. **Visitor Management:**
   - View all check-ins, search, delete, or download CSV
   - Use "Tải dữ liệu mẫu" to load 5 sample visitors for demo
   - Use "Xóa toàn bộ" to clear all data
4. **Services Management** (click "Quản Lý Dịch Vụ"):
   - Add/edit/delete tourism services
   - Manage tour bookings (confirm/cancel)
   - Load demo services data
   - View all customer reviews

## 📂 Key Files

```
src/
├── components/
│   ├── QRScanner.tsx        # QR scanner + VNeID parser
│   └── VisitorForm.tsx      # Form with localStorage save
├── app/
│   ├── page.tsx             # Home page (visitor check-in)
│   ├── services/
│   │   └── page.tsx         # Tourism services portal (user view)
│   └── admin/
│       ├── page.tsx         # Admin login
│       ├── dashboard/
│       │   └── page.tsx     # Visitor management dashboard
│       └── services/
│           └── page.tsx     # Services & bookings management
├── types/
│   ├── vneid.ts             # Visitor data types
│   └── services.ts          # Service, review, booking types
└── utils/
    ├── demoData.ts          # Demo visitor data generator
    └── servicesStorage.ts   # Services localStorage utilities
```

## 🔄 Next Steps

- [ ] Backend API integration (when ready)
- [ ] Real authentication system
- [ ] Database storage (replace localStorage)
