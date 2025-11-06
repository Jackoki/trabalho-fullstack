import { db } from "../config/db.js";

export const LogModel = {
  async create(user, action, status, message) {
    try {
      await db.query(
        `INSERT INTO logs (user, action, status, message) VALUES (?, ?, ?, ?)`,
        [user || "anonymous", action, status, message]
      );
    } 
    
    catch (err) {
      console.error("Erro ao registrar log:", err);
    }
  },

  async getAll() {
    try {
      const [rows] = await db.query(`SELECT * FROM logs ORDER BY created_at DESC`);
      return rows;
    } 
    
    catch (err) {
      console.error("Erro ao buscar logs:", err);
      return [];
    }
  },
};
