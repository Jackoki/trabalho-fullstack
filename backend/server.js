import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";
import { seedDatabase } from "./config/seed.js";
import { initDatabase } from "./config/init.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/countries", countryRoutes);

async function startServer() {
  try {
    await initDatabase();

    await seedDatabase();

    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  } 
  
  catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
