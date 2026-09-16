const Produto = require("../models/produto.model");

const produtos = [
  new Produto({ id: 1, nome: "Notebook", preco: 3500 }),
  new Produto({ id: 2, nome: "Mouse", preco: 120 })
];

function listar() {
  return produtos;
}

function buscarPorId(id) {
  return produtos.find((produto) => produto.id === Number(id));
}

function criar(dados) {
  if (!dados || typeof dados.nome !== "string" || !dados.nome.trim()) {
    throw new Error("O campo nome é obrigatório e deve ser um texto.");
  }

  if (dados.preco === undefined || dados.preco === null || typeof dados.preco !== "number" || !Number.isFinite(dados.preco) || dados.preco < 0) {
    throw new Error("O campo preco é obrigatório e deve ser um número maior ou igual a zero.");
  }

  const proximoId = produtos.length
    ? Math.max(...produtos.map((produto) => produto.id)) + 1
    : 1;

  const produto = new Produto({
    id: proximoId,
    nome: dados.nome.trim(),
    preco: dados.preco
  });

  produtos.push(produto);
  return produto;
}

module.exports = { listar, buscarPorId, criar };
