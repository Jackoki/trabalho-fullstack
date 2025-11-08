// backend/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Garante que as variáveis de ambiente necessárias estão definidas
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_NAME) {
  throw new Error("Variáveis de ambiente do banco de dados não estão corretamente definidas.");
}

try {
  // Conexão temporária apenas para criar o banco, caso ainda não exista
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  // Cria o banco se necessário
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.end();
} catch (err) {
  console.error("Erro ao criar banco de dados:", err);
  process.exit(1); // Interrompe a aplicação, pois sem DB nada funciona
}

// Cria o pool de conexões para uso no restante da aplicação
export const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // máximo de conexões simultâneas
});

// Testa o pool rapidamente para evitar erros silenciosos
try {
  await db.query("SELECT 1");
  console.log("Conexão com banco de dados estabelecida com sucesso.");
} catch (err) {
  console.error("Erro ao conectar ao banco via pool:", err);
}
