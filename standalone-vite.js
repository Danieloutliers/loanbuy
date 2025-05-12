#!/usr/bin/env node

// Script para executar o servidor da versão HTML do LoanBuddy
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startVite() {
  try {
    // Configuração do servidor
    const app = express();
    const PORT = 3030;
    
    console.log("🚀 Iniciando servidor da versão HTML do LoanBuddy...");
    
    // Servir arquivos estáticos da pasta 'app html'
    app.use(express.static(path.join(__dirname, 'app html')));
    
    // Rota para a página principal
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'app html', 'index.html'));
    });
    
    // Iniciar o servidor
    app.listen(PORT, '0.0.0.0', () => {
      console.log("");
      console.log("✅ Servidor HTML LoanBuddy iniciado com sucesso!");
      console.log(`🌐 Acesse: http://localhost:${PORT} ou http://0.0.0.0:${PORT}`);
      console.log("");
      console.log("💡 Esta versão utiliza HTML puro, CSS e JavaScript vanilla");
      console.log("📱 Funciona offline e pode ser instalada como PWA");
      console.log("");
      console.log("Pressione Ctrl+C para encerrar o servidor");
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor HTML:", error);
    process.exit(1);
  }
}

// Executar o servidor
startVite();