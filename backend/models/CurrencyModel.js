import { db } from "../config/db.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export class CurrencyModel {
  static async findByCountryId(countryId) {
    const cacheKey = `currencies_${countryId}`;

    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const [rows] = await db.query(
        "SELECT * FROM currencies WHERE country_id = ?",
        [countryId]
      );

      cache.set(cacheKey, rows);

      return rows;
    } 
    catch (error) {
      throw new Error("Erro ao buscar moedas: " + error.message);
    }
  }

  static async create(countryId, name) {
    try {
      await db.query(
        "INSERT INTO currencies (country_id, name) VALUES (?, ?)",
        [countryId, name]
      );

      cache.del(`currencies_${countryId}`);
    } 
    
    catch (error) {
      throw new Error("Erro ao criar moeda: " + error.message);
    }
  }
}
