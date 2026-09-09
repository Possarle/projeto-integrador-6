const express = require("express");
const app = express();

app.use(express.json());

const produtos = [
  { id: 1, nome: "Notebook", preco: 3500 },
  { id: 2, nome: "Mouse", preco: 120 }
];

// GET /produtos - retorna todos os produtos
app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

// GET /produtos/:id - retorna um produto pelo ID
app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((produto) => produto.id === id);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  res.status(200).json(produto);
});

// POST /produtos - cadastra um novo produto
app.post("/produtos", (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco === undefined || typeof preco !== "number") {
    return res.status(400).json({
      erro: "Informe nome e preco, sendo preco um número"
    });
  }

  const novoProduto = {
    id: produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1,
    nome,
    preco
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

app.listen(3000, () => {
  console.log("API de produtos rodando em http://localhost:3000");
});
