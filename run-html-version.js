import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;

// Tipos MIME para diferentes extensões de arquivo
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

// Diretório raiz da aplicação HTML
const HTML_ROOT = path.join(__dirname, 'app html');

// Função para determinar o tipo MIME
function getMimeType(filePath) {
  const extname = path.extname(filePath).toLowerCase();
  return MIME_TYPES[extname] || 'application/octet-stream';
}

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Requisição: ${req.method} ${req.url}`);
  
  // Converter URL para caminho do sistema de arquivos
  let filePath = path.join(HTML_ROOT, req.url === '/' ? 'index.html' : req.url);
  
  // Verificar se o arquivo existe
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Se o arquivo não existe, retornar 404
      console.error(`Arquivo não encontrado: ${filePath}`);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Arquivo não encontrado</h1>');
      return;
    }
    
    if (stats.isDirectory()) {
      // Se for um diretório, tentar carregar index.html nesse diretório
      filePath = path.join(filePath, 'index.html');
    }
    
    // Ler e enviar o arquivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`Erro ao ler arquivo: ${filePath}`, err);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Erro interno do servidor</h1>');
        return;
      }
      
      // Determinar o tipo MIME e enviar resposta
      const contentType = getMimeType(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor HTML LoanBuddy rodando em http://localhost:${PORT}`);
  console.log(`Acesse esta URL no navegador para usar a aplicação.`);
  console.log(`Pressione Ctrl+C para parar o servidor.`);
});