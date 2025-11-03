import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let produtos = [];

app.get('/cadastroProdutos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/cadastroProdutos', (req, res) => {
  const { codigo, nome, valor } = req.body;
  produtos.push({ codigo, nome, valor });
  res.redirect('/listaProdutos');
});

app.get('/listaProdutos', (req, res) => {
  let tabela = `
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lista de Produtos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body class="bg-light">
    <div class="container mt-5">
      <h2 class="mb-4">Lista de Produtos</h2>
      <table class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>Código</th>
            <th>Nome do Produto</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>`;

  produtos.forEach(p => {
    tabela += `
      <tr>
        <td>${p.codigo}</td>
        <td>${p.nome}</td>
        <td>R$ ${parseFloat(p.valor).toFixed(2)}</td>
      </tr>`;
  });

  tabela += `
        </tbody>
      </table>
      <a href="/cadastroProdutos" class="btn btn-primary">Voltar para Cadastro</a>
    </div>
  </body>
  </html>`;

  res.send(tabela);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});