const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

const readData = () => fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) : [];
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');

app.get('/pessoas', (req, res) => res.json(readData()));
app.post('/pessoas', (req, res) => {
  const pessoas = readData();
  const novaPessoa = { id: Date.now(), ...req.body };
  pessoas.push(novaPessoa);
  writeData(pessoas);
  res.status(201).json(novaPessoa);
});
app.put('/pessoas/:id', (req, res) => {
  const pessoas = readData();
  const index = pessoas.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).send('Pessoa não encontrada');
  pessoas[index] = { ...pessoas[index], ...req.body };
  writeData(pessoas);
  res.json(pessoas[index]);
});
app.delete('/pessoas/:id', (req, res) => {
  let pessoas = readData().filter(p => p.id != req.params.id);
  writeData(pessoas);
  res.status(204).send();
});
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));