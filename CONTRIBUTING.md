# 🤝 Panduan Kontribusi — Capit Store

Terima kasih atas ketertarikan Anda untuk berkontribusi pada proyek **Capit Store**! Platform e-commerce sandal kasual kontemporer ini dikembangkan secara open-source untuk mendukung brand lokal dan inovasi digital.

---

## 📌 Alur Kontribusi

### 1. Pelaporan Kendala (Bug Reports)
Jika Anda menemukan error pada checkout, sinkronisasi webhook Inngest, upload foto produk Cloudinary, atau autentikasi Clerk:
1. Periksa tab [Issues](https://github.com/Khoniv/capit-store/issues) untuk memastikan kendala belum dilaporkan sebelumnya.
2. Buat issue baru dengan format jelas:
   - **Deskripsi Bug**: Penjelasan singkat kendala yang terjadi.
   - **Langkah Reproduksi**: Urutan tindakan yang memicu bug.
   - **Tangkapan Layar / Log Konsol**: Sertakan pesan error browser atau terminal Next.js.
   - **Lingkungan**: Node.js version, browser, OS.

### 2. Pengajuan Fitur Baru (Feature Requests)
Ingin menambahkan fitur baru seperti payment gateway otomatis (Midtrans/Xendit), sistem review rating bintang, atau filter ukuran sandal real-time? Buat issue baru berlabel enhancement.

### 3. Mengirimkan Pull Request (PR)
1. Lakukan **Fork** pada repositori ini.
2. Buat branch baru dari main:
   `ash
   git checkout -b feature/nama-fitur
   `
3. Lakukan pengujian lokal dengan:
   `ash
   npm run lint
   npm run build
   `
4. Commit perubahan Anda dengan pesan yang jelas:
   `ash
   git commit -m "feat(cart): integrasi kalkulasi diskon otomatis"
   `
5. Push ke fork Anda dan ajukan **Pull Request** ke branch main.

---

## 🛠️ Standar Kode
- Gunakan arsitektur App Router Next.js 15 (pp/).
- Pastikan styling konsisten dengan utility classes **Tailwind CSS**.
- Tangani penanganan error asynchronous pada API routes dan Mongoose queries dengan 	ry/catch.

---

## 📬 Kontak & Pengembang
- **Developer**: Khonif Zakaria (NivDev) & Ndaweg Studio
- **Email**: [oniefzk11@gmail.com](mailto:oniefzk11@gmail.com)
- **GitHub**: [@Khoniv](https://github.com/Khoniv)