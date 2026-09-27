const { query } = require('../database');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

exports.listarTipos = async (req, res) => {
    try {
        const sql = 'SELECT tipo_quarto_id, tipo_quarto_nome FROM public.tipo_quarto ORDER BY tipo_quarto_id ASC';
        const result = await query(sql);
        res.json({ sucesso: true, unidades: result.rows });
    } catch (error) {
        console.error('Erro ao listar tipos de quarto:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar tipos de quarto.' });
    }
};

exports.uploadImagemTipo = async (req, res) => {
    try {
        const id = req.params.id;
        if (!req.file) {
            return res.status(400).json({ sucesso: false, mensagem: 'Nenhum arquivo enviado.' });
        }

        // Aponta para a pasta imagens/tipos na raiz do projeto
        const pastaImagens = path.join(__dirname, '../imagens/tipos');
        if (!fs.existsSync(pastaImagens)) {
            fs.mkdirSync(pastaImagens, { recursive: true });
        }

        const caminhoDestino = path.join(pastaImagens, `tipo_${id}.png`);

        await sharp(req.file.buffer)
            .resize(300, 300, { fit: 'cover' })
            .toFormat('png')
            .toFile(caminhoDestino);

        console.log(`✅ Imagem salva com sucesso em: ${caminhoDestino}`);
        res.json({ sucesso: true, mensagem: 'Imagem do tipo salva com sucesso!' });
    } catch (error) {
        console.error('❌ Erro ao salvar imagem do tipo:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao processar imagem.' });
    }
};