const express = require('express');
const os = require('os');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 3000;

// ─── Pasta de imagens ─────────────────────────────────────────────────────────
const pastaImagens = './imagens/';
if (!fs.existsSync(pastaImagens)) {
    fs.mkdirSync(pastaImagens, { recursive: true });
}

// ─── Multer ───────────────────────────────────────────────────────────────────
const armazenamento = multer.diskStorage({
    destination: (req, file, cb) => cb(null, pastaImagens),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage: armazenamento });

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// ─── Rotas ────────────────────────────────────────────────────────────────────

// POST /enviar-mensagem — calcula a média das 4 notas
app.post('/enviar-mensagem', (req, res) => {
    // parseFloat garante que strings numéricas viram números de fato
    const w = parseFloat(req.body.w);
    const x = parseFloat(req.body.x);
    const y = parseFloat(req.body.y);
    const z = parseFloat(req.body.z);

    if ([w, x, y, z].some(isNaN)) {
        return res.status(400).json({ erro: 'Todas as notas devem ser números válidos.' });
    }

    const media = (w + x + y + z) / 4;
    console.log(`Notas recebidas: ${w}, ${x}, ${y}, ${z} → Média: ${media.toFixed(2)}`);

    res.json({ media });
});

// POST /enviar-imagem — salva a foto do aluno
app.post('/enviar-imagem', upload.single('foto'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ erro: 'Nenhum arquivo foi enviado.' });
        }

        console.log(`Imagem salva: ${req.file.filename}`);

        res.json({
            mensagem: 'Imagem salva com sucesso!',
            nomeArquivo: req.file.filename,
            caminho: req.file.path,
        });
    } catch (err) {
        console.error('Erro no upload:', err);
        res.status(500).json({ erro: 'Erro interno ao salvar a imagem.' });
    }
});

// ─── Inicialização ────────────────────────────────────────────────────────────
const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (const nome in interfaces) {
        for (const info of interfaces[nome]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✔  Servidor rodando em http://${obterIP()}:${PORT}\n`);
});