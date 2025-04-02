import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [form, setForm] = useState({ nome: '', telefone: '', email: '' });
  const navigate = useNavigate();

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios.post('http://localhost:3000/contatos', form).then(() => {
        setForm({ nome: '', telefone: '', email: '' });
        navigate('/usuarios');
    });
};

  return (
    <div>
      <h1>Cadastro de Pessoas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
        <input type="telefone" placeholder="Telefone" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;