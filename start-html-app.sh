#!/bin/bash

echo "Iniciando o servidor para LoanBuddy (Versão HTML)..."

# Matar qualquer processo python existente
pkill -f python || true

# Iniciar o servidor HTTP simples na porta 3000
cd "app html"
python3 -m http.server 3000

echo "Servidor iniciado! Acesse a aplicação em: http://localhost:3000"