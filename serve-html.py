import http.server
import socketserver
import os

# Diretório que contém os arquivos HTML
directory = os.path.join(os.getcwd(), "app html")
os.chdir(directory)

PORT = 3000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor rodando na porta {PORT}")
    print(f"Acesse http://localhost:{PORT} no navegador")
    httpd.serve_forever()