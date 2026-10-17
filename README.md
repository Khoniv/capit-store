# 🩴 Capit Store (Ndaweg Studio)

> **Platform E-Commerce Sandal Kontemporer & Modern** yang dibangun menggunakan **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, **MongoDB Atlas**, **Clerk Authentication**, **Cloudinary**, dan **Inngest**.

---

## 📌 Daftar Isi
- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Arsitektur & Struktur Folder](#-arsitektur--struktur-folder)
- [Instalasi & Panduan Setup](#-instalasi--panduan-setup)
- [Konfigurasi Environment Variables](#-konfigurasi-environment-variables)
- [Manual Book (Buku Panduan Penggunaan)](#-manual-book-buku-panduan-penggunaan)
  - [1. Pengguna / Pembeli (Customer)](#1-pengguna--pembeli-customer)
  - [2. Panel Penjual / Admin (Seller Dashboard)](#2-panel-penjual--admin-seller-dashboard)
- [Workflow & Background Jobs](#-workflow--background-jobs)
- [Kontribusi & Lisensi](#-kontribusi--lisensi)

---

## 📖 Tentang Project

**Capit Store** adalah aplikasi web toko online modern yang dirancang khusus untuk memfasilitasi transaksi dan katalog produk sandal kasual & premium karya anak bangsa (kolaborasi bersama *Ndaweg Studio*). 

Project ini menggabungkan antarmuka interaktif responsif (*mobile-friendly*), performa kencang dengan Next.js App Router & Turbopack, sinkronisasi event webhook otomatis via Inngest, autentikasi aman via Clerk, serta database NoSQL MongoDB.

---

## ✨ Fitur Utama

### 🛒 Sisi Pembeli (Customer Facing)
- **Autentikasi & Profil**: Registrasi/login cepat dan aman melalui Clerk (Google OAuth, Email, dll).
- **Katalog Produk Dinamis**: Pencarian, filter kategori, penyesuaian harga promo/asli, dan rincian spesifikasi sandal.
- **Keranjang Belanja (Cart)**: Tambah item, ubah jumlah kuantitas (*quantity*), serta sinkronisasi otomatis dengan database pengguna.
- **Manajemen Alamat**: Input dan pemilihan alamat pengiriman lengkap (nama, nomor telepon, kode pos, alamat rinci).
- **Proses Checkout & Order**: Checkout pesanan dengan kalkulasi subtotal dan biaya otomatis.
- **Pelacakan Pesanan (My Orders)**: Melihat status riwayat pesanan (*Order Placed*, pengiriman, detail barang, dll).
- **Halaman Kontak Interaktif**: Kirim pesan langsung ke admin dengan integrasi EmailJS.
- **Halaman Tentang Kami (About Us)**: Profil brand Capit Store & Ndaweg Studio.

### 💼 Sisi Penjual (Seller / Admin Panel)
- **Dashboard Seller**: Ringkasan performa penjualan dan navigasi cepat.
- **Tambah Produk (Add Product)**:
  - Input nama produk, deskripsi, harga normal (*offer price*), harga diskon.
  - Multi-upload gambar produk langsung ke **Cloudinary CDN**.
  - Pemilihan kategori sandal.
- **Daftar Produk (Product List)**: Manajemen katalog produk, melihat status stok, dan kontrol hapus produk.
- **Manajemen Pesanan (Orders Management)**: Melihat seluruh transaksi masuk dari pembeli secara real-time.

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
|---|---|
| **Framework Web** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Library UI** | [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) |
| **Ikon & Animasi** | [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/) |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/) |
| **Autentikasi** | [Clerk Auth](https://clerk.com/) |
| **Media Storage** | [Cloudinary](https://cloudinary.com/) |
| **Background Queue / Sync** | [Inngest](https://www.inngest.com/) |
| **Email Service** | [EmailJS](https://www.emailjs.com/) |
| **Notifikasi UI** | [React Hot Toast](https://react-hot-toast.com/) |

---

## 📂 Arsitektur & Struktur Folder

```text
capit-store/
├── app/
│   ├── (public pages)/
│   │   ├── page.jsx                # Landing Page & Produk Utama
│   │   ├── all-products/           # Halaman Seluruh Produk
│   │   ├── product/[id]/           # Detail Spesifik Produk
│   │   ├── cart/                   # Keranjang Belanja
│   │   ├── add-address/            # Tambah / Kelola Alamat
│   │   ├── my-orders/              # Riwayat Pesanan User
│   │   ├── about-us/               # Halaman Tentang Capit Store
│   │   └── contact/                # Kontak & Hubungi Kami
│   ├── seller/                     # Panel Khusus Penjual (Dashboard)
│   │   ├── page.jsx                # Tambah Produk Baru
│   │   ├── product-list/           # Daftar Katalog Produk
│   │   └── orders/                 # Manajemen Pesanan Masuk
│   └── api/                        # Next.js API Routes (Backend)
│       ├── inngest/                # Handler Webhook & Sync Inngest
│       ├── product/                # Endpoint CRUD Produk
│       ├── cart/                   # Endpoint Cart User
│       ├── order/                  # Endpoint Pembuatan & Status Order
│       └── user/                   # Endpoint Sinkronisasi User
├── components/                     # Reusable Components (Navbar, Footer, Cards, dll)
├── config/                         # Konfigurasi Database & Integrasi (db.js, inngest.js)
├── context/                        # React Context Global State (AppContext.jsx)
├── models/                         # Schema Mongoose (User, Product, Order, Address)
├── assets/                         # Static Assets & Icons
└── public/                         # Public Static Files
```

---

## 🚀 Instalasi & Panduan Setup

Pastikan Anda telah menginstal **Node.js (v18.18+ atau v20+)** dan **Git** di perangkat Anda.

### 1. Clone Repositori
```bash
git clone https://github.com/Khoniv/capit-store.git
cd capit-store
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Setup Konfigurasi Environment
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi nilai variabel sesuai dengan akun layanan Anda (Clerk, MongoDB, Cloudinary, Inngest, EmailJS).

### 4. Jalankan Development Server
```bash
npm run dev
```
Akses aplikasi melalui browser di [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Konfigurasi Environment Variables

Buka file `.env` dan lengkapi konfigurasi berikut:

```env
# Currency Formatting
NEXT_PUBLIC_CURRENCY=Rp.

# Clerk Authentication (Dapatkan di https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Database MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/capit-store

# Inngest (Event Queue & Webhook Sync)
INNGEST_SIGNING_KEY=signkey-prod-xxx
INNGEST_EVENT_KEY=xxx

# Cloudinary (Untuk Upload Foto Produk di https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# EmailJS (Untuk Form Hubungi Kami di https://www.emailjs.com)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```

---

## 📚 MANUAL BOOK (Buku Panduan Penggunaan)

### 1. Pengguna / Pembeli (Customer)

#### A. Mendaftar & Masuk Akun
1. Buka website **Capit Store**.
2. Klik tombol profil/masuk di bagian kanan atas pada **Navbar**.
3. Pilih metode login yang diinginkan (Google Akun atau Email/Kata Sandi).
4. Setelah berhasil masuk, status login akan aktif dan keranjang belanja otomatis tersinkronisasi.

#### B. Menjelajahi & Memilih Sandal
1. Masuk ke halaman **All Products** atau scroll di halaman Beranda.
2. Klik salah satu kartu produk sandal untuk membuka halaman **Detail Produk**.
3. Di halaman detail, periksa foto produk, deskripsi, varian ukuran, dan harga.
4. Klik **"Add To Cart"** untuk menyimpan ke keranjang, atau **"Buy Now"** untuk langsung memproses pesanan.

#### C. Keranjang Belanja & Pengaturan Alamat
1. Klik ikon **Keranjang (Cart)** pada Navbar.
2. Anda dapat mengubah jumlah pasang sandal yang ingin dibeli atau menghapus item.
3. Klik tombol **"Proceed to Checkout"**.
4. Jika belum menambahkan alamat, sistem akan mengarahkan ke form **Add Address**:
   - Masukkan Nama Lengkap, Nomor Handphone / WhatsApp aktif.
   - Masukkan Kode Pos, Kota, Provinsi, dan Detail Jalan / Nomor Rumah.
   - Klik **"Save Address"**.

#### D. Menyelesaikan Pesanan & Riwayat Transaksi
1. Pilih alamat pengiriman yang aktif.
2. Pilih metode pembayaran yang tersedia.
3. Konfirmasi pesanan Anda. Setelah berhasil, Anda akan dialihkan ke halaman konfirmasi.
4. Untuk memantau status barang, buka menu **"My Orders"** di dropdown profil Anda.

---

### 2. Panel Penjual / Admin (Seller Dashboard)

Akses panel admin melalui tautan `/seller` pada browser setelah login.

#### A. Menambah Produk Sandal Baru (`/seller`)
1. Klik menu **"Add Product"** di sidebar penjual.
2. Unggah foto produk pada slot gambar yang tersedia (format PNG/JPG, disarankan resolusi jernih).
3. Masukkan **Product Name** (Contoh: *Capit Signature Edition Olive*).
4. Tuliskan deskripsi lengkap mengenai material sol, strap, keunggulan, dan ketahanan produk.
5. Tentukan **Kategori** produk sandal.
6. Masukkan **Product Price** (harga normal) dan **Offer Price** (harga promosi setelah diskon).
7. Klik tombol **"Add"**. Sistem akan mengunggah gambar ke Cloudinary dan menyimpan data ke MongoDB.

#### B. Mengelola Daftar Produk (`/seller/product-list`)
1. Klik menu **"Product List"** di sidebar.
2. Anda akan melihat seluruh daftar sandal yang sedang aktif dijual.
3. Anda dapat memeriksa harga, kategori, dan menekan tombol hapus (*action delete*) jika produk sudah tidak diproduksi.

#### C. Memantau Pesanan Masuk (`/seller/orders`)
1. Buka menu **"Orders"**.
2. Pantau daftar transaksi masuk, item yang dipesan pembeli, detail alamat pengiriman, status pembayaran, serta tanggal transaksi.
3. Perbarui status pengiriman barang jika pesanan sedang diproses atau dikirim.

---

## ⚡ Workflow & Background Jobs

Proyek ini menggunakan **Inngest** untuk menangani sinkronisasi asynchronous:
- **Sinkronisasi User Clerk ke MongoDB**: Ketika pengguna mendaftar atau memperbarui profil melalui Clerk, Inngest menerima webhook event (`clerk/user.created`, `clerk/user.updated`, `clerk/user.deleted`) dan langsung mengupdate dokumen user di database MongoDB secara aman di latar belakang.
- **Workflow Order Processing**: Otomatisasi data pesanan tanpa membebani thread utama server.

---

## 📄 Lisensi & Kontribusi

Dikembangkan oleh **Khoniv** & didukung oleh **Ndaweg Studio**.
Proyek ini dibuat untuk keperluan portofolio, pengembangan komersial, dan edukasi e-commerce modern.
Pull request dan saran perbaikan fitur sangat dipersilakan!
