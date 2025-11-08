import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";
import { seedDatabase } from "./config/seed.js";
import { initDatabase } from "./config/init.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/users", userRoutes);
app.use("/api/countries", countryRoutes);

// Caminho para o build do frontend
const buildPath = path.join(__dirname, "../frontend/build");

// Servir arquivos estáticos do React
app.use(express.static(buildPath, { maxAge: "1y" }));

app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Inicializa o servidor
async function startServer() {
  try {
    //Cria o banco de dados
    await initDatabase();
    //Insere os dados no banco
    await seedDatabase();

    //Executa o servidor na porta 443, tanto o back-end como o front-end
    const PORT = process.env.PORT || 443;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } 
  
  catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
