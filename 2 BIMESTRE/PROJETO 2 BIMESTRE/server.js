const express = require('express');
const os = require('os');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// ================= LIVROS =================
app.get('/livros', async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT id_livro, titulo, ano_pulicacao, genero, id_autor, favorito
            FROM livro
            ORDER BY titulo
        `);

        res.json({
            sucesso: true,
            livros: result.rows,
            quantidade: result.rows.length
        });

    } catch (error) {
        console.error('Erro ao listar livros:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno do servidor'
        });
    }
});

// ⭐ FAVORITAR (TOGGLE MELHORADO)
app.post('/favoritar/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(`
            UPDATE livro
            SET favorito = NOT COALESCE(favorito, false)
            WHERE id_livro = $1
            RETURNING id_livro, favorito
        `, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                ok: false,
                mensagem: "Livro não encontrado"
            });
        }

        res.json({
            ok: true,
            livro: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            mensagem: "Erro ao favoritar"
        });
    }
});

// ================= IP =================
const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nome in interfaces) {
        for (let info of interfaces[nome]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

const ip = obterIP();

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`);
    console.log(`GET http://${ip}:${port}/livros`);
});