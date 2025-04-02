import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cadastro from '../src/pages/Cadastro';
import Usuarios from '../src/pages/Usuarios';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Cadastro</Link>
        <Link to="/usuarios">Usuários</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}

export default App;