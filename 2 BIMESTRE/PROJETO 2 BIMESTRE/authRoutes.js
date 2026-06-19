// authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const router = express.Router();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'qualquercoisaaleatoria123';

// ----------------------
// ROTA: CRIAR CONTA
// ----------------------
router.post('/cadastro', async (req, res) => {
    const { nome, cpf, usuario, senha } = req.body;

    if (!nome || !cpf || !usuario || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    try {
        // Verifica se o usuário ou CPF já existem
        // No pg os placeholders são $1, $2... (não "?") e o resultado vem em "rows"
        const existentes = await pool.query(
            'SELECT id FROM usuarios WHERE usuario = $1 OR cpf = $2',
            [usuario, cpf]
        );

        if (existentes.rows.length > 0) {
            return res.status(409).json({ erro: 'Usuário ou CPF já cadastrado.' });
        }

        // NUNCA salve a senha em texto puro — sempre gere o hash
        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

        const inserido = await pool.query(
            'INSERT INTO usuarios (nome, cpf, usuario, senha_hash) VALUES ($1, $2, $3, $4) RETURNING id',
            [nome, cpf, usuario, senhaHash]
        );

        // Já gera um token, pois o botão é "Criar conta e entrar"
        const novoId = inserido.rows[0].id;
        const token = jwt.sign({ id: novoId, usuario }, JWT_SECRET, { expiresIn: '2h' });

        return res.status(201).json({ mensagem: 'Conta criada com sucesso!', token, usuario: { nome, usuario } });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: 'Erro ao criar conta.' });
    }
});

// ----------------------
// ROTA: LOGIN
// ----------------------
router.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ erro: 'Preencha usuário e senha.' });
    }

    try {
        const resultado = await pool.query(
            'SELECT * FROM usuarios WHERE usuario = $1',
            [usuario]
        );

        if (resultado.rows.length === 0) {
            // Mensagem genérica de propósito — não revele se foi o usuário ou a senha
            return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
        }

        const dadosUsuario = resultado.rows[0];

        // Compara a senha digitada com o hash salvo no banco
        const senhaCorreta = await bcrypt.compare(senha, dadosUsuario.senha_hash);

        if (!senhaCorreta) {
            return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
        }

        // Login certo: gera um token para manter o usuário "logado"
        const token = jwt.sign(
            { id: dadosUsuario.id, usuario: dadosUsuario.usuario },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.json({
            mensagem: 'Login realizado com sucesso!',
            token,
            usuario: { id: dadosUsuario.id, nome: dadosUsuario.nome, usuario: dadosUsuario.usuario },
        });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: 'Erro ao fazer login.' });
    }
});

module.exports = router;