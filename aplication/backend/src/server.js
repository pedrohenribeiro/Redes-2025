require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: process.env.HOSTNAME,
    port: process.env.PORT_DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar no banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Lista todos os contatos
app.get('/contatos', (req, res) => {
    db.query('SELECT * FROM contatos', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Adiciona um novo contato
app.post('/contatos', (req, res) => {
    const { nome, telefone, email } = req.body;
    db.query('INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)', [nome, telefone, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, nome, telefone, email });
    });
});

// Deleta um contato pelo ID
app.delete('/contatos/:id', (req, res) => {
    db.query('DELETE FROM contatos WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
