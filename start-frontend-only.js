import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do servidor
const app = express();
const PORT = 3000;

console.log("Iniciando servidor HTML LoanBuddy...");

// Servir arquivos estáticos da pasta 'app html'
app.use(express.static(path.join(__dirname, 'app html')));

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app html', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor HTML LoanBuddy rodando em http://0.0.0.0:${PORT}`);
  console.log(`📝 Acesse esta URL para ver a versão HTML`);
});