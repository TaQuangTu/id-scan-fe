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

**Admin Dashboard:**
1. Go to `/admin` 
2. Login: `admin` / `admin`
3. View all check-ins, search, delete, or download CSV
4. Use "Tải dữ liệu mẫu" to load 5 sample visitors for demo
5. Use "Xóa toàn bộ" to clear all data

## 📂 Key Files

```
src/
├── components/
│   ├── QRScanner.tsx        # QR scanner + VNeID parser
│   └── VisitorForm.tsx      # Form with localStorage save
├── app/admin/
│   ├── page.tsx             # Admin login
│   └── dashboard/page.tsx   # Admin dashboard
└── utils/
    └── demoData.ts          # Demo data generator
```

## 🔄 Next Steps

- [ ] Backend API integration (when ready)
- [ ] Real authentication system
- [ ] Database storage (replace localStorage)
