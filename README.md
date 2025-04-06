# Generator Ayat Al-Quran

Proyek ini adalah aplikasi web sederhana yang dibuat untuk memenuhi tugas UTS Pemrograman Web. Aplikasi ini memungkinkan pengguna untuk menjelajahi ayat-ayat Al-Quran, mencari ayat tertentu, menandai ayat favorit, dan melihat detail surah dengan terjemahan.

## Fitur
- **Hasilkan Ayat Acak**: Menampilkan ayat Al-Quran secara acak dengan terjemahan bahasa Indonesia.
- **Cari Ayat**: Mencari ayat berdasarkan kata kunci tertentu.
- **Tandai Ayat Favorit**: Menyimpan ayat favorit ke dalam daftar bookmark.
- **Detail Surah**: Menampilkan detail surah, termasuk jumlah ayat dan jenis wahyu (Makkiyah/Madaniyah).

## Teknologi yang Digunakan
- **React.js**: Untuk membangun antarmuka pengguna.
- **Tailwind CSS**: Untuk styling yang cepat dan responsif.
- **React Router**: Untuk navigasi antar halaman.
- **Context API**: Untuk state management.

## Alasan Menggunakan Context API
Context API digunakan sebagai state management untuk menyimpan data bookmark ayat yang ditandai oleh pengguna. Alasan utama menggunakan Context API adalah:
1. **Kemudahan Implementasi**: Context API mudah diatur dan digunakan tanpa memerlukan library tambahan seperti Redux.
2. **Efisiensi**: Context API memungkinkan berbagi state global di seluruh komponen aplikasi tanpa harus meneruskan props secara manual.
3. **Skalabilitas**: Cocok untuk aplikasi kecil hingga menengah seperti proyek ini, di mana state global hanya digunakan untuk fitur tertentu (seperti bookmark).

## Cara Menjalankan Proyek
1. **Clone Repository**
   ```bash
   git clone https://github.com/alfajar-122140122/uts_pemrograman_web_122140122.git
   cd uts_pemrograman_web_122140122
   
2. **Instal Dependensi**
    ```bash
    npm install

3. **Jalankan Aplikasi**
   ```
   npm run dev

## Struktur Proyek
<pre>
src/
├── components/       # Komponen UI seperti Header, Footer, VerseCard
├── context/          # Context API untuk state management (contoh: BookmarkContext)
├── hooks/            # Custom hooks (contoh: useVerse)
├── pages/            # Halaman utama aplikasi (Homepage, SurahPage, NotFoundPage, dll.)
├── services/         # API service untuk mengambil data dari Al-Quran Cloud API
├── App.jsx           # Komponen utama aplikasi
├── main.jsx          # Entry point aplikasi 
</pre>

## Kontak
- Nama: Alfajar
- NIM: 122140122
- Mata Kuliah: Pemrograman Web - RB
