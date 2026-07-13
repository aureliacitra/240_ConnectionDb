const express = require('express');
const { Pool } = require ('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa', //namedatabase
    password: 'Teknik123',
    port: 5432,  
});

// Middleware agar Express bisa membaca JSON (opsional tapi baik digunakan)
app.use(express.json());

// 2. Membuat Method GET untuk Mengambil Data dari Tabel Biodata
app.get('/biodata', async (req, res) => {
    try {
        // Mengambil koneksi dari pool dan menjalankan query
        const result = await pool.query('SELECT * FROM biodata');
        
        // Mengembalikan respons berupa data mahasiswa
        res.status(200).json({
            message: "Berhasil mengambil data biodata",
            data: result.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server atau database" });
    }
});

// 3. Menjalankan Server Express
app.listen(port, () => {
    console.log (`Server berjalan di http://localhost:${port}`);
});