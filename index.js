const express = require("express");
const produtoRoutes = require("./routes/produto.routes");

const app = express();

app.use(express.json());
app.use("/produtos", produtoRoutes);

// Rota não encontrada
app.use((req, res) => {
  return res.status(404).json({ mensagem: "Rota não encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API de produtos rodando em http://localhost:${PORT}`);
});
