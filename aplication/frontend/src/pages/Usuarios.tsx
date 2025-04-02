import { useEffect, useState } from 'react';
import axios from 'axios';

function Usuarios() {
  const [pessoas, setPessoas] = useState<{ id: number; nome: string; email: string }[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/pessoas').then(res => setPessoas(res.data));
  }, []);

interface Pessoa {
    id: number;
    nome: string;
    email: string;
}

const handleDelete = (id: number): void => {
    axios.delete(`http://localhost:3000/pessoas/${id}`).then(() => {
        setPessoas(pessoas.filter((p: Pessoa) => p.id !== id));
    });
};

  return (
    <div>
      <h1>Lista de Pessoas</h1>
      <ul>
        {pessoas.map(pessoa => (
          <li key={pessoa.id}>
            {pessoa.nome} - {pessoa.email} 
            <button onClick={() => handleDelete(pessoa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;