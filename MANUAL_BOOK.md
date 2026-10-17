# 📖 BUKU PANDUAN PENGGUNA (MANUAL BOOK)
# CAPIT STORE — Platform E-Commerce Sandal Kontemporer

<p align="center">
  <img src="assets/logo.png" alt="Capit Store Logo" width="180">
</p>

---

## 📑 DAFTAR ISI
1. [Pendahuluan](#1-pendahuluan)
2. [Arsitektur & Kebutuhan Sistem](#2-arsitektur--kebutuhan-sistem)
3. [Panduan Pembeli (Customer Guide)](#3-panduan-pembeli-customer-guide)
   - [3.1 Pendaftaran & Masuk Akun](#31-pendaftaran--masuk-akun)
   - [3.2 Menjelajahi Katalog & Pencarian Sandal](#32-menjelajahi-katalog--pencarian-sandal)
   - [3.3 Mengelola Keranjang Belanja (Cart)](#33-mengelola-keranjang-belanja-cart)
   - [3.4 Mengatur Alamat Pengiriman](#34-mengatur-alamat-pengiriman)
   - [3.5 Menyelesaikan Checkout & Pembayaran](#35-menyelesaikan-checkout--pembayaran)
   - [3.6 Melacak Riwayat Pesanan (My Orders)](#36-melacak-riwayat-pesanan-my-orders)
   - [3.7 Menghubungi Customer Service](#37-menghubungi-customer-service)
4. [Panduan Penjual & Admin (Seller Guide)](#4-panduan-penjual--admin-seller-guide)
   - [4.1 Akses Panel Seller Dashboard](#41-akses-panel-seller-dashboard)
   - [4.2 Menambah Produk Sandal Baru](#42-menambah-produk-sandal-baru)
   - [4.3 Mengelola Katalog Produk](#43-mengelola-katalog-produk)
   - [4.4 Memproses Pesanan Masuk](#44-memproses-pesanan-masuk)
5. [Panduan Administrator Teknis (DevOps & Setup)](#5-panduan-administrator-teknis-devops--setup)
   - [5.1 Setup Environment Variables](#51-setup-environment-variables)
   - [5.2 Sinkronisasi Webhook Clerk & Inngest](#52-sinkronisasi-webhook-clerk--inngest)
   - [5.3 Migrasi & Seeding Database](#53-migrasi--seeding-database)
6. [Troubleshooting & Solusi Kendala](#6-troubleshooting--solusi-kendala)

---

## 1. PENDAHULUAN

**Capit Store** adalah platform web e-commerce modern yang dirancang khusus untuk memfasilitasi penjualan sandal kasual dan kontemporer hasil kolaborasi karya anak bangsa bersama **Ndaweg Studio**. 

Platform ini menghadirkan pengalaman belanja daring yang mulus dengan performa rendering cepat berbasis **Next.js 15 (App Router)**, otentikasi aman melalui **Clerk**, penyimpanan foto berbasis cloud dengan **Cloudinary**, pemrosesan antrean latar belakang menggunakan **Inngest**, serta database NoSQL terdistribusi di **MongoDB Atlas**.

---

## 2. ARSITEKTUR & KEBUTUHAN SISTEM

### Kebutuhan Server / Development:
* **Node.js**: Versi 18.18+ atau 20+ (LTS direkomendasikan)
* **Package Manager**: NPM (v9+) atau PNPM
* **Database**: MongoDB Atlas Cluster (M0 Free Tier atau Dedicated)
* **Koneksi Internet**: Untuk integrasi API Clerk, Inngest, Cloudinary, dan EmailJS.

---

## 3. PANDUAN PEMBELI (CUSTOMER GUIDE)

### 3.1 Pendaftaran & Masuk Akun
1. Buka situs web **Capit Store** di browser Anda.
2. Klik tombol **Sign In / Akun** pada pojok kanan atas bilah navigasi (*Navbar*).
3. Anda dapat memilih opsi autentikasi:
   - **Google One-Tap / OAuth**: Masuk secara instan dengan akun Google Anda.
   - **Email & Kata Sandi**: Daftarkan email aktif untuk menerima kode verifikasi aman dari Clerk.
4. Setelah berhasil masuk, ikon profil dan inisial akun Anda akan tampil pada Navbar.

### 3.2 Menjelajahi Katalog & Pencarian Sandal
1. **Halaman Beranda**: Menampilkan banner promosi terbaru, koleksi unggulan, dan produk terlaris.
2. **Halaman All Products**: Menampilkan seluruh katalog sandal yang tersedia.
3. **Filter Kategori**: Pilih kategori sandal yang diinginkan (Casual, Flop, Slipper, dsb).
4. **Detail Produk**: Klik pada kartu sandal untuk membuka halaman detail:
   - Memeriksa foto produk resolusi tinggi dari berbagai sudut.
   - Membaca deskripsi material sol, strap, keunggulan, dan tingkat kenyamanan.
   - Melihat perbandingan harga normal (*strike-through price*) dan harga diskon (*offer price*).

### 3.3 Mengelola Keranjang Belanja (Cart)
1. Pada halaman detail produk, klik tombol **"Add To Cart"** untuk menyimpan produk ke keranjang.
2. Notifikasi pop-up (*toast notification*) akan mengonfirmasi bahwa produk telah masuk ke keranjang belanja.
3. Buka halaman keranjang dengan mengklik ikon **Cart** di navbar.
4. Anda dapat menambah jumlah kuantitas (+) atau mengurangi kuantitas (-), serta menghapus produk yang batal dibeli. Keranjang belanja tersimpan secara real-time ke akun Anda di database.

### 3.4 Mengatur Alamat Pengiriman
1. Pada halaman keranjang, klik tombol **"Proceed to Checkout"**.
2. Jika ini adalah transaksi pertama Anda, klik menu **"Add Address"**:
   - **Full Name**: Masukkan nama lengkap penerima paket.
   - **Phone Number**: Masukkan nomor telepon/WhatsApp aktif untuk kurir pengiriman.
   - **Postal Code**: Kode pos tujuan.
   - **City & State**: Kota dan provinsi tujuan.
   - **Detailed Address**: Nomor rumah, nama jalan, RT/RW, dan patokan alamat.
3. Klik **"Save Address"** untuk menyimpan ke database akun.

### 3.5 Menyelesaikan Checkout & Pembayaran
1. Pilih salah satu alamat pengiriman tersimpan sebagai alamat utama.
2. Periksa rincian total transaksi (Subtotal belanja + Biaya pengiriman).
3. Pilih metode pembayaran yang tersedia (Cash on Delivery / Transfer Bank).
4. Klik **"Place Order"**. Pesanan Anda akan diproses dan tersimpan ke sistem.

### 3.6 Melacak Riwayat Pesanan (My Orders)
1. Klik dropdown foto profil Anda di navbar, lalu pilih **"My Orders"**.
2. Anda akan melihat daftar seluruh transaksi:
   - Tanggal & jam pemesanan.
   - Foto dan nama item sandal yang dipesan.
   - Total nominal pembayaran.
   - Status pesanan (*Order Placed*, *Processing*, *Shipped*, *Delivered*).

### 3.7 Menghubungi Customer Service
1. Akses menu **Contact Us** pada footer website.
2. Isi formulir nama, email, dan pesan pertanyaan/keluhan Anda.
3. Pesan akan langsung terkirim ke tim pengelola melalui layanan **EmailJS**.

---

## 4. PANDUAN PENJUAL & ADMIN (SELLER GUIDE)

### 4.1 Akses Panel Seller Dashboard
1. Pastikan Anda telah masuk dengan akun yang memiliki hak akses seller/admin.
2. Navigasikan browser ke URL: /seller.
3. Panel sidebar akan menampilkan menu utama:
   - **Add Product** (Tambah Produk Baru)
   - **Product List** (Daftar & Kontrol Stok)
   - **Orders** (Manajemen Transaksi Masuk)

### 4.2 Menambah Produk Sandal Baru
1. Masuk ke halaman /seller.
2. Klik pada area slot **Upload Images** untuk memilih foto produk (dapat mengunggah hingga 4 foto per produk).
3. Masukkan **Product Name** yang jelas dan menarik.
4. Masukkan **Product Description** lengkap mengenai material, ukuran ketersediaan, dan petunjuk perawatan.
5. Pilih **Product Category** yang sesuai.
6. Masukkan **Product Price** (harga normal) dan **Offer Price** (harga jual setelah promo).
7. Tentukan jumlah **Stock**.
8. Klik tombol **"Add Product"**. Sistem akan otomatis mengompresi dan mengunggah gambar ke CDN Cloudinary, lalu mencatat data produk ke MongoDB.

### 4.3 Mengelola Katalog Produk
1. Buka menu **Product List** (/seller/product-list).
2. Tabel akan menyajikan foto utama, nama produk, kategori, harga jual, dan status stok.
3. Klik tombol ikon sampah (*trash action*) jika ingin menarik atau menghapus produk dari etalase pembeli.

### 4.4 Memproses Pesanan Masuk
1. Buka menu **Orders** (/seller/orders).
2. Periksa daftar order terbaru dari pelanggan:
   - Rincian item dan kuantitas.
   - Nama pelanggan dan alamat pengiriman lengkap.
   - Status pembayaran.
3. Perbarui status order sesuai progres pengiriman fisik paket.

---

## 5. PANDUAN ADMINISTRATOR TEKNIS (DEVOPS & SETUP)

### 5.1 Setup Environment Variables
Buat berkas .env dari .env.example:
`env
NEXT_PUBLIC_CURRENCY=Rp.
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/capitstore
INNGEST_SIGNING_KEY=signkey-prod-xxx
INNGEST_EVENT_KEY=xxx
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
`

### 5.2 Sinkronisasi Webhook Clerk & Inngest
1. Pada **Clerk Dashboard** -> **Webhooks**, tambahkan endpoint:
   https://domain-anda.com/api/inngest
2. Langganan event: user.created, user.updated, user.deleted.
3. Event tersebut akan memicu fungsi sinkronisasi di config/inngest.js untuk membuat/memperbarui record user di koleksi users MongoDB secara otomatis.

### 5.3 Migrasi & Seeding Database
Untuk mengisi katalog awal dengan data contoh:
`ash
node seed.mjs
`
Atau jika Anda memiliki arsip database JSON/RAR:
`ash
node import-rar.mjs
`

---

## 6. TROUBLESHOOTING & SOLUSI KENDALA

### Q1: Gambar produk gagal diunggah di panel seller?
> **Solusi**: Periksa konfigurasi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET di file .env. Pastikan limit kuota upload Cloudinary akun Anda masih tersedia.

### Q2: Setelah login Clerk, keranjang belanja tidak tersimpan?
> **Solusi**: Pastikan koneksi ke MongoDB Atlas aktif dan webhook Inngest telah disinkronisasi sehingga dokumen userId Clerk terdaftar pada database MongoDB.

### Q3: Tampilan styling Tailwind berantakan saat dideploy ke Vercel?
> **Solusi**: Pastikan build command menggunakan 
ext build dan path pada 	ailwind.config.mjs mencakup ./app/**/*.{js,ts,jsx,tsx}, ./components/**/*.{js,ts,jsx,tsx}.