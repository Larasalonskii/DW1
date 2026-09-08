const { query } = require('../database');

// Listar todas as unidades de medida
exports.listarFormasPagamento = async (req, res) => {
    try {
        const result = await query('SELECT * FROM public.forma_pagamento ORDER BY id_forma_pagamento');
        res.json({ sucesso: true, unidades: result.rows });
    } catch (error) {
        console.error('Erro ao listar formas de pagamento:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar formas de pagamento.' });
    }
};

// Obter unidade de medida por ID
exports.obterFormaPagamento = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.trim().toUpperCase() : '';

        const result = await query('SELECT * FROM public.forma_pagamento WHERE id_forma_pagamento = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ sucesso: false, mensagem: 'Forma de Pagamento não encontrada.' });
        }

        res.json({ sucesso: true, unidade: result.rows[0] });
    } catch (error) {
        console.error('Erro ao obter forma de pagamento:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor.' });
    }
};

// Criar unidade de medida
exports.criarFormaPagamento = async (req, res) => {
    try {
        const { id_forma_pagamento, nome_forma_pagamento } = req.body;
        const id = id_forma_pagamento ? id_forma_pagamento.trim().toUpperCase() : '';

        if (!id || id.length > 2) {
            return res.status(400).json({ sucesso: false, mensagem: 'O ID deve ter até 2 caracteres.' });
        }

        if (!nome_forma_pagamento) {
            return res.status(400).json({ sucesso: false, mensagem: 'O nome da forma é obrigatório.' });
        }

        const sql = `
            INSERT INTO public.forma_pagamento (id_forma_pagamento, nome_forma_pagamento)
            VALUES ($1, $2)
            RETURNING *
        `;

        const result = await query(sql, [id, nome_forma_pagamento]);
        res.status(201).json({ sucesso: true, mensagem: 'Forma de Pagamento inserida com sucesso!', unidade: result.rows[0] });
    } catch (error) {
        console.error('Erro ao criar forma de pagamento:', error);
        if (error.code === '23505') {
            return res.status(400).json({ sucesso: false, mensagem: 'Este ID já está cadastrada.' });
        }
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao inserir forma de pagamento no banco de dados.' });
    }
};

// Atualizar unidade de medida
exports.atualizarFormaPagamento = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.trim().toUpperCase() : '';
        const { nome_forma_pagamento } = req.body;

        if (!id || id.length > 2) {
            return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
        }

        const sql = `
            UPDATE public.forma_pagamento 
            SET nome_forma_pagamento = $1 
            WHERE id_forma_pagamento = $2
            RETURNING *
        `;

        const result = await query(sql, [nome_forma_pagamento, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ sucesso: false, mensagem: 'Forma de pagamento não encontrada.' });
        }

        res.json({ sucesso: true, mensagem: 'Forma de Pagamento alterada com sucesso!', unidade: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar forma de pagamento:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar forma de pagamento.' });
    }
};

// Deletar unidade de medida
exports.deletarFormaPagamento = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.trim().toUpperCase() : '';

        if (!id || id.length > 2) {
            return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
        }

        await query('DELETE FROM public.forma_pagamento WHERE id_forma_pagamento = $1', [id]);

        res.json({ sucesso: true, mensagem: 'Forma de Pagamento excluída com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar forma de pagamento:', error);
        if (error.code === '23503') {
            return res.status(400).json({ sucesso: false, mensagem: 'Não é possível excluir: existem produtos associados a esta forma.' });
        }
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir forma de pagamento.' });
    }
};