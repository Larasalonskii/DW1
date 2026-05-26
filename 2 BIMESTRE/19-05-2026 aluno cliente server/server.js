const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir qualquer origem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// se vier uma requisição POST para a rota /enviar-mensagem
app.post('/enviar-mensagem', (req, res) => {

    let mensagem = req.body.mensagem;
    let nome = req.body.nome;
    let nota = req.body.nota;

    console.log(`A mensagem recebida foi: ${mensagem}`);
    console.log(`As coordenadas recebidas foram: (${nome}, ${nota})`);

    let resp;

    if (nota >= 7) {
        resp = "Parabéns " + nome + "! Você foi aprovado!";
    } else if (nota < 7) {
        resp = "Olá " + nome + ", você precisará de recuperação";
    }

    res.json({
        aprovado: resp
    });
});

const obterIP = () => {
    const interfaces = os.networkInterfaces();

    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {

            if (info.family === 'IPv4' && !info.internal) {
                return info.address;
            }

        }
    }

    return 'localhost';
};

const ip = obterIP();

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`);
});