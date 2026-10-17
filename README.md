<p align="center">
  <img src="assets/logo.png" alt="Capit Store Logo" width="200">
</p>

<h1 align="center">🩴 Capit Store (Ndaweg Studio)</h1>

<p align="center">
  <strong>Platform E-Commerce Modern & Kontemporer Khusus Sandal Kasual Karya Anak Bangsa</strong>
</p>

<p align="center">
  <a href="https://github.com/Khoniv/capit-store"><img src="https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"></a>
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/MongoDB-Atlas_6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk">
  <img src="https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary">
  <img src="https://img.shields.io/badge/Inngest-Queues-000000?style=for-the-badge" alt="Inngest">
</p>

---

## 📌 Daftar Isi
- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Arsitektur & Struktur Direktori](#-arsitektur--struktur-direktori)
- [Instalasi & Panduan Setup](#-instalasi--panduan-setup)
- [Konfigurasi Environment Variables](#-konfigurasi-environment-variables)
- [Panduan Penggunaan Fitur](#-panduan-penggunaan-fitur)
  - [1. Sisi Pembeli (Customer)](#1-sisi-pembeli-customer)
  - [2. Sisi Penjual (Seller Dashboard)](#2-sisi-penjual-seller-dashboard)
- [Workflow Asynchronous & Background Jobs](#-workflow-asynchronous--background-jobs)
- [Database Seeding & Migrasi](#-database-seeding--migrasi)
- [Pengembang & Kontak](#-pengembang--kontak)

---

## 📖 Tentang Proyek

**Capit Store** adalah aplikasi web toko online modern yang dirancang secara khusus untuk memfasilitasi transaksi dan katalog produk sandal kasual & kontemporer berkualitas tinggi, hasil kolaborasi bersama brand kreatif **Ndaweg Studio**.

Proyek ini menghadirkan antarmuka belanja yang interaktif, responsif, dan elegan dengan memanfaatkan performa tinggi **Next.js 15 App Router & Turbopack**, autentikasi berbasis cloud yang aman via **Clerk**, manajemen event webhook dan antrean background menggunakan **Inngest**, penyimpanan gambar multi-file di **Cloudinary CDN**, serta database NoSQL terdistribusi menggunakan **MongoDB Atlas**.

---

## ✨ Fitur Utama

### 🛒 Sisi Pembeli (Customer Facing)
- **Autentikasi Aman**: Registrasi/login instan melalui Clerk (Google OAuth & Email OTP).
- **Katalog Produk Interaktif**: Menampilkan daftar produk dengan filter kategori, harga promo (*offer price*), kalkulasi diskon, dan spesifikasi material sandal.
- **Keranjang Belanja Real-Time (Shopping Cart)**: Sinkronisasi item keranjang belanja ke database pengguna dengan kontrol kuantitas dinamis.
- **Manajemen Alamat Pengiriman**: Pengguna dapat menyimpan beberapa alamat lengkap dengan nomor telepon aktif untuk kurir pengiriman.
- **Proses Checkout Transparan**: Kalkulasi subtotal barang dan estimasi ongkir otomatis.
- **Riwayat Pesanan (My Orders)**: Pelacakan status pemesanan (*Order Placed*, *Shipped*, *Delivered*).
- **Formulir Kontak Terintegrasi**: Kirim pesan langsung ke admin melalui EmailJS.

### 💼 Sisi Penjual & Admin (Seller Dashboard - /seller)
- **Dashboard Ringkasan**: Statistik penjualan dan navigasi cepat.
- **Tambah Produk Baru (/seller)**:
  - Formulir input judul, deskripsi lengkap, harga normal, harga promo diskon, kategori, dan stok barang.
  - Multi-upload gambar produk secara langsung ke **Cloudinary CDN**.
- **Manajemen Katalog (/seller/product-list)**: Tabel daftar produk aktif dengan aksi hapus produk.
- **Manajemen Pesanan (/seller/orders)**: Pemantauan pesanan pelanggan yang masuk secara *real-time*.

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi | Deskripsi |
|---|---|---|
| **Framework Web** | [Next.js 15.3 (App Router)](https://nextjs.org/) | React Server Components & Turbopack engine |
| **Library UI** | [React 19](https://react.dev/) + [Tailwind CSS 3.4](https://tailwindcss.com/) | Styling responsif dan modern |
| **Ikon & Motion** | [Lucide React](https://lucide.dev/) + [Framer Motion](https://www.framer.com/motion/) | Animasi micro-interaction halus |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/) + [Mongoose 8.14](https://mongoosejs.com/) | Schema-based NoSQL storage |
| **Autentikasi** | [Clerk Auth 6.19](https://clerk.com/) | User management & social login |
| **Media Cloud Storage** | [Cloudinary 2.6](https://cloudinary.com/) | Image upload & CDN auto-optimization |
| **Event-Driven Backend** | [Inngest 3.35](https://www.inngest.com/) | Webhook handler & background synchronization |
| **Notifikasi UI** | [React Hot Toast](https://react-hot-toast.com/) | Feedback notifikasi interaktif |
| **Email Service** | [EmailJS](https://www.emailjs.com/) | Layanan formulir pesan kontak tanpa backend email server |

---

## 📂 Arsitektur & Struktur Direktori

`	ext
capit-store/
├── app/
│   ├── (public pages)/
│   │   ├── page.jsx                # Landing page & produk unggulan
│   │   ├── all-products/           # Katalog seluruh produk sandal
│   │   ├── product/[id]/           # Detail spesifikasi & foto produk
│   │   ├── cart/                   # Keranjang belanja pembeli
│   │   ├── add-address/            # Tambah dan kelola alamat pengiriman
│   │   ├── my-orders/              # Riwayat dan status pesanan
│   │   ├── about-us/               # Profil brand Capit Store & Ndaweg
│   │   └── contact/                # Formulir kontak customer service
│   ├── seller/                     # Panel dashboard khusus penjual
│   │   ├── page.jsx                # Formulir tambah produk baru
│   │   ├── product-list/           # Manajemen daftar etalase produk
│   │   └── orders/                 # Pemantauan pesanan pelanggan
│   └── api/                        # Backend API Routes Next.js
│       ├── inngest/                # Webhook sync user Clerk ke MongoDB
│       ├── product/                # Endpoint CRUD produk
│       ├── cart/                   # Endpoint keranjang belanja
│       ├── order/                  # Endpoint transaksi pesanan
│       └── user/                   # Endpoint profil pengguna
├── assets/                         # Aset statis gambar, logo, dan ikon
├── components/                     # Komponen UI reusable (Navbar, Footer, Cards)
├── config/                         # Konfigurasi MongoDB (db.js) & Inngest
├── context/                        # React Context global state (AppContext.jsx)
├── models/                         # Schema database Mongoose (User, Product, Order)
├── public/                         # Berkas publik statis
├── .env.example                    # Template variabel lingkungan
├── .gitignore                      # Pengecualian berkas git
├── import-rar.mjs                  # Skrip impor data JSON/RAR ke database
├── seed.mjs                        # Skrip seeder data awal produk
└── README.md                       # Dokumentasi utama proyek
`

---

## 🚀 Instalasi & Panduan Setup

Pastikan Anda telah memasang **Node.js (v18.18+ atau v20+)** dan **Git** pada komputer Anda.

### 1. Clone Repositori
`ash
git clone https://github.com/Khoniv/capit-store.git
cd capit-store
`

### 2. Install Dependensi
`ash
npm install
`

### 3. Setup Berkas Lingkungan (.env)
Salin file template .env.example:
`ash
cp .env.example .env
`
Lengkapi nilai variabel sesuai dengan akun layanan Anda (Clerk, MongoDB, Cloudinary, Inngest, EmailJS).

### 4. Jalankan Development Server
`ash
npm run dev
`
Buka browser dan akses aplikasi di: **[http://localhost:3000](http://localhost:3000)**.

---

## ⚙️ Konfigurasi Environment Variables

Buka file .env dan pastikan konfigurasi berikut terisi:

`env
# Format Mata Uang Tampilan
NEXT_PUBLIC_CURRENCY=Rp.

# Clerk Authentication (Dapatkan di https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Database MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/capitstore

# Inngest (Event Queue & Webhook Sync di https://app.inngest.com)
INNGEST_SIGNING_KEY=signkey-prod-xxx
INNGEST_EVENT_KEY=xxx

# Cloudinary (Untuk Upload Foto Produk di https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# EmailJS (Untuk Form Kontak di https://www.emailjs.com)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
`

---

## 🧭 Panduan Penggunaan Fitur

### 1. Sisi Pembeli (Customer)
1. **Login Akun**: Klik tombol profil di Navbar, masuk menggunakan akun Google atau Email OTP via Clerk.
2. **Pilih Produk**: Cari sandal di Beranda atau halaman *All Products*. Klik produk untuk membaca material sol, varian, dan promo harga.
3. **Keranjang Belanja**: Klik *Add to Cart*. Atur jumlah pasang sandal yang diinginkan pada halaman Keranjang.
4. **Isi Alamat**: Daftarkan nama penerima, nomor handphone kurir, dan alamat lengkap pada form *Add Address*.
5. **Checkout & Pantau Pesanan**: Konfirmasi order dan pantau status barang Anda pada menu *My Orders*.

### 2. Sisi Penjual (Seller Dashboard)
1. Buka halaman /seller pada browser setelah login.
2. **Tambah Produk**: Isi nama sandal, deskripsi spesifikasi, kategori, harga normal, harga diskon, serta unggah foto produk ke Cloudinary.
3. **Kontrol Stok**: Pantau ketersediaan barang pada halaman /seller/product-list.
4. **Kelola Pesanan**: Buka menu /seller/orders untuk melihat transaksi masuk dan rincian pengiriman pembeli.

---

## ⚡ Workflow Asynchronous & Background Jobs

Proyek ini menggunakan **Inngest** untuk menangani sinkronisasi event penting:
* **Sinkronisasi User Clerk ke MongoDB**: Ketika user baru mendaftar atau mengubah profilnya via Clerk, webhook Clerk dikirimkan ke /api/inngest. Inngest mengeksekusi function di config/inngest.js untuk membuat/memperbarui data dokumen pengguna di MongoDB tanpa memblokir thread antarmuka.
* **Order Processing Automation**: Menangani mutasi status pesanan secara konsisten dan aman.

---

## 🗄️ Database Seeding & Migrasi

Jika Anda ingin mengisi katalog awal produk sandal secara cepat, jalankan script seeder bawaan:
`ash
node seed.mjs
`
Atau jika Anda memiliki file cadangan database JSON:
`ash
node import-rar.mjs
`

---

## 👤 Pengembang & Kontak

* **Pengembang**: **Khonif Zakaria** ([NivDev](https://github.com/Khoniv)) & **Ndaweg Studio**
* **GitHub**: [@Khoniv](https://github.com/Khoniv)
* **Email**: [oniefzk11@gmail.com](mailto:oniefzk11@gmail.com)