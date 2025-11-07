import { db } from "../config/db.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export class LanguageModel {
  static async findByCountryId(countryId) {
    const cacheKey = `languages_${countryId}`;

    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const [rows] = await db.query(
        "SELECT * FROM languages WHERE country_id = ?",
        [countryId]
      );

      cache.set(cacheKey, rows);

      return rows;
    } 
    
    catch (error) {
      throw new Error("Erro ao buscar idiomas: " + error.message);
    }
  }

  static async create(countryId, name) {
    try {
      await db.query(
        "INSERT INTO languages (country_id, name) VALUES (?, ?)",
        [countryId, name]
      );

      cache.del(`languages_${countryId}`);
    } 
    
    catch (error) {
      throw new Error("Erro ao criar idioma: " + error.message);
    }
  }
}
