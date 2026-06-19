// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');

const app = express();
app.use(cors()); // permite que seu HTML (rodando em outra porta/arquivo) acesse a API
app.use(express.json()); // permite ler JSON no corpo das requisições

app.use('/api', authRoutes); // POST /api/cadastro  e  POST /api/login

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});

