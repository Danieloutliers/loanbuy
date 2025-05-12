#!/bin/bash

# Verifica se já existe uma instância rodando
ps aux | grep "node standalone-vite.js" | grep -v grep > /dev/null
if [ $? -eq 0 ]; then
  echo "Uma instância do servidor HTML já está em execução."
  echo "Para acessar, use: http://localhost:3030"
  exit 0
fi

# Inicia o servidor HTML em segundo plano
echo "Iniciando servidor HTML LoanBuddy..."
nohup node standalone-vite.js > html-server.log 2>&1 &

# Aguarda um momento para o servidor iniciar
sleep 2

# Exibe URL de acesso
echo ""
echo "✅ Servidor HTML iniciado com sucesso!"
echo "🌐 Acesse: http://localhost:3030"
echo ""
echo "Para encerrar o servidor, execute: kill \$(ps aux | grep standalone-vite.js | grep -v grep | awk '{print \$2}')"
echo ""
echo "Logs disponíveis em: html-server.log"